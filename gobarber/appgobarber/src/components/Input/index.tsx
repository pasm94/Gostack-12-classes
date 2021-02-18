import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from "react";
// useImperativeHandle eh usado para passar info do component child para component parent
import { TextInputProps } from "react-native";
import { useField } from "@unform/core";

import { Container, TextInput, Icon } from "./styles";

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  containerStyle?: {};
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

// abaixo, ref eh a unica propriedade q nao podemos passar diretamente no elemento
const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { name, icon, containerStyle = {}, ...rest },
  ref
) => {
  // repassando as props que pegamos
  // usamos ForwardRefRenderFunction inves de FC quando passamos o ref
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = "", fieldName, error } = useField(name);

  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  })); // eh acessado uma informacao de um elemento child, pelo elemento parent, atraves do ref

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: "value",
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = "";
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container style={containerStyle} isFocused={isFocused} isErrored={!!error}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? "#ff9000" : "#666360"}
      />
      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);

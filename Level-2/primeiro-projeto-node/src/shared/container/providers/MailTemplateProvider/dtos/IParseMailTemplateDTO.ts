interface ITemplateVariables {
  [key: string]: string | number; // se for idade por exemplo, nao precisa ser string
}

export default interface IParseMailTemplateDto {
  file: string;
  variables: ITemplateVariables;
}

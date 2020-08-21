// to create the user, we will use:
// name, email, password

/* interface will set a type of a group of datas */
interface TechObject {
  title: string;
  experience: number
}

interface CreateUserData {
  name?: string; /* ? not obrigatory */
  email: string;
  password: string;
  techs: Array<string | TechObject>
}

export default function createUser({ name, email, password, techs }: CreateUserData) {
  const user = {
    name,
    email,
    password,
    techs
  }
  return user
}
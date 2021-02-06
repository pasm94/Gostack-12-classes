import { Request, Response } from 'express'
import createUser from './services/CreateUser'

// string, number, boolean, object, Array
// interfaces

export function helloWorld(request: Request, response: Response) {
  const user = createUser({
    email: 'paulo@teste.com',
    password: '123456',
    techs: ['NodeJS', 'ReactJS', 'React Native', { title: 'JavaScript', experience: 100 }]
  })

  console.log(user.email, user.techs)

  return response.json({ message: 'Hello World XD' })
}


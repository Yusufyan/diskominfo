export class LoginDTO {
  usernameOrEmail: string
  password: string
}

export class UserCreateDTO {
  username: string
  email: string
  password: string
}

export class UserUpdateDTO{
  id: number
  username: string
  email: string
}
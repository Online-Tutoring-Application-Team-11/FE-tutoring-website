export type UserSend = {
  id?: number,
  email: string,
  password?: string,
  tutor?: boolean,
  aboutMe?: string,
  subjects?: string[],
  profilePic?: string,
  totalHours?: number,
  fName?: string,
  lName?: string,
  token?: string
}

export type TutorSend = {
  email: string,
  subjects: string[]
}

export type PasswordSend = {
  email: string,
  password: string,
  newPassword: string
}

export type TutorSend = {
  email: string,
  subjects: string[]
}

export type UserGet = {
  id: number,
  email: string,
  password: string,
  tutor: boolean,
  aboutMe: string,
  subjects: string[],
  profilePic?: string,
  totalHours?: number,
  fname?: string,
  lname?: string,
  token?: string
}
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
  token?: string,
  favouriteTutorIds?: number[],
  year?: number
}

export type TutorSend = {
  email: string,
  subjects: string[]
}

export type StudentSend = {
  email: string,
  year: number,
  favouriteTutorIds: number[]
}

export type PasswordSend = {
  email: string,
  password: string,
  newPassword: string
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
  token?: string,
  fav?: boolean,
  favouriteTutorIds?: number[],
  year?: number
}
export type UserSend = {
  email: string,
  password: string,
  tutor?: boolean,
  aboutMe?: string,
  subjects?: string[],
  profilePic?: string,
  fName?: string,
  lName?: string
}

export type UserGet = {
  email: string,
  password: string,
  tutor: boolean,
  aboutMe: string,
  subjects: string[],
  profilePic?: string,
  fname?: string,
  lname?: string
}
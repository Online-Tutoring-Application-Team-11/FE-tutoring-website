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
  fname?: string,
  lname?: string
}
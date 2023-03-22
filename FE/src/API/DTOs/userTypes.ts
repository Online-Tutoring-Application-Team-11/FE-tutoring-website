export type UserSignUp = {
  email: string,
  password: string,
  tutor: boolean
}

export type TutorUser = {
  email: string,
  password: string,
  tutor: true,
  aboutMe: string,
  subjects: string[],
  avatarUrl?: string,
}
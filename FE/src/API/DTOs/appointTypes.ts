export type Appointment = {
    startTime?: Date,
    endTime?: Date,
    subject: string,
    userId: number,
    tutorId: number
}

export type HoursSend = {
    email: string,
    startTime: Date | string,
    endTime: Date | string,
    dayOfWeek: string
}

export type HoursGet = {
    tutorId: number,
    startTime: Date | string,
    endTime: Date | string,
    dayOfWeek: string
}
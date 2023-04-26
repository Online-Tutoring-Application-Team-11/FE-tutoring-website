export type AppointmentGet = {
    startTime?: Date | string,
    endTime?: Date | string,
    subject: string,
    studentId: number,
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

export type AppointmentSend = {
    requestedStartTime: string,
    requestedEndTime: string,
    subject: string,
    studentEmail: string,
    tutorEmail: string
}
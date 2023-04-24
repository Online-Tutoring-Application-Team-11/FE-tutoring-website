export type AppointmentGet = {
    startTime?: Date | string,
    endTime?: Date | string,
    subject: string,
    studentId: number,
    tutorId: number
}

export type AppointmentSend = {
    requestedStartTime: string,
    requestedEndTime: string,
    subject: string,
    studentEmail: string,
    tutorEmail: string
}
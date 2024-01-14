import { Kids } from "./kidsType"

// type for a coach
export type Coach = {
    name: string,
    role: string
    availableSessions: Array<AvailableSession>,
    bookedSessions: Array<BookedSession>,
    imgName: string
}

// type for a training session once booked
export type BookedSession = {
    location: string,
    timing: Date,
    kids: Kids,
    type: string,
}

// type for a training session while availalbe
export type AvailableSession = {
    location: string,
    timing: Date[],
    day_availabilities: number[]
}
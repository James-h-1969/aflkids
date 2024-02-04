import { Kids } from "./kidsType"

// type for a coach
export type Coach = {
    name: string,
    role: string
    weekAvailabilities: Array<Array<Boolean>>,
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


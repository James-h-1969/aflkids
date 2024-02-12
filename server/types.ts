export type Parent = {
    parentname: String,
    email: String,
    phone: String,
    childNames: Array<string>,
    childAge: Array<string>,
    childClubs: Array<string>,
    childComments: Array<string>,
    childEvents: Array<Array<string>>, // this will be a 2D list representing each child and then a list of each event they have done
}

export type detailsCamp = {
    childName: string,
    childAge: string,
    childComments: string,
    childClub: string,
    purchaseName: Array<String>,
    parent: Parent,
}

export type Child = {
    childName: string,
    childAge: string, 
    childComments: string,
    childClub: string,
    parent?: Parent
}

type bookedSessions = {
    timing: Date,
    location: string,
    child: Child
}

export type Coach = {
    name: String,
    role: String,
    weekAvailabilities: Array<Array<Boolean>>,
    bookedSessions: Array<bookedSessions>,
    imgName: String,
    locations: Object,
}

export type detailsPrivate = {
    childName: string,
    childAge: string,
    childComments: string,
    childClub: string,
    parent: Parent,
    coach: Coach,
    timing: Date,
    location: string
}

export interface Item {
    id: number;
    quantity: number;
    details: Array<detailsCamp | detailsPrivate>
}
export type CampType = { // This has the type for a basic AFLKids Holiday Camp
    name: string,
    ages: String,
    date: String,
    times: String,
    Price: Number,
    Location: String,
    address:String,
    locPic:string,
    kidsDay1: Array<Object>,
    kidsDay2: Array<Object>,
    archived: boolean,
  }

type Location = {
    address: string;
    locPic: string;
};

type Locations = {
    [key: string]: Location; // Index signature allowing any string as key
};

export const locations: Locations = {
    "Weldon": {
        address: "Curl Curl, 2099",
        locPic: "/assets/Maps/weldon.png"
    }, 
    "Gore Hill": {
        address: "St Leonards, 2065",
        locPic: "/assets/Maps/gore.png"
    }
}
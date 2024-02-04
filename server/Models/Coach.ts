import mongoose from "mongoose"; 

const Schema = mongoose.Schema;

type LocationState = {
    [key: string]: boolean;
  };

const CoachSchema = new Schema({
    name: String,
    role: String,
    weekAvailabilities: Array<Array<Boolean>>,
    bookedSessions: Array,
    imgName: String,
    locations: Object,
});

const CoachModel = mongoose.model("Coach", CoachSchema);

export default CoachModel;
import mongoose from "mongoose"; 

const Schema = mongoose.Schema;

const CoachSchema = new Schema({
    name: String,
    role: String,
    weekAvailabilities: Array<Array<Boolean>>,
    bookedSessions: Array,
    imgName: String
});

const CoachModel = mongoose.model("Coach", CoachSchema);

export default CoachModel;
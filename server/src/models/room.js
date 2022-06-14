import mongoose from "mongoose";
const Schema = mongoose.Schema
const roomSchema = new Schema({
  // name: { type: String },
  roomid: {type: String},
  name: { type: String },
  address: { type: String },
  mixNum: {type: Number},
  userData:[{
    userid: {type: String},
    userName: {type: String},
    phoneNum: {type: String},
    data: {type: String},
    begin: {type: String},
    endtime: {type: String},
    detail: {type: String}
  }]
})
roomSchema.statics = {

}
roomSchema.method({

})
export default  mongoose.model('room', roomSchema)
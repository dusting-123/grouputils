import mongoose from "mongoose";
const Schema = mongoose.Schema
const signSchema = new Schema({
  // name: { type: String },
  title: { type: String },
  address: { type: String },
  description: {type: String},//补充描述
  date: {type: String},
  endtime: {type: String},
  open: {type: Boolean, default: true},
  saved: {type: Boolean, default: true},
  people: {type: Number},
  signid: {type: String},
  status: {type: Number},
  userid: {type: String}
})
signSchema.statics = {

}
signSchema.method({

})
export default  mongoose.model('sign', signSchema)


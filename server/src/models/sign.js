import mongoose from "mongoose";
const Schema = mongoose.Schema
const signSchema = new Schema({
  // name: { type: String },
  title: { type: String },
  address: { type: String },
  createdAt: { type: Date, default: Date.now() },
  endtime: {type: String},
  open: {type: Boolean, default: true},
  save: {type: Boolean, default: true},
  people: {type: Number},
  signid: {type: String},
  status: {type: Number},
  total: {type: Number},
  userid: {type: String}
})
signSchema.statics = {

}
signSchema.method({

})
export default  mongoose.model('sign', signSchema)


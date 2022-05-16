import mongoose from "mongoose";
const Schema = mongoose.Schema
const signListSchema = new Schema({
  // name: { type: String },
  createdAt: { type: Date, },
  signid: {type: String},
  openid: {type: String},
  type: {type: Number},
  title: {type: String},
  signStatus: {type: Number},
})
signListSchema.statics = {

}
signListSchema.method({

})
export default  mongoose.model('signList', signListSchema)


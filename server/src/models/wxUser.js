import mongoose from "mongoose";
const Schema = mongoose.Schema
const wxUserSchema = new Schema({
  // name: { type: String },
  session_key: { type: String },
  openid: { type: String },
  nickName: { type: String },
  gender: {type: Number},
  city: { type: String },
  province: { type: String },
  country: { type: String },
  avatarUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
})
wxUserSchema.statics = {

}
wxUserSchema.method({

})
export default  mongoose.model('wxUser', wxUserSchema)


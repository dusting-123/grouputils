import mongoose from "mongoose";
const Schema = mongoose.Schema
const preListSchema = new Schema({
  // name: { type: String },
  roomid: { type: String, },
  userid: {type: String},
})
preListSchema.statics = {

}
preListSchema.method({

})
export default mongoose.model('preList', preListSchema)


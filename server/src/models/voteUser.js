import mongoose from "mongoose";
const Schema = mongoose.Schema
const voteUserSchema = new Schema({
  voteid: { type: String },
  userid: { type: String },
})
voteUserSchema.statics = {

}
voteUserSchema.method({

})
export default  mongoose.model('voteuser', voteUserSchema)


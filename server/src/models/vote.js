import mongoose from "mongoose";
const Schema = mongoose.Schema

const voteSchema = new Schema({
  voteid: {type: String},  //投票活动的id号
  title: {type: String}, //投票标题
  description: {type: String},//补充描述
  tempUnique: {type: Number},//每添加一次选项，tempUnique+1,防止删除选项时造成重复
  optionData: [{
    unique: {type: Number}, 
    content: {type: String},
    number: {typr: Number}, 
    percent: {type: Number}, 
    joiner: {type: Array}
  }],
  date: {type: String}, //投票截止日期
  time: {type: String}, //投票截止时间
  noName: {type: Boolean},  //匿名投票
  radio: {type: Number},   //单选还是多选
  people: {type: Number},
  status: {type: Number},
  userid: {type: String}
})

voteSchema.statics = {

}
voteSchema.method({

})
export default  mongoose.model('vote', voteSchema)
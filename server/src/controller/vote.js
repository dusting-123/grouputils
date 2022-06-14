import voteModel from '../models/vote.js';
import voteUserModel from '../models/voteUser.js';
import wxUserModel from '../models/wxUser.js';
export function create(req, res, next) {
  const body = req.body
  voteModel.create(body, (err, doc) => {
    if (!err) { }
  })
  res.send({ code: 200, success: true })
}

export async function info(req, res, next) {
  const { query } = req
  const voteInfo = await voteModel.findOne({ voteid: query.voteid }).select({ _id: 0 }).exec();
  res.send({
    code: 200,
    data: voteInfo,
    success: true
  })

}
export async function update(req, res, next) {
  const body = req.body
  console.log(body);
  await voteModel.updateOne({ voteid: body.voteid }, { optionData: body.optionData }).exec()
  await voteUserModel.create({ voteid: body.voteid, userid: body.openid })
  const voteInfo = await voteModel.findOne({ voteid: body.voteid }).select({ _id: 0 }).exec()

  res.send({
    code: 200,
    data: voteInfo,
    success: true
  })
}
export async function partList(req, res, next) {
  const { query } = req
  console.log("qqqqqq",query);
  const getVoteInfo = async function (voteIdList) {
    const length = voteIdList.length
    const list = []
    for (let i = 0; i < length; i++) {
      const info = await voteModel
        .findOne({ voteid: voteIdList[i].voteid })
        .select({ _id: 0, title: 1, description: 1, optionData: 1, voteid: 1, status: 1,userid: 1})
        .exec();
      list.push(info)
    }
    console.log(list);
    return list
  }
  const createrList = async function (voteInfoList) {
    const length = voteIdList.length
    const list = []
    for (let i = 0; i < length; i++) {
      const info = await wxUserModel
        .findOne({openid: voteInfoList[i].userid})
        .select({ nickName: 1, avatarUrl: 1, openid: 1,_id: 0})
        .exec();
      list.push(info)  
    }
    return list
  }
  const voteIdList = await voteUserModel.find({ userid: query.userid }).select({ voteid: 1, _id: 0 }).exec()

  const voteInfoList = await getVoteInfo(voteIdList)

  const voteCreaterList = await createrList(voteInfoList)
  const resList = {voteInfoList ,voteCreaterList}
  console.log("ppppppp", resList);
  res.send({
    code: 200,
    data:resList,
    success: true
  })
}
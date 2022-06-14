import singMondel from '../models/sign.js';
import signListModel from '../models/signList.js';
import wxloginMondel from '../models/wxUser.js';
export function create(req, res, next) {
  let body = req.body
  signListModel.findOne({signid: body.signid,openid:body.openid}, (err, docs) => {
    if(!err && !docs) {
      signListModel.create(body, (err, doc) => {
        if (!err) console.log(doc);
        res.send({
          code: 200,
          success: true
        })
      })
    }
  })
}
export async function info(req, res, next) {
  const { query } = req
  let signList = async function (query) {
    let signlist = await signListModel.find({ openid: query.openid }).select('signid').exec()
    // console.log(signlist);
    return signlist
  }
  let signInfo = async function (signlist) {
    const list = [];
    const length = signlist.length;
    for(let i = 0; i < length; i++){
      let sign = await singMondel.findOne({ signid: signlist[i].signid }).select({ userid: 1, title: 1, status: 1, signid: 1,_id: 0}).exec();
      list.push(sign)
    }
    // console.log(list);
    return list
  }
  let wxUser = async function (signinfo) {
    let list = []
    const length = signinfo.length
    for(let i = 0; i < length; i++){
      let wxuser = await wxloginMondel.findOne({ openid: signinfo[i].userid }).select({ nickName: 1, avatarUrl: 1, openid: 1,_id: 0}).exec();
      list.push(wxuser)
    }
    return list
  }
  const signlist = await signList(query)

  const userSignList = await signInfo(signlist)

  const createrList = await wxUser(userSignList)

  const resList = {createrList,userSignList}

  res.send({
    code: 200,
    data: resList,
    success: true
  })
}
export async function list(req, res ,next) {

  let partList = async function(signList) {
    let list = []
    for (let i = 0; i < signList.length; i++) {
      let wxuser = await wxloginMondel.findOne({ openid: signList[i].openid }).select({ nickName: 1, avatarUrl: 1, _id: 0}).exec();
      list.push(wxuser)
    }
    return list
  }
  const { query } = req

  const asignList = await signListModel.find({signid: query.signid}).exec()

  const auserSignList = await partList(asignList)

  const resList = {asignList, auserSignList}
  // console.log("aaaa",resList);
  res.send({
    code: 200,
    data: resList,
    success: true
  })
}
export async function update(req, res, next) {
  const { query } = req
  await signListModel.updateOne({signid: query.signid, openid: query.openid}, {signStatus: query.signStatus}).exec()
  res.send({
    code: 200,
    success: true
  })
}
export async function record(req, res, next) {
  const { query } = req
  console.log(88888,query);
  let statusCode = await signListModel.findOne({openid: query.openid, signid: query.signid}).select({signStatus: 1, _id: 0}).exec()
  res.send({
    code: 200,
    data: statusCode,
    success: true
  })
}

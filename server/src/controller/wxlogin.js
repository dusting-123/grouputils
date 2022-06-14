import got from "got";
import wxUser from "../models/wxUser.js";
function wxUserLoginRequest(requestData) {
  //在这里就是请求
  let appid = 'wx9039734903c49569'
  let appsecret = 'e59977ae7a4ca860d5635135a9e5ea81'
  let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appsecret}&js_code=${requestData.code}&grant_type=authorization_code`
  // let url = `https://api.weixin.qq.com/sns/jscode2session?appid=appid&secret=secret$js_code=${requestData.code}&grant_type=authorization_code`;
  let option = {
    url: url
  };
  return got(url).json().then(resp => {
    return resp
  })
}


export function load(req, res, next) {
  const { query } = req
  let appid = 'wx9039734903c49569'
  let appsecret = 'e59977ae7a4ca860d5635135a9e5ea81'
  let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appsecret}&js_code=${query.code}&grant_type=authorization_code`
  got(url).json().then(resp => {
    res.send(resp)
  })
  // const resp = wxUserLoginRequest(query)
  // console.log(resp.then());
}
export function userinfo(req, res, next) {
  const body = req.body
  // console.log(body);
  wxUser.create(body, (err,doc) => {
    if (!err) {
      res.send({ 
        code: 200 ,
        success: true,
      })
    }
  })
}
export function getUserInfo(req, res, next) {
  const { query } = req
  wxUser.findOne({ openid: query.openid }, { avatarUrl: 1, nickName: 1 }, (err, doc) => {
    if (!err) {
      res.send({
        code: 200,
        data: doc,
        success: true
      })
    }
  })
}

export async function update(req, res, next) {
  const { query } = req
  // console.log(query);
  await wxUser.updateOne({ openid: query.openid }, { ...query }).exec()
  res.send({
    code: 200,
    success: true
  })
}
export async function getinfo(req, res, next) {
  const { query } = req
  const userInfo = await wxUser
    .findOne({ openid: query.openid })
    .select({
      _id: 0,
      openid: 1,
      nickName: 1,
      gender: 1,
      avatarUrl: 1,
      motto: 1
    })
    .exec()
  if (userInfo == null) {
    console.log("该用户不存在");
    res.send({
      code: 200,
      data: userInfo,
      success: false,
      errMsg: "请先登录！"
    })
  } else {
    res.send({
      code: 200,
      data: userInfo,
      success: true
    })
  }
}
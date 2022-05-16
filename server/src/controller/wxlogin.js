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
  // request(option, function(error, response, body) {
  //   if (!error && response.statusCode == 200) {
  //     resolve(body);
  //     const wxdata = JSON.parse(body);
  //     const openid = wxdata.openid;
  //     const name = requestData.name;
  //     const session_key = wxdata.session_key;
  //     //   const session_key = JSON.parse(body.session_key);
  //     const data = { name, openid, session_key };

  //     // // 设置响应内容和响应状态码
  //     console.log("调用结束");
  //     return data;
  //   }
  // });
}


export function load(req, res, next) {
  const { query } = req
  let appid = 'wx9039734903c49569'
  let appsecret = 'e59977ae7a4ca860d5635135a9e5ea81'
  let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appsecret}&js_code=${query.code}&grant_type=authorization_code`
  got(url).json().then(resp => {
    res.send(resp)
    wxUser.find({ openid: resp.openid }, { openid: 1, _id: 0 }, (err, docs) => {
      if (!err) {
        console.log(docs);
        if (docs.length == 0) {
          console.log("该用户不存在");
          wxUser.create(resp, (err, doc) => {
            if (!err) { }
          });
        } else {
          console.log("存在");

        }
      }
    });

  })
  // const resp = wxUserLoginRequest(query)
  // console.log(resp.then());
}
export function userinfo(req, res, next) {
  const body = req.body
  wxUser.updateOne({ openid: body.openid }, {
    $set: {
      avatarUrl: body.avatarUrl,
      city: body.city,
      country: body.country,
      gender: body.gender,
      nickName: body.nickName,
      province: body.province
    }
  }, (err, doc) => {
    if (!err) {
      console.log(doc);
    }
  })
  res.send({ code: 200 })
}
export function getUserInfo(req, res, next) {
  const {query} = req
  wxUser.findOne({openid: query.openid}, {avatarUrl: 1,nickName:1}, (err, doc) => {
    if(!err) {
      res.send({
        code: 200,
        data: doc,
        scuess: true
      })
    }
  })
}
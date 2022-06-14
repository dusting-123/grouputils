import roomModel from '../models/room.js';

export function addroom(req, res, next) {
  let body = req.body
  roomModel.create(body, (err, doc) => {
    if (!err) console.log(doc);
  })
  res.send({ code: 200, success: true })
}
export async function roomlist(req, res, next) {
  const roomlist = await roomModel.find().select({_id: 0}).exec()
  // console.log(roomlist);
  res.send({
    code: 200,
    data: roomlist,
    success: true
  })
}
export async function adduser(req, res, next) {
  const body = req.body
  console.log(12345,body);
  let findRes = await roomModel.findOne({roomid: body.roomid}).select({_id: 0}).exec()
  console.log(666,findRes);
  const userList = findRes.userData

  if(body.roomid == findRes.roomid && userList.length > 0) {
    let clashRes = 0
    let date = new Date()
    const {data, begin, endtime} = body.userData
    const [h1 = 0, m1 = 0] = begin.split(":") || []
    const [h2 = 0, m2 = 0] = endtime.split(":") || []
    for(let i = 0; i< userList.length; i++) {  //对比算法
      if(userList[i].data == data) {
        const [dh1 = 0, dm1 = 0] = userList[i].begin.split(":") || []
        const [dh2 = 0, dm2 = 0] = userList[i].endtime.split(":") || []
        if(date.setHours(h1, m1) < date.setHours(dh1, dm1)) {
          if(date.setHours(h2, m2) > date.setHours(dh1, dm1)) {
            clashRes += 1
          }
        } else if(date.setHours(h1, m1) >= date.setHours(dh2, dm2)) {
          // compare.push(true)
        } else {
          clashRes += 1
        }
      }
    }
    if(clashRes == 0) {
      userList.push(body.userData)
      await roomModel.updateOne({roomid: body.roomid}, {userData: userList}).exec()
      userList.push(body.userData)
      await roomModel.updateOne({roomid: body.roomid}, {userData: userList}).exec()
      res.send({
        code: 200,
        success: true,
        errMsg: null
      })
    } else {
      res.send({
        code: 200,
        success: false,
        errMsg: '时间冲突！'
      })
    }
  } else {
    userList.push(body.userData)
    await roomModel.updateOne({roomid: body.roomid}, {userData: userList}).exec()
    res.send({
      code: 200,
      success: true
    })
  }
}
export async function preinfo(req, res, next) {
  const {query} = req
  const userData = []
  console.log(67889,query);
  const findRes = await roomModel.findOne({roomid:query.roomid}).select({_id: 0}).exec()
  const userList = findRes.userData
  for (let j = 0; j < userList.length; j++) {
    if(userList[j].phoneNum == query.phoneNum) {
      userData.push(userList[j])
    }
  }
  findRes.userData = userData
  // console.log(findRes);
  res.send({
    code: 200,
    data: findRes,
    success: true
  })
}

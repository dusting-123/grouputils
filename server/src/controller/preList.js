import preListModel from '../models/preList.js';
import roomModel from '../models/room.js';

export async function create(req, res, next) {
  const body = req.body
  console.log(body);
  const roomList = await preListModel.find({userid: body.userid}).select("roomid").exec()
  console.log(roomList);
  if(roomList.length == 0){
    await preListModel.create({...body})
    res.send({
      code: 200,
      success: true
    })
  }
}
export async function getlist(req, res, next) {
  const {query} = req
  console.log(2222,query);
  const roomList = await preListModel.find({userid: query.userid}).select("roomid").exec()
  console.log(333333,roomList);
  let preList = []
  if(roomList.length > 0){
    for (let i = 0; i < roomList.length; i++) {
      const userData = []
      let findRes = await roomModel.findOne({roomid: roomList[i].roomid}).select({_id: 0}).exec()      
      const userList = findRes.userData
      for (let j = 0; j < userList.length; j++) {
        if(userList[i].userid == query.userid) {
          userData.push(userList[i])
        }
      }
      findRes.userData = userData
      preList.push(findRes)
      
    }
    console.log(11111,preList);
    res.send({
      code: 200,
      data: {list:preList},
      success: true
    })
  }
}
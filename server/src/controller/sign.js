import model from '../models/sign.js';

export function create(req, res, next) {
  let body = req.body
  model.create(body, (err, doc) => {
    if (!err) console.log(doc);
  })
  res.send({ code: 200, success: true })
}

export function list(req, res, next) {
  const { query } = req
  model.findOne({signid: query.signid }, (err, doc) => {
    if (!err) {
      console.log(doc);
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
  console.log(query);
  await model.updateOne({signid: query.signid}, {...query}).exec()
  res.send({
    code: 200,
    success: true
  })
}
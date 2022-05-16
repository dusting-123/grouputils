import model from '../models/sign.js';



export function create(req, res, next) {
  let body = req.body
  model.create(body, (err, doc) => {
    if (!err) console.log(doc);
  })
  res.send({ code: 200, scuess: true })
}

export function list(req, res, next) {
  const { query } = req
  model.findOne({signid: query.signid }, (err, doc) => {
    if (!err) {
      console.log(doc);
      res.send({
        code: 200,
        data: doc,
        scuess: true
      })
    }
  })
}
export function update(req, res, next) {
  const { query } = req
}
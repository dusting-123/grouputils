import express from "express";
import * as sign from '../controller/sign.js'
// import
const signRoutes = express.Router()

signRoutes.route('/create')
  .post(sign.create)

signRoutes.route('/list')
  .get(sign.list)
signRoutes.route('/update').get(sign.update)

export default signRoutes 
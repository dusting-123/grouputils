import express from "express"
import * as signList from '../controller/signList.js'
const signListRoutes = express.Router()

signListRoutes.route('/create')
  .post(signList.create)
signListRoutes.route('/info')
  .get(signList.info)
signListRoutes.route('/list')
  .get(signList.list)
signListRoutes.route('/update')
  .get(signList.update)
signListRoutes.route('/record')
  .get(signList.record)
export default signListRoutes 
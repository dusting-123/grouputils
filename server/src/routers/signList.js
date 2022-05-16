import express from "express"
import * as signList from '../controller/signList.js'
const signListRoutes = express.Router()

signListRoutes.route('/create')
  .post(signList.create)
signListRoutes.route('/info')
  .get(signList.info)
signListRoutes.route('/list')
  .get(signList.list)
export default signListRoutes 
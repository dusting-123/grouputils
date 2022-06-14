import express from "express"
import * as preList from '../controller/preList.js'
const preListRoutes = express.Router()

preListRoutes.route('/create')
  .post(preList.create)
preListRoutes.route('/minelist')
  .get(preList.getlist)
export default preListRoutes 
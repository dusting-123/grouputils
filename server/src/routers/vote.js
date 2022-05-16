import express from "express";
import * as vote from '../controller/vote.js'
// import
const voteRoutes = express.Router()

voteRoutes.route('/create')
  .post(vote.create)
voteRoutes.route('/info')
  .get(vote.info)
voteRoutes.route('/update')
  .post(vote.update)
voteRoutes.route('/partlist')
  .get(vote.partList)
export default voteRoutes 
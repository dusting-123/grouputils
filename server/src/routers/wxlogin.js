import express from "express";
import * as wxlogin from '../controller/wxlogin.js'
// import
const wxUserRoutes = express.Router()

wxUserRoutes.route('/wxlogin')
  .get(wxlogin.load)
  .post(wxlogin.userinfo)

wxUserRoutes.route('/wxuser')
  .get(wxlogin.getUserInfo)
wxUserRoutes.route('/wxuser/update')
  .get(wxlogin.update)
wxUserRoutes.route('/wxlogin/getinfo')
  .get(wxlogin.getinfo)
export default wxUserRoutes 
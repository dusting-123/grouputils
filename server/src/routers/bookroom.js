import express from "express";
import * as bookroom from '../controller/bookroom.js'
// import
const roomRoutes = express.Router()

roomRoutes.route('/addroom').post(bookroom.addroom)
roomRoutes.route('/roomlist').get(bookroom.roomlist)
roomRoutes.route('/adduser').post(bookroom.adduser)
roomRoutes.route('/preinfo').get(bookroom.preinfo)

export default roomRoutes 
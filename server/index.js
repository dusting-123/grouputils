import parseBody from 'body-parser';
import cors from 'cors';
import express from 'express';
import got from 'got';
import { insertData } from './src/mongodb/db.js';
import mongoose from 'mongoose';

const app = express()
const signlist = null

app.use(cors())
let urlencodedParser = parseBody.urlencoded({extended: false})
app.get('/login', (req,response) =>{
  console.log(req.query);
  const {query} = req
  let appid = 'wx9039734903c49569'
  let appsecret = 'e59977ae7a4ca860d5635135a9e5ea81'
  let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appsecret}&js_code=${query.code}&grant_type=authorization_code`
  got(url).json().then(res=> {
    response.send(res)
  })
})
app.post('/sign/create',urlencodedParser,(req,res)=>{
  console.log(req);
  let data = req.body
  signlist = data
  res.send({scuess: 200,errorMsg: null})
})
app.get('/sign/info', (req,res) => {

})
app.get('/userinfo', (req, res) =>{
  let data = req.query
  insertData('user', data, (res)=> {
    console.log(res);
  })
})




// app.post('')


import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import bodyParser from "body-parser";
import {mongoUri} from './src/config/db.config.js'
import {port} from './src/config/config.js'
import wxUserRoutes from "./src/routers/wxlogin.js";
import signRoutes from './src/routers/sign.js'
import signListRoutes from "./src/routers/signList.js";
import voteRoutes from "./src/routers/vote.js";
import roomRoutes from "./src/routers/bookroom.js";
import preListRoutes from "./src/routers/preList.js";

const app = express()
//解决跨域
app.use(cors())
app.use(bodyParser.json())

// 最新的express版本，不再需要body-parse的下载支持了，直接按如下的方式来书写即可 
app.use(express.urlencoded({ extended: true }))
//Bootstrap routes
app.use(wxUserRoutes)
app.use('/sign', signRoutes)
app.use('/signlist', signListRoutes)
app.use('/vote', voteRoutes)
app.use('/bookroom',roomRoutes)
app.use('/prelist',preListRoutes)
mongoose.connect(mongoUri, {
  keepAlive: 1,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  config: { autoIndex: false }
})
mongoose.connection
  .on('error', ()=>{console.log(`unable to connect to database: ${mongoUri}`)})
  .once('open', () => {
    app.listen(port, res => {
      console.log('Express app started on port ' + port);
    })
  });
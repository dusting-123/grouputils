import { MongoClient } from 'mongodb'
const host = 'localhost'
//数据库名
const dbName = 'GroupUtils'
//数据库地址
export const mongoUri = `mongodb://${host}:27017/${dbName}`


// const client = new MongoClient(uri,{useUnifiedTopology: true})
// //连接数据库
// async function connect () {
  
//   await client.connect()
//   console.log('Connected successfully to server');
//   const db = client.db(dbName)
//   return db
// }


// export default connect

// import mongoose from 'mongoose'
// mongoose.connect(uri, {config:{autoIndex:false}})
// const Schema = mongoose.Schema
// const db = mongoose.connection
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   let Schema = mongoose.Schema({category: String, name: String});
//   Schema.methods.eat = function() {
//     console.log(
//       "i love eatten one" + this.name
//     );
//   }
//   let Model = mongoose.model('fruit', Schema)//生成一个document
//   let apple = new Model({category: 'apple', name: 'apple'});//存放数据
//   apple.save((err, apple) => {
//     if(err) return console.log(err);
//     apple.eat()
//     //查找数据
//     Model.find({name: 'apple'}, (err, data) =>{
//       console.log(data);
//     })
//   })

//   let blogSchema = new Schema({title: String, author: String})

// });

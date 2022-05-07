import { MongoClient } from 'mongodb'
const host = 'localhost'
//数据库地址
const uri = `mongodb://${host}:27017`
//数据库名
const dbName = 'GroupUtils'

const client = new MongoClient(uri,{useUnifiedTopology: true})
//连接数据库
async function connect () {
  
  await client.connect()
  console.log('Connected successfully to server');
  const db = client.db(dbName)
  return db
}


export default connect
import connect from './db.config.js';
// let db;
// async function run() {
//   try {
//     await client.connect()
//     const database = client.db('GroupUtils')
//     const vote = database.collection('vote')
//     const doc = {
//       title: "Record of a Shriveled Datum",
//       content: "No bytes, no problem. Just insert a document, in MongoDB",
//     }
//     const result = await vote.insertOne(doc)
//   } finally {
//     await client.close()
//   }
// }
// export default
//连接数据库
// function aaa(app) {
  // let db = MongoClient.connect(uri, (err, database) => {
  //   try {
  //     if(err) throw(err);
  //     return database.db('test')
  //     // insertData(client)
  //     // console.log(err, database);
  //   } catch (err) {
  //     console.log('数据库连接失败！', err);
  //   }
  // })
// }
// aaa('test')

// console.log(db);

let insertData = function (collect, params, callback) {
  //连接到集合MGT360124

  var collection = connect()
  .then((db) => {
    // console.log('connection:::',res);
    const coll = db.collection(collect)
    coll.insertOne(params, (err,result) => {
      if(err) throw err
    })
  })
  .catch((err)=> console.log(err))
  //插入数据
  // var data = [
  //   { "name": "maoguotao", "age": 18 },
  //   { "name": "yangshanshan", "age": 17 },
  //   { "name": "maoshuqin", "age": 16 }
  // ];
  // collection.insertMany(params, function (err, result) {
  //   if (err) {
  //     console.log("ERROR : " + err);
  //     return;
  //   };
  //   callback(result);
  // });
};
// var selectData = function(db, callback){
//   //连接集合MGT360124
//     var collection = db.collection("MGT360124");
//     var whereStr = {"name":"gaoguotao"};
//    collection.find(whereStr).toArray(function(err,result){
//        if(err){
//         console.log("ERROR :" +err);
//            return ;
//         }
//        callback(result);
//      }) ;
// };

// var updateData = function (db,callback){
//   //连接到集合MGT360124
//    var whereStr ={"name":"maoguotao"};
//    var updateStr = {$set : {"url":"https://github.com/MGT360124"}};
//    collection.update(whereStr,updateStr,function(err,result){
//         if(err){
//           console.log("ERROR："+err);
//           return ;
//            }
//           callback(result);
//    });
// }

// var delData = function(db,callback){
//   //连接到集合MGT360124
//  var collection = db.collection("MGT360124");
//  //删除数据
//  var  whereStr = {"name":"maoguotao"};
//   collection.remove(whereStr,function(err,result){
//       if(err){
//                  console.log("ERROR :" + err);
//                    return ;
//                 }
//                 callback(result);
//   }) ;
// }

export {
  insertData
};


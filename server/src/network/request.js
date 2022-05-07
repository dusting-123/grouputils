import got from 'got'
let code = '06101OFa15b0YC0nZUFa1n5MZy201OFT'
let appid = 'wx9039734903c49569'
let appsecret = 'e59977ae7a4ca860d5635135a9e5ea81'
let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appsecret}&js_code=${code}&grant_type=authorization_code`
got(url).then(res=> {
  console.log(res.body);
})
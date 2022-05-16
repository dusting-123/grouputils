//解析url参数
export function parseParam(url) {
   var params = {};
   var arr = url.split("?");
   if (arr.length <= 1) {
      return params;
   }
   arr = arr[1].split("&");
   for (let i = 0, l = arr.length; i < l; i++) {
      let a = arr[i].split("=");
      params[a[0]] = a[1];
   }
   return params;
}

//生成唯一id
export function randomString(length) {
   var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
   var result = ''
   for (var i = length; i > 0; --i)
      result += str[Math.floor(Math.random() * str.length)]
   return result
}
export function debounce(fn, delay = 1000) {
   let timer = null;
   return function (...args) {
       console.log(args);
       if (timer) {
           clearTimeout(timer);
           timer = null;
       }

       timer = setTimeout(() => {
           fn.apply(this, args);
       }, delay);
   }
}
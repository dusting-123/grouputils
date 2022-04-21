//定义创建action的函数
import {
  DECREMENT, 
  INCREMENT, 
  INCREMENTIFODD,
  SHOWEN,
  USERINFO
} from "./constant"

export const createIncrementAction = makeActionCreator(INCREMENT, 'payload')
export const createIncrementIfOddAction = makeActionCreator(INCREMENTIFODD, 'payload')
export const createDecrementAction = makeActionCreator(DECREMENT, 'payload')

function makeActionCreator(type, ...argNames) {
  return function(...args) {
    const action = {type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    });
    return action
  }
}
// {
//   return {
//     type: INCREMENT,
//     payload: value
//   }
// }

// export function createDecrementAction(value) {
//   return {
//     type: DECREMENT,
//     payload: value
//   }
// }

// export function createIncrementIfOddAction(value) {
//   return {
//     type: INCREMENTIFODD,
//     payload: value
//   }
// }

export function createIncrementAsyncAction(value, time) {
  return function(dispatch) {
    setTimeout(() => {
      dispatch(createIncrementAction(value))
    }, time)
  }
}

export function showEnActin(list){
  let arr = [];
  // 从数组里筛选出 language 为 'EN' 的部分
  list.forEach((v) => {
    if(v.language === 'EN') {
      arr.push(v)
    }
  })
  return {
    type: SHOWEN,
    payload: arr,
  }
}
export const getUserInfo = makeActionCreator(USERINFO, 'payload')
  // let arr = [];
  // // 从数组里筛选出 language 为 'EN' 的部分
  // list.forEach((v) => {
  //   if(v.language === 'EN') {
  //     arr.push(v)
  //   }
  // })
  // return {
  //   type: SHOWEN,
  //   payload: arr,
  // }



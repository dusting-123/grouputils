//reducer可以：初始化状态，加工状态，最后返回新状态
import { combineReducers } from "redux";
import {
  DECREMENT, INCREMENT, INCREMENTASYNC, INCREMENTIFODD, SHOWEN,
  USERINFO
} from "./constant";
import { count, state } from './state';
const {
  userInfo
} = state
function increment(state, action) {
  console.log(action);
  const {payload } = action
  return state + Number(payload)
}
function decrement(state, action) {
  const {payload } = action
  return state - Number(payload)
}
function getUserInfo(userInfo, action) {
  console.log(userInfo,action)
  const {payload} = action
  let aaa = {
    ...userInfo,
    ...payload
  }
  console.log(aaa);
  // return {
  //   ...userInfo,
  //   ...payload
  // }
  return aaa
}

function showEnTodo(state, action){
  const {payload } = action
  return {
    ...state,
    list: payload
  }
}
const showenReducer = createReducer(state, {
  [SHOWEN]: showEnTodo
})
const counterReducer = createReducer(count, {
  [INCREMENT]:increment,
  [DECREMENT]:decrement,
  [INCREMENTIFODD]:increment,
  [INCREMENTASYNC]:increment
})
const userInfoReducer = createReducer(userInfo, {
  [USERINFO]: getUserInfo
})
function createReducer(initState, handlers) {
  
  return function reducer(state = initState, action) {
    // console.log(handlers);
    // console.log(action);
    // console.log(state);
    // console.log(getUserInfo(state, action))
    if(handlers.hasOwnProperty(action.type)) {
      console.log(handlers[action.type](state, action));
      return handlers[action.type](state, action)
      /*
        let a = {
          aaa:funcation
        }
        getUserInfo()
      */
    } else {
      return {
        ...state
      }
    }
  }
}
export default combineReducers({
  // counter: counterReducer,
  // showener: showenReducer,
  userInfo:userInfoReducer
})
// export default reducer




// function undateObject(oldObj, newValues) {
//   console.log(Object.assign({}, oldObj, newValues));
//   return Object.assign({}, oldObj, newValues)
// }

// function updateItem(array, itemId, updatecallback) {
//   const updateItems = array.map(item => {
//     if (item.id !== itemId) {
//       //具体操作
//       return item
//     }
//     const updateItem = updatecallback(item)
//     return updateItem
//   })

//   return updateItems
// }


// const todosReducer = createReducer([], {
//   INCREMENT: INCREMENT,
//   DECREMENT: DECREMENT
// })
// function counterReducer(prestate = 0, action) {
//   console.log(count);

//   const { type, payload } = action
//   switch (type) {
//     case INCREMENT:
//       return increment(prestate, payload)
//     case DECREMENT:
//       return decrement(prestate, payload)
//     case INCREMENTIFODD:
//       return increment(prestate, payload)
//     case INCREMENTASYNC:
//       return increment(prestate, payload)
//     default:
//       return prestate
//   }
// }

// function showenReducer(prestate = state, action) {
//   const { type, payload } = action;
//   // 当 reducer 接受到不同类型的 action 时，会对 state 进行处理，返回一个新的 state 值
//   switch (type) {
//     case SHOWEN:
//       // return undateObject(prestate, payload)
//       return {
//         ...prestate,
//         list: payload // 这里传过来的 payload 就是筛选过的数组
//       };
//     default:
//       return state;
//   }
// }
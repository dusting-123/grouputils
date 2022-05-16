//reducer可以：初始化状态，加工状态，最后返回新状态
import { combineReducers } from "redux";
import {
  SIGNINFO,
  USERINFO,
  CREATERINFO,
  SIGNLIST,
  USERSIGNLIST,
  GETVOTEINFO,
  UNIQUE,
  GETVOTELIST
} from "./constant";
import { count, state } from './state';
const {
  userInfo,
  signInfo,
  createrInfo,
  signList,
  userSignList,
  voteInfo,
  uniqueClickState,
  voteList
} = state

function getUserInfo(userInfo, action) {
  const { payload } = action
  return {
    ...userInfo,
    ...payload
  }
}
function getSignInfo(signInfo, action) {
  const { payload } = action
  return {
    ...signInfo,
    ...payload
  }
}
function getCreaterInfo(createrInfo, action) {
  const { payload } = action
  return {
    ...createrInfo,
    ...payload
  }
}
function getSignList(signList, action) {
  const { payload } = action
  return {
    ...signList,
    ...payload
  }
}
function getUserSignList(userSignList, action) {
  const { payload } = action
  return {
    ...userSignList,
    ...payload
  }
}
function getVoteInfo(voteInfo, action) {
  const { payload } = action
  return {
    ...voteInfo,
    ...payload
  }
}
function uniqueStateChange(uniqueClickState, action) {
  const { payload } = action
  // console.log("before:",uniqueClickState,"after:",payload);
  return {
    ...uniqueClickState,
    ...payload
  }
}
function getVoteList(voteList, action) {
  const { payload } = action
  return {
    ...voteList,
    ...payload
  }
}

const userInfoReducer = createReducer(userInfo, {
  [USERINFO]: getUserInfo
})
const signInfoReducer = createReducer(signInfo, {
  [SIGNINFO]: getSignInfo
})
const createrInfoReducer = createReducer(createrInfo, {
  [CREATERINFO]: getCreaterInfo
})
const getSignListReducer = createReducer(signList, {
  [SIGNLIST]: getSignList
})
const getUserSignListReducer = createReducer(userSignList, {
  [USERSIGNLIST]: getUserSignList
})
const getVoteInfoReducer = createReducer(voteInfo, {
  [GETVOTEINFO]: getVoteInfo
})
const uniqueStateChangeReducer = createReducer(uniqueClickState, {
  [UNIQUE]: uniqueStateChange
})
const getVoteListReducer = createReducer(voteList, {
  [GETVOTELIST]: getVoteList
})
export default combineReducers({
  userInfo: userInfoReducer,
  signInfo: signInfoReducer,
  createrInfo: createrInfoReducer,
  signList: getSignListReducer,
  userSignList: getUserSignListReducer,
  voteInfo: getVoteInfoReducer,
  uniqueClickState: uniqueStateChangeReducer,
  voteList: getVoteListReducer
})

function createReducer(initState, handlers) {
  console.log(initState);
  return function reducer(state = initState, action) {
    // console.log(handlers);
    // console.log(action);
    // console.log(state);
    // console.log(getUserInfo(state, action))
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return {
        ...state
      }
    }
  }
}
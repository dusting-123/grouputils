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
  GETVOTELIST,
  ROOMLIST,
  SIGNRECORD,
  GETPRELIST,
  GETPREINFO
} from "./constant";
import { state } from './state';
const {
  userInfo,
  signInfo,
  createrInfo,
  signList,
  userSignList,
  voteInfo,
  uniqueClickState,
  voteList,
  roomList,
  signRecord,
  preList,
  preinfo
} = state
//Rdeucer构造器
function createReducer(initState, handlers) {
  console.log(initState);
  return function reducer(state = initState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return {
        ...state
      }
    }
  }
}
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
function getRoomList(roomList, action) {
  const { payload } = action
  console.log(payload);
  return [...payload]
}
function getSignRecord(signRecord, action) {
  const { payload } = action
  return {
    ...signRecord,
    ...payload
  }
}
function getPreList(preList, action) {
  const {payload} = action
  return {...preList, ...payload}
}
function getPreInfo(preinfo, action) {
  const {payload} = action
  return {...preinfo, ...payload}
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
const getRoomListReducer = createReducer(roomList, {
  [ROOMLIST]: getRoomList
})
const getSignRecordReducer = createReducer(signRecord, {
  [SIGNRECORD]: getSignRecord
})
const getPreListReducer = createReducer(preList, {
  [GETPRELIST]: getPreList
})
const getPreInfoReducer = createReducer(preList, {
  [GETPREINFO]: getPreInfo
})

export default combineReducers({
  userInfo: userInfoReducer,
  signInfo: signInfoReducer,
  createrInfo: createrInfoReducer,
  signList: getSignListReducer,
  userSignList: getUserSignListReducer,
  voteInfo: getVoteInfoReducer,
  uniqueClickState: uniqueStateChangeReducer,
  voteList: getVoteListReducer,
  roomList: getRoomListReducer,
  signRecord: getSignRecordReducer,
  preList:  getPreListReducer,
  preinfo: getPreInfoReducer
})
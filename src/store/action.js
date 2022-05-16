//定义创建action的函数
import api from "../servers/api"
import {
  DECREMENT,
  INCREMENT,
  INCREMENTIFODD,
  USERINFO,
  SIGNINFO,
  CREATERINFO,
  SIGNLIST,
  USERSIGNLIST,
  GETVOTEINFO,
  UNIQUE,
  GETVOTELIST
} from "./constant"
import Taro from "@tarojs/taro"

export const createIncrementAction = makeActionCreator(INCREMENT, 'payload')
export const createIncrementIfOddAction = makeActionCreator(INCREMENTIFODD, 'payload')
export const createDecrementAction = makeActionCreator(DECREMENT, 'payload')
export const getUserInfo = makeActionCreator(USERINFO, 'payload')
export const getCreaterInfo = makeActionCreator(CREATERINFO, 'payload')
export const uniqueStateChange = makeActionCreator(UNIQUE, 'payload')
const getSignList = makeActionCreator(SIGNLIST, 'payload')
const getSignInfo = makeActionCreator(SIGNINFO, 'payload')
const getUserSignList = makeActionCreator(USERSIGNLIST, 'payload')
const getVoteInfo = makeActionCreator(GETVOTEINFO, 'payload')
const getVoteList = makeActionCreator(GETVOTELIST, 'payload')
//构造器
function makeActionCreator(type, ...argNames) {
  return function (...args) {
    const action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    });
    return action
  }
}

export function getSignInfoAsync(params) {
  return function (dispatch) {
    api
      .get('/sign/list', { signid: params.id })
      .then(res => {
        const { data } = res.data
        console.log(data);
        dispatch(getSignInfo(data))
        api.post('/signlist/create', {
          createdAt: Date.now(),
          signid: data.signid,
          openid: Taro.getStorageSync('openid'),
          title: data.title,
          type: 0,
          signStatus: 0
        }, 'application/x-www-form-urlencoded')
      })
  }
}

export function getCreaterInfoAsync(params) {
  return function (dispatch) {
    api
      .get('/wxuser', { openid: params.userId })
      .then(res => {
        const { data } = res.data
        console.log(data);
        dispatch(getCreaterInfo(data))
      })
  }
}
export function getSignListAsync(params) {
  return function (dispatch) {
    api
      .get('/signlist/info', { openid: params })
      .then(res => {
        const { data } = res
        console.log(data);
        dispatch(getSignList(data?.data))
      })
  }
}
export function getUserSignListAsync(params) {
  return function (dispatch) {
    api
      .get('/signlist/list', { signid: params.id })
      .then(res => {
        const { data } = res
        console.log(data);
        dispatch(getUserSignList(data.data))
      })
  }
}
export function getVoteInfoAsync(params) {
  return function (dispatch) {
    api
      .get('/vote/info', { voteid: params.id })
      .then(res => {
        const { data } = res.data
        let uniqueClickState = {}
        const optionData0 = data.optionData
        for (let i = 0; i < optionData0.length; i++) {
          let value = optionData0[i].unique
          uniqueClickState[value] = false;
        }
        dispatch(getVoteInfo(data))
        dispatch(uniqueStateChange(uniqueClickState))
      })
  }
}
export function subVoteOptAsync(params) {
  return function(dispatch) {
    api
      .post('/vote/update',{...params})
      .then(res => {
        const { data } = res.data
        dispatch(getVoteInfo(data))
      })
  }
}

export function getVoteListAsync(params) {
  return function(dispatch) {
    api
      .get('/vote/partlist', {userid: params})
      .then(res => {
        const {data} = res.data
        dispatch(getVoteList(data))
      })
  }
}


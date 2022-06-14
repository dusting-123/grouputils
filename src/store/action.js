//定义创建action的函数
import Taro from "@tarojs/taro"
import api from "../servers/api"
import {
  CREATERINFO, DECREMENT, GETVOTEINFO, GETVOTELIST, INCREMENT,
  INCREMENTIFODD, ROOMLIST, SIGNINFO, SIGNLIST, UNIQUE, USERINFO, USERSIGNLIST, SIGNRECORD,GETPRELIST,
  GETPREINFO
} from "./constant"

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
const getRoomList = makeActionCreator(ROOMLIST, 'payload')
const getSignRecord = makeActionCreator(SIGNRECORD, 'payload')
const getPreList = makeActionCreator(GETPRELIST, 'payload')
const getPreInfo = makeActionCreator(GETPREINFO, 'payload')
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
          signStatus: 0 //0：未签到 1:已签到
        })
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
  return function (dispatch) {
    api
      .post('/vote/update', { ...params })
      .then(res => {
        const { data } = res.data
        dispatch(getVoteInfo(data))
      })
  }
}

export function getVoteListAsync(params) {
  return function (dispatch) {
    api
      .get('/vote/partlist', { userid: params })
      .then(res => {
        const { data } = res.data
        console.log(987654,data);
        dispatch(getVoteList(data))
      })
  }
}

export function getPreListAsync(params) {
  return function (dispatch) {
    api
      .get('/prelist/minelist', { userid: params })
      .then(res => {
        const { data } = res.data
        console.log(11111,data);
        dispatch(getPreList(data))
      })
  }
}
export function getRoomListAsync() {
  return function (dispatch) {
    api
      .get('/bookroom/roomlist', {})
      .then(res => {
        const { data } = res.data
        console.log(data);
        dispatch(getRoomList(data))
      })
  }
}
export function getSignRecordAsync(params) {
  return function (dispatch) {
    api
      .get('/signlist/record', { ...params })
      .then(res => {
        const { data } = res.data
        dispatch(getSignRecord(data))
      })
  }
}
export function getUserInfoAsync(params) {
  return function (dispatch) {
    api
      .get('/wxlogin/getinfo', { openid: params })
      .then(res => {
        const { data, success, errMsg } = res.data
        if (!success) {
          Taro.showToast({
            title: errMsg,
            icon: 'error',
            duration: 1500
          })
          Taro.switchTab({
            url: '/pages/user/index',
          })
        } else {
          dispatch(getUserInfo(data))
        }
      })
  }
}
export  function setUserAsync(params) {
  return function (dispatch) {
    api
      .post('/wxlogin', {
        ...params,
        openid: Taro.getStorageSync('openid'),
      })
      .then(res => {
        const { data, success } = res.data
        if (success) {
           api
            .get('/wxlogin/getinfo', { openid: Taro.getStorageSync('openid') })
            .then(resp => {
              const { data, success, errMsg } = resp.data
              if (!success) {
                Taro.showToast({
                  title: errMsg,
                  icon: 'error',
                  duration: 1500
                })
                setTimeout(()=> {
                  Taro.switchTab({
                    url: '/pages/user/index',
                  })
                }, 2000)

              } else {
                dispatch(getUserInfo(data))
              }
            })
        }
      })
  }
}
export function getPreInfoAsync(params) {
  return function (dispatch) {
    api
      .get('/bookroom/preinfo', {...params })
      .then(res => {
        const { data } = res.data
        console.log(98765,data);
        dispatch(getPreInfo(data))
      })
  }
}


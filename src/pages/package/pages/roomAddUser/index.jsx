import Taro, { useRouter, useShareAppMessage } from "@tarojs/taro";
import { useEffect, useState } from "react"
import { Picker } from '@tarojs/components'
import { AtInput, AtButton, AtList, AtListItem } from "taro-ui"
import api from "@/servers/api";
import { View } from "@tarojs/components";
import { formatTimeStampToTime } from '@/utils/common';
import './index.less'
const RoomAddUser = () => {
  const { roomid } = useRouter().params
  const [sub, setSub] = useState(false)
  const [userData, setUserData] = useState({
    userid: '',
    userName: '',
    phoneNum: null,
    detail: '',
    begin: '-',
    endtime: '-',
    data: '-'
  })
  const openid = Taro.getStorageSync('openid')
  useEffect(() => {

  }, [])
  useShareAppMessage(res => {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '分享到群',
      path: `/pages/package/pages/bookDetail/index?roomid=${roomid}&phoneNum=${userData.phoneNum}`,
    }
  })
  const inputHandle = (e, type) => {
    e = e?.detail?.value || e
    console.log(e);
    setUserData({ ...userData, [type]: e })
  }
  const submit = (userData) => {
    const date = new Date()
    const nowDate = Date.parse(formatTimeStampToTime(date.getTime()))
    const creDate = Date.parse(userData.data)
    const [h1 = 0, m1 = 0] = userData.begin.split(":") || []
    const [h2 = 0, m2 = 0] = userData.endtime.split(":") || []
    if (userData.userName == '') {
      Taro.showToast({
        title: '姓名不能为空',
        icon: 'error',
        duration: 1000
      })
    } else if (userData.phoneNum == null) {
      Taro.showToast({
        title: '电话不能为空',
        icon: 'error',
        duration: 1000
      })
    } else if (userData.data == '-') {
      Taro.showToast({
        title: '日期错误',
        icon: 'error',
        duration: 1000
      })
    } else if (userData.begin == '-' || userData.endtime == '-') {
      Taro.showToast({
        title: '时间错误',
        icon: 'error',
        duration: 1000
      })
    } else if (creDate < nowDate) {
      Taro.showToast({
        title: '日期必须大于等于今天',
        icon: 'error',
        duration: 1000
      })
    } else if (date.setHours(h1, m1) >= date.setHours(h2, m2)) {
      console.log(date.setHours(h1, m1));
      console.log(date.setHours(h2, m2));
      console.log(date.setHours(h1, m1) >= date.setHours(h2, m2));
      Taro.showToast({
        title: '结束时间要晚于开始时间',
        icon: 'error',
        duration: 1000
      })
    } else {
      api
        .post('/bookroom/adduser', {
          userData: {
            ...userData,
            userid: openid
          },
          roomid: roomid
        })
        .then(res => {
          const { code, success, errMsg } = res.data
          api
            .post('/prelist/create', {roomid: roomid, userid: openid})
          if (success) {
            Taro.showToast({
              title: '提交成功！',
              icon: 'success',
              duration: 1500
            })
            setSub(!sub)
          } else {
            Taro.showToast({
              title: errMsg,
              icon: 'error',
              duration: 2000
            })
          }
        })
    }
  }
  const reset = () => {
    setUserData({
      userid: '',
      userName: '',
      phoneNum: null,
      detail: '',
      begin: '-',
      endtime: '-',
      data: '-'
    })
    setSub(!sub)
  }
  return (
    <>
      <AtInput
        placeholder="姓名"
        value={userData.userName}
        maxLength='32'
        disabled={sub}
        onChange={(e) => inputHandle(e, 'userName')}
      />
      <AtInput
        type="number"
        placeholder="手机号"
        value={userData.phoneNum}
        disabled={sub}
        onChange={(e) => inputHandle(e, 'phoneNum')}
      />
      <AtInput
        placeholder="说明"
        value={userData.detail}
        disabled={sub}
        onChange={(e) => inputHandle(e, 'detail')}
      />
      <Picker mode='date' disabled={sub} onChange={(e) => inputHandle(e, 'data')}>
        <AtList>
          <AtListItem title='请选择日期:' extraText={userData.data} />
        </AtList>
      </Picker>
      <Picker mode='time' disabled={sub} onChange={(e) => inputHandle(e, 'begin')}>
        <AtList>
          <AtListItem title='开始时间：' extraText={userData.begin} />
        </AtList>
      </Picker>
      <Picker mode='time' disabled={sub} onChange={(e) => inputHandle(e, 'endtime')}>
        <AtList>
          <AtListItem title='结束时间：' extraText={userData.endtime} />
        </AtList>
      </Picker>
      <View>
        <AtButton className="btn" disabled={sub} type='primary' onClick={() => submit(userData)}>提交</AtButton>
        <AtButton className="btn" disabled={!sub} openType="share" >分享</AtButton>
        <AtButton className="btn" onClick={() => reset()}>重置</AtButton>
        <AtButton className="btn" type='secondary' onClick={() => Taro.navigateBack({ delta: 1 })}>返回</AtButton>
      </View>

    </>
  )
}

export default RoomAddUser
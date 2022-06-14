import api from "@/servers/api";
import { randomString } from '@/utils/index';
import { Button, Picker, View } from "@tarojs/components";
import Taro, { useShareAppMessage } from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  AtButton,
  AtForm,
  AtInput,
  AtList,
  AtListItem,
  AtMessage,
  AtSwitch
} from "taro-ui";
import {getUserInfoAsync} from '@/store/action'
import { formatTimeStampToTime } from '@/utils/common.js'
import './index.less';
const signid = randomString(16);
const SignIn = ({ userInfo, getUserInfoAsync }) => {

  const [sub, setSub] = useState(false)
  const [form, setForm] = useState({
    title: "",
    description: '',
    address: '',
    date: '-',
    endtime: '-',
    open: true,
    saved: true,
  })
  const openid = Taro.getStorageSync('openid')
  useEffect(()=> {
    getUserInfoAsync(openid)
  },[])
  console.log(signid);
  useShareAppMessage(res => {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '分享到群',
      path: `/pages/package/pages/signDetail/index?id=${signid}&userId=${Taro.getStorageSync('openid')}`,
    }
  })

  // const onTimeChange = (e) => {
  //   setForm({ ...form, endtime: e?.detail?.value });
  // }
  const share = (e) => {
    e.stopPropagation() // 阻止冒泡
  }

  const onReset = (e) => {
    console.log(e);
    setForm({
      title: "",
      description: '',
      address: '',
      date: '-',
      endtime: '-',
      open: true,
      saved: true,
    })
    setSub(!sub)
  }
  const handleChange = (type, event) => {
    console.log(type, event);
    event = event?.detail?.value || event
    setForm({ ...form, [type]: event })
  }

  const onSubmit = (e) => {
    e.stopPropagation() // 阻止冒泡
    if (form.title == "") {
      console.log(1111, form.title);
      Taro.showToast({
        title: '标题不能为空！',
        icon: 'error',
        duration: 1000
      })
    } else if (form.endtime == '-') {
      console.log(222, form.endtime);
      Taro.showToast({
        title: '请选择时间',
        icon: 'error',
        duration: 1000
      })
    } else if (form.date == '-') {
      console.log(333, form.title);
      Taro.showToast({
        title: '请选择日期',
        icon: 'error',
        duration: 1000
      })
    } else {
      Taro.showLoading({
        title: '创建中...'
      })
      api
        .post('/sign/create', {
          ...form,
          signid: signid,
          userid: Taro.getStorageSync('openid'),
          status: 0,
          people: 0,
        }).then(res => {
          if (res.statusCode == 200) {
            Taro.hideLoading();
            Taro.showToast({
              title: '创建成功！',
              icon: 'success',
              duration: 1000
            })
            setSub(true)
          }
        })
    }
  }
  return (
    <>
      <AtForm>
        <AtInput
          disabled={sub}
          type="text"
          placeholder="签到标题"
          value={form.title}
          onChange={(e) => handleChange("title", e)}
        />
        <AtInput
          disabled={sub}
          type="text"
          placeholder="描述"
          value={form.description}
          onChange={(e) => handleChange("description", e)}
        />
        <AtInput
          disabled={sub}
          type="text"
          placeholder="签到地点"
          value={form.address}
          onChange={(e) => handleChange("address", e)}
        />
        <Picker
          mode="date"
          start={formatTimeStampToTime(Date.now())}
          disabled={sub}
          onChange={(e) => handleChange("date", e)}>
          <AtList>
            <AtListItem title="截止日期" extraText={form.date} />
          </AtList>
        </Picker>
        <Picker
          mode="time"
          disabled={sub}

          onChange={(e) => handleChange("endtime", e)}>
          <AtList>
            <AtListItem title="截止时间" extraText={form.endtime} />
          </AtList>
        </Picker>
        <AtSwitch title="公开参与人" disabled={sub} checked={form.open} onChange={(e) => handleChange("open", e)} border />
        <AtSwitch title="允许补签" disabled={sub} checked={form.saved} onChange={(e) => handleChange('saved', e)} border />
        <View className="form-btn">
          <AtMessage />
          <AtButton className="form-sub" disabled={sub} type="primary" onClick={(e) => onSubmit(e)}>提交</AtButton>
          <AtButton className="form-sub" disabled={!sub} type='secondary' openType="share" onClick={(e) => share(e)} >分享</AtButton>
          <AtButton className="form-sub"  onClick={(e) => onReset(e)} >重置</AtButton>
        </View>
      </AtForm>
    </>
  )
}
const Sign = connect(({ userInfo }) => {//mapStateToProps
  //state为当前redux 执行getState()后获得的对象
  return {
    userInfo
  }
}, {
  getUserInfoAsync: getUserInfoAsync
})(SignIn)

export default Sign
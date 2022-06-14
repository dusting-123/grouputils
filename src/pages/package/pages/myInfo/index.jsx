import api from "@/servers/api";
import { getUserInfoAsync } from '@/store/action';
import { Image, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { AtButton, AtForm, AtInput } from "taro-ui";
import './index.less';

const myInfoIn = ({ userInfo, getUserInfoAsync }) => {
  
  const [myinfo, setMyinfo] = useState({
      avatarUrl: userInfo.avatarUrl,
      nickName: userInfo.nickName,
      motto: userInfo?.motto
  })
  const openid = Taro.getStorageSync("openid")
  useEffect(() => {
    getUserInfoAsync(openid)
  },[])
  const onChange = (e, type) => {
    console.log(e);
    setMyinfo({ ...myinfo, [type]: e })
  }
  const changeAvar = () => {
    Taro.getUserProfile({
      desc: '更换头像和昵称',
      success: res => {
        const { userInfo } = res
        setMyinfo({ ...myinfo, picture: userInfo.avatarUrl })
      },
      fail: res => { console.log(res); }
    })
  }
  const save = () => {
    console.log(myinfo);
    let myanfo = {
      avatarUrl: myinfo.avatarUrl && userInfo.avatarUrl,
      nickName: myinfo.nickName && userInfo.nickName,
      motto: myinfo.motto && userInfo.motto
    }
    console.log(myanfo);
    if (myinfo.nickName == '') {
      Taro.showToast({
        title: '输入昵称',
        icon: 'error',
        duration: 1000
      })
    } else {
      api.get('/wxuser/update', {
        openid,
        ...myinfo
      }).then(res => {
        if (res.statusCode == 200) {
          Taro.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 1000
          })
        }
        getUserInfoAsync(openid)
      })
    }
  }
  return (
    <View>
      <View className="title">编辑资料</View>
      <AtForm>
        <View className="tuxiang">
          <Text >头像</Text>
          <Image className="avar" src={myinfo.avatarUrl} />
          <AtButton className="btn" size="small" onClick={() => changeAvar()} >更换头像</AtButton>
        </View>
        <AtInput
          name='myname'
          title='昵称'
          type='text'
          placeholder='例：张三'
          value={myinfo.nickName}
          onChange={(e) => onChange(e, "nickName")}
        />
        <AtInput
          name='motto'
          title='签名'
          type='text'
          placeholder='选填'
          value={myinfo.motto}
          onChange={(e) => onChange(e, "motto")}
        />
        <AtButton className="save" onClick={() => save()}>保存</AtButton>
      </AtForm>
    </View>
  )
}
const myInfo = connect((state) => {//mapStateToProps
  return {
    userInfo: state?.userInfo
  }
},{
  getUserInfoAsync: getUserInfoAsync
})(myInfoIn)

export default myInfo
import api from "@/servers/api";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { AtAvatar, AtList, AtListItem } from "taro-ui";
import { getUserInfoAsync, setUserAsync } from "../../store/action";
import avar from "@/assets/imgs/user/avar.png"
import './index.less'
const UserIn = ({ userInfo, getUserInfoAsync, setUserAsync }) => {

  // const [userInfo, setUserInfo] = useState(null)
  const [hasInfo, setHasInfo] = useState(false)
  // const openid = Taro.getStorageSync('openid')
  useEffect(() => {
    // getUserInfoAsync(openid)
  }, [])
  const handleClick = (e) => {

    Taro.getUserProfile({
      desc: '用于完善用户信息',
      success: res => {
        console.log(res);
        const { userInfo } = res
        setUserAsync(userInfo)

      },
      fail: res => { console.log(res); }
    })
    setHasInfo(!hasInfo)
  }
  const navTo = (page) => {
    const route = {
      about: page == 'about' ? page : null,
      suggest: page == 'suggest' ? page : null,
      myInfo: page == 'myInfo' ? page : null
    }
    Taro.navigateTo({
      url: `/pages/package/pages/${route[page]}/index`,
    })
  }
  return (
    <View>
      <View className="userheader" onClick={(e) => handleClick(e)}>
        <AtAvatar size="large" circle image={userInfo?.avatarUrl || avar}></AtAvatar>
        <View className="username">{userInfo?.nickName || ''}</View>
      </View>
      <View>
        <AtList>
          <AtListItem title="我的信息" arrow="right" onClick={()=> navTo('myInfo')}/>
          <AtListItem title="提点建议" arrow="right" onClick={()=> navTo('suggest')}/>
          <AtListItem title="关于助手" arrow="right" onClick={()=> navTo('about')} />
          {/* <AtListItem title="退出登录"/> */}
        </AtList>
      </View>
    </View>
  )
}
const User = connect((state) => {//mapStateToProps
  //state为当前redux 执行getState()后获得的对象
  // console.log(userInfo);
  return {
    userInfo: state?.userInfo
  }
}, {
    getUserInfoAsync: getUserInfoAsync,
    setUserAsync: setUserAsync
})(UserIn)

export default User

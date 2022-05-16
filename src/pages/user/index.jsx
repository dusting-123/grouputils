import React, { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { connect } from 'react-redux';
import { AtAvatar, AtList, AtListItem } from "taro-ui";
import ButtomMenu from "../../components/BottomMenu";
import style from './index.less';
import { View } from "@tarojs/components";
import configStore from "../../store";
import { getUserInfo } from "../../store/action";
import api from "@/servers/api";

const UserIn = ({userInfo, getUserInfos}) => {

  // const [userInfo, setUserInfo] = useState(null)
  const [hasInfo, setHasInfo] = useState(false)
  // const store = configStore()
  useEffect(()=> {

  })
  const handleClick = (e) =>{
    
    Taro.getUserProfile({
      desc: '用于完善用户信息',
      success: res => {
        console.log(res);
        const {userInfo } = res
        api
          .post('/wxlogin',{
            ...userInfo,
            openid: Taro.getStorageSync('openid'),
          },
           'application/x-www-form-urlencoded')
        getUserInfos(res?.userInfo)
        // setUserInfo(res?.userInfo)
        setHasInfo(!hasInfo)
      },
      fail: res => {console.log(res);}
    })
  }
  return (
    <>
      <View>
        <View className="user-header" onClick={(e)=>handleClick(e)}>
          <AtAvatar size="large" circle image={userInfo?.avatarUrl || '#'}></AtAvatar>
          <View className="user-name">{userInfo?.nickName || ''}</View>
        </View>
        <View>
          <AtList>
            <AtListItem title="我的信息" arrow="right" />
            {/* <AtListItem title="aaa" arrow="right" /> */}
            <AtListItem title="提点建议" arrow="right" />
            <AtListItem title="关于助手" arrow="right" />
            <AtListItem title="退出登录"/>
          </AtList>
        </View>
      </View>
    </>
  )
}
const User = connect((state) => {//mapStateToProps
  //state为当前redux 执行getState()后获得的对象
  // console.log(userInfo);
  return {
    userInfo: state?.userInfo
  }
}, (dispatch) => {
  return {
    // handleclick: (list) => dispatch(showEnActin(list))
    getUserInfos: (userInfo) => dispatch(getUserInfo(userInfo))
  }
})(UserIn)

export default User

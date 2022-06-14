import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useState } from "react";
import { connect } from 'react-redux';
import './index.less';

const Home = (props) => {

  console.log(props);
  const { state } = props
  const taskList = [{
    name: '签到考勤',
    icon: ''
  },{
    name: '投票统计',
    icon: ''
  },{
    name: '会议室预约',
    icon: ''

  // },{
  //   name: '日程安排',
  //   icon: ''
  }]
  function taskhandle(item){
    if(item.name === '签到考勤') {
      Taro.navigateTo({
        url: '/pages/home/sign/index'
      })
    } else if(item.name === '会议室预约') {
      Taro.navigateTo({
        url: '/pages/home/bookroom/index'
      })
    } else if(item.name === '投票统计') {
      Taro.navigateTo({
        url: '/pages/home/vote/index'
      })
    // } else if(item.name === '日程安排') {
    //   Taro.navigateTo({
    //     url: '/pages/home/schedule/index'
    //   })
    }
  }
  return (
    <>
      <View className="container">
        {
          taskList.map((item, index) => {
            return <View className="taskItem" onClick={()=>taskhandle(item)}>{item.name}</View>
          })
        }
      </View>
    </>

  )
}
const Index = connect((state) => {//mapStateToProps
  //state为当前redux 执行getState()后获得的对象
  console.log(state);
  return {
    state
  }
}
)(Home)

export default Index

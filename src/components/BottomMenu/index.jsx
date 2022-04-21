import React, { useEffect } from "react";
import taro from "@tarojs/taro";
import { AtTabBar }  from 'taro-ui'

const ButtomMenu = ({menu, current, setCurrent}) => {

  useEffect(()=>{
    console.log(setCurrent);
  })
  function switchTab(e) {
    if(e === 0){
      setCurrent({index: e, url: '/pages/home/index'})
      taro.reLaunch({
        url: '/pages/home/index'
      })
    }else if(e === 1) {
      setCurrent({index: e, url: '/pages/part/index'})
      taro.reLaunch({
        url: '/pages/part/index'
      })
    }else if(e === 2) {
      setCurrent({index: e, url: '/pages/creat/index'})
      taro.reLaunch({
        url: '/pages/creat/index'
      })
    }else if(e === 3) {
      setCurrent({index: e, url: '/pages/user/index'})
      taro.reLaunch({
        url: '/pages/user/index'
      })
    } 
  }
  return (
    <>
      <AtTabBar 
        fixed
        tabList={menu}
        onClick={(e)=> switchTab(e)}
        current={current.index}
      />
    </>
  )
}

export default ButtomMenu
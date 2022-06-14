import Taro from '@tarojs/taro'
import { View } from "@tarojs/components";
import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import {
  AtButton,
  AtForm,
  AtInput, AtSearchBar, AtAccordion, AtList, AtListItem
} from "taro-ui";
import { getRoomListAsync, getUserInfoAsync} from '@/store/action';
import './index.less'
import api from '@/servers/api';
const BookRoomIn = (props) => {
  const {
    roomList,
    getRoomListAsync,
    getUserInfoAsync
  } = props
  const [value, setValue] = useState('')
  const [open, setOpen] = useState([])
  const openid = Taro.getStorageSync("openid")
  useEffect(() => {
    getUserInfoAsync(openid)
    getRoomListAsync()
  }, [])
  const handleChange = (e) => {
    console.log(e);
    setValue(() => {
      return e
    })
  }
  console.log(roomList);
  const onSubmit = (event) => {

  }
  const onReset = () => {
    setValue('')
  }
  const createInfo = () => {
    Taro.navigateTo({
      url: '/pages/package/pages/createRoom/index'
    })
  }
  const addUser = (room) => {
    Taro.navigateTo({
      url: `/pages/package/pages/roomAddUser/index?roomid=${room.roomid}`,
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptData: function(data) {
          console.log(data)
        }
      },
      success: (res) => {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptData', { data: room })
      }
    })
  }
  const openTab = (e, idx) => {
    // console.log(e);
    open[idx] = e
    console.log(open);
    setOpen([...open])
  }
  return (
    <>
      <View className="header">
        <AtSearchBar
          value={''}
          className="search-bar"
          placeholder='搜索'
          onChange={() => {}}
        />
        <View onClick={() => createInfo()}>+</View>
      </View>
      {
        roomList && roomList.map((item, index) => {
          return (
            <AtAccordion
              open={open[index]}
              onClick={(e) => openTab(e, index)}
              title={item.name}
            >
              <AtList >
                {
                  item.userData && item.userData.map((itm, idx) => {
                    return (
                      <AtListItem
                        key={idx}
                        title={`${itm.data} ${itm.begin}-${itm.endtime}`}
                        note={`${itm.userName} ${itm.phoneNum}`}
                      // arrow='right'
                      />
                    )
                  })
                }
                <AtButton type='primary' onClick={() => addUser(item)}>预约</AtButton>
              </AtList>
            </AtAccordion>
          )
        })
      }
    </>
  )
}
const BookRoom = connect((state) => {
  const isarr = state?.roomList instanceof Array
  console.log(state);
  if (!isarr) {
    state.roomList = []
  }
  return {
    roomList: state?.roomList
  }
}, {
  getRoomListAsync: getRoomListAsync,
  getUserInfoAsync: getUserInfoAsync
})(BookRoomIn)
export default BookRoom
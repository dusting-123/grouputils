import { getSignListAsync ,getVoteListAsync} from "@/store/action";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { isArray, isObject } from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { AtButton, AtTabs, AtTabsPane, AtAvatar} from 'taro-ui';
import api from "../../servers/api";
import './index.less'

const PartIn = (props) => {
  const {
    signList,
    voteList,
    getSignListAsync,
    getVoteListAsync
  } = props
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    console.log(signList);
    const openid = Taro.getStorageSync('openid')
    if (current == 0) {
      getSignListAsync(openid)
    } else if (current == 1) {
      
    } else if (current == 2) {
      getVoteListAsync(openid)
    } else if (current == 3) {
    }
  },[current])
  const handleClick = e => {
    console.log(e);
    setCurrent(e)
  }
  const listhandle = (userSign, createrInfo, type) => {
    console.log(userSign.signid, createrInfo.openid);
    let userid = {
      sign: type == "sign" ? userSign?.signid : null,
      vote: type == "vote" ? userSign?.voteid : null
    }
    // if(type == 'sign') {
    //   userid = userSign?.signid
    // } else if (type == 'vote') {
    //   userid = userSign?.voteid
    // }
    Taro.navigateTo({
      url: `/pages/package/pages/${type}Detail/index?id=${userid[type]}&userId=${createrInfo.openid}`
    })
  }
  console.log(voteList);
  const chandle = () => {
    const openid = Taro.getStorageSync('openid')
    getVoteListAsync(openid)
    // api
    //   .get('/signlist/info', { openid: Taro.getStorageSync('openid') })
    //   .then(res => {
    //     const { data } = res
    //     console.log(data);
    //   })
  }
  return (
    <>
      <AtTabs
        current={current}
        scroll
        tabList={[
          { title: '签到考勤' },
          { title: '投票统计' },
          { title: '活动抽签' },
          { title: '日程安排' }
        ]}
        onClick={e => handleClick(e)}
      >
        <AtTabsPane current={current} index={0}>
          {
            signList.userSignList && signList.userSignList.map((item, index) => {
              const {createrList} = signList
              return (
                <View className="list"
                onClick={() => listhandle(item, createrList[index], 'sign')}>
                    <View className="list-header">
                      <View>{item.title}</View>
                      <View>{item.status == 1 ? '进行中': '未开始'}</View>
                    </View>
                    <View className="list-foot">
                      <AtAvatar className="avatar" size="small" circle image={createrList[index]?.avatarUrl || '#'}></AtAvatar>
                      <View className="user-name">{createrList[index]?.nickName || ''}</View>
                    </View>
                </View>
              )
            })
          }
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          {/* <AtButton onClick={()=>chandle()}>aaa</AtButton> */}
        {
            voteList.voteInfoList && voteList.voteInfoList.map((item, index) => {
              const {voteCreaterList} = voteList
              return (
                <View className="list"
                onClick={() => listhandle(item, voteCreaterList[index], 'vote')}
                >
                    <View className="list-header">
                      <View>{item.title}</View>
                      <View>{item.status == 1 ? '进行中': '未开始'}</View>
                    </View>
                    <View className="list-foot">
                      <AtAvatar className="avatar" size="small" circle image={voteCreaterList[index]?.avatarUrl || '#'}></AtAvatar>
                      <View className="user-name">{voteCreaterList[index]?.nickName || ''}</View>
                    </View>
                </View>
              )
            })
          }
        </AtTabsPane>
        <AtTabsPane current={current} index={2}>
          <View style='font-size:18px;text-align:center;height:100px;'>活动抽签的内容</View>
        </AtTabsPane>
        
        <AtTabsPane current={current} index={3}>
          <View style='font-size:18px;text-align:center;height:100px;'>日程安排的内容</View>
        </AtTabsPane>
      </AtTabs>
    </>

  )
}
const Part = connect((state) => {//mapStateToProps
  //state为当前redux 执行getState()后获得的对象
  return {
    signList: state?.signList,
    voteList: state?.voteList
  }
},{
  getSignListAsync: getSignListAsync,
  getVoteListAsync: getVoteListAsync
})(PartIn)

export default Part

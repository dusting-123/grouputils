import { getPreListAsync, getSignListAsync, getUserInfoAsync, getVoteListAsync } from "@/store/action";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { AtAccordion, AtAvatar, AtList, AtListItem, AtTabs, AtTabsPane } from 'taro-ui';
import './index.less';

const PartIn = (props) => {
  const {
    signList,
    voteList,
    preList,
    getSignListAsync,
    getVoteListAsync,
    getUserInfoAsync,
    getPreListAsync
  } = props
  const [current, setCurrent] = useState(0)
  const [open, setOpen] = useState([])
  const openid = Taro.getStorageSync('openid')
  useEffect(() => {
    getUserInfoAsync(openid)
    getSignListAsync(openid)
    getVoteListAsync(openid)
    getPreListAsync(openid)
  }, [])
  const handleClick = e => {
    console.log(e);
    setCurrent(e)
  }
  const openTab = (e, idx) => {
    // console.log(e);
    open[idx] = e
    console.log(open);
    setOpen([...open])
  }
  const listhandle = (userSign, createrInfo, type) => {
    console.log(userSign.signid, createrInfo.openid);
    let userid = {
      sign: type == "sign" ? userSign?.signid : null,
      vote: type == "vote" ? userSign?.voteid : null,
      // pre: type == "pre" ? userSign?.roomid : null,
    }
    Taro.navigateTo({
      url: `/pages/package/pages/${type}Detail/index?id=${userid[type]}&userId=${createrInfo.openid}`
    })
  }
  const navToinfo = (roomid, phoneNum) => {
    Taro.navigateTo({
      url: `/pages/package/pages/bookDetail/index?roomid=${roomid}&phoneNum=${phoneNum}`
    })
  }
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
        // scroll
        tabList={[
          { title: '签到考勤' },
          { title: '投票统计' },
          { title: '会议室预约' }
          // { title: '日程安排' }
        ]}
        onClick={e => handleClick(e)}
      >
        <AtTabsPane current={current} index={0}>
          {
            signList.userSignList && signList.userSignList.map((item, index) => {
              const { createrList } = signList
              return (
                <View className="list"
                  onClick={() => listhandle(item, createrList[index], 'sign')}>
                  <View className="list-header">
                    <View>{item.title}</View>
                    <View>{item.status == 1 ? '已结束' : '进行中'}</View>
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
              const { voteCreaterList } = voteList
              return (
                <View className="list"
                  onClick={() => listhandle(item, openid, 'vote')}
                >
                  <View className="list-header">
                    <View>{item.title}</View>
                    {/* <View>{item.status == 1 ? '进行中' : '未开始'}</View> */}
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
          {preList.list && preList.list.map((item, index) => {
            return(
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
                        title={itm.userName}
                        note={`${itm.data} ${itm.begin}-${itm.endtime}`}
                        arrow='right'
                        onClick={()=>navToinfo(item.roomid, itm.phoneNum)}
                      />
                    )
                  })
                }
              </AtList>
            </AtAccordion>
      
              // item.userData && item.userData.map((itm, idx) => {
              //   return (
              //     <View className="list"
              //       onClick={() => listhandle(item, voteCreaterList[index], 'pre')}
              //     >
              //       <View className="list-header">
              //         <View>{item.name}</View>
              //       </View>
              //       <View className="list-foot">
              //         <View>{itm.userName}</View>
              //         <View>{itm.data}</View>
              //         <View>{itm.begin}-{itm.endtime}</View>
              //       </View>
              //     </View>
              //   )
              // })
            )
            
          }
          )}
        </AtTabsPane>
        {/*         
        <AtTabsPane current={current} index={3}>
          <View style='font-size:18px;text-align:center;height:100px;'>日程安排的内容</View>
        </AtTabsPane> */}
      </AtTabs>
    </>

  )
}
const Part = connect((state) => {//mapStateToProps
  //state为当前redux 执行getState()后获得的对象
  const isarr = state?.preList instanceof Array
  // if (!isarr) {
  //   state.preList = []
  // }
  console.log(22222,state?.voteList);
  return {
    signList: state?.signList,
    voteList: state?.voteList,
    preList: state?.preList
  }
}, {
  getSignListAsync: getSignListAsync,
  getVoteListAsync: getVoteListAsync,
  getUserInfoAsync: getUserInfoAsync,
  getPreListAsync: getPreListAsync
})(PartIn)

export default Part

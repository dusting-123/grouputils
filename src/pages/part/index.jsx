import { View } from "@tarojs/components";
import React, { useState } from "react";
import { connect } from 'react-redux';
import { AtTabs, AtTabsPane } from 'taro-ui';

const PartIn = (props) => {
  const [current, setCurrent] = useState(0)

  const handleClick = e => {
    setCurrent(e)
  }

  return (
    <>
      <AtTabs
        current={current}
        scroll
        tabList={[
          { title: '签到考勤' },
          { title: '活动抽签' },
          { title: '投票统计' },
          { title: '日程安排' }
        ]}
        onClick={e => handleClick(e)}
      >
        <AtTabsPane current={current} index={0}>
          <View style='font-size:18px;text-align:center;height:100px;'>
            
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View style='font-size:18px;text-align:center;height:100px;'>活动抽签的内容</View>
        </AtTabsPane>
        <AtTabsPane current={current} index={2}>
          <View style='font-size:18px;text-align:center;height:100px;'>投票统计的内容</View>
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
  console.log(state);
  return {
    state
  }
}, (dispatch) => {
  return {
    // handleclick: (list) => dispatch(showEnActin(list))
  }
})(PartIn)

export default Part

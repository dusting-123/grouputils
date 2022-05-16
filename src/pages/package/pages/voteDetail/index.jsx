import Taro from "@tarojs/taro";
import { getVoteInfoAsync, uniqueStateChange, subVoteOptAsync } from "@/store/action";
import { parseParam } from "@/utils";
import { Button, Image, Text, View, Progress } from "@tarojs/components";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import configStore from "@/store";
import './index.less';
const store = configStore()
const voteDetailIn = (props) => {
  const {
    tid,
    voteInfo,
    getVoteInfoAsync,
    uniqueClickState,
    userInfo,
    subVoteOptAsync,
    // uniqueStateChange
  } = props
  const [uniqueState, setUniqueState] = useState(uniqueClickState)
  const [okWord, setOkWord] = useState("确认投票")
  const params = parseParam(tid);
  const openid = Taro.getStorageSync('openid')
  console.log(params);
  useEffect(async () => {
    await getVoteInfoAsync(params)
  }, [])

  const voteOne = (e) => {
    console.log(e);
    console.log(uniqueClickState);
    if (okWord != "已投票" && voteInfo.radio == 0) {//单选
      let optionData0 = voteInfo.optionData
      let uniqueClickState0 = {}
      for (let i = 0; i < optionData0.length; i++) {
        let value = optionData0[i].unique
        uniqueClickState0[value] = false
      }
      uniqueClickState0[e.currentTarget.dataset.unique] = !uniqueClickState0[e.currentTarget.dataset.unique]
      store.dispatch(uniqueStateChange(uniqueClickState0))
      setUniqueState(uniqueClickState0)

    } else if (okWord != "已投票" && voteInfo.radio == 1) { //多选
      let uniqueClickState0 = uniqueState
      uniqueClickState0[e.currentTarget.dataset.unique] = !uniqueClickState0[e.currentTarget.dataset.unique]
      store.dispatch(uniqueStateChange(uniqueClickState0))
      setUniqueState(uniqueClickState0)
    } else {
      Taro.showToast({
        title: '您已经投过票啦！',
        icon: 'error',
        duration: 1000
      })
    }
  }
  const ok = async () => {
    let hasSelected = false;
    for (let i = 0; i < voteInfo.optionData.length; i++) {
      if(uniqueState[voteInfo.optionData[i].unique]) {
        hasSelected = true
        break
      }
    }
    if (!hasSelected) { //判断当前用户是否选择了选项
      Taro.showToast({
        title: "请勾选您的选项！",
        icon: 'none',
        duration: 1000,
      })
    } else {
      Taro.showLoading({
        title: '加载中...'
      })
    }
    await getVoteInfoAsync(params)//获取最新的数据
    let totalNumber = 0;
    let optData = voteInfo.optionData
    for (let i = 0; i < optData.length; i++) {
      totalNumber += optData[i].number
    }
    for (let i = 0; i < optData.length; i++) {
      if(uniqueState[optData[i].unique]) {
        optData[i].number += 1;
        totalNumber += 1;
        optData[i].joiner.push([openid, userInfo.avatarUrl, userInfo.nickName])
      }
    }
    for (let i = 0; i < optData.length; i++) {//所有数据加完以后再次计算投票百分比
      optData[i].percent = parseInt((optData[i].number / totalNumber) * 100)
    }
    const voteParams = {
      voteid: params.id,
      optionData: optData,
      openid: openid
    }
    await subVoteOptAsync(voteParams);
    Taro.hideLoading();
    setOkWord({okWord: '已投票'})
    Taro.showToast({
      title:'投票成功！',
      icon: 'success',
      duration: 1500
    })
  }
  return (
    <>
      <View>
        <View className='title'>{voteInfo.title}</View>
        <View className="description">
          描述：{voteInfo.description || '无'}
          <Text style='color:#000;'>{voteInfo.radio == '0' ? '[单选]' : '[多选]'} {voteInfo.noName == 'true' ? '[匿名投票]' : ''}</Text>
        </View>
        <View style='padding:5px 0'>
          {
            voteInfo.optionData && voteInfo.optionData.map((item) => {
              return (
                <View onClick={(e) => voteOne(e)} data-unique={item.unique} className="option">
                  <View className='option-front'>
                    <Text>{item.content}</Text>
                    <Image src={require('@/assets/imgs/vote/right.svg')} className={`right ${uniqueState[item.unique]?'selected':''}`}></Image>
                  </View>
                  <View>
                    <Text>{item.number}票</Text>
                    <Text style='margin-left:16rpx;'>{item.percent}%</Text>
                  </View>
                  <Progress percent={item.percent} stroke-width="2" color="#346CFF" />
                  <View style='background:#fff;border-top:1px solid #f6f6f6;'>
                    {
                      item.joiner && item.joiner.map(itm => {
                        return (
                          <Image className="user-imgs" key={itm} src={itm[1]}/>
                        )
                      })
                    }
                  </View>
                </View>
              )
            })
          }
        </View>
        <View className="end-time">投票截止：{voteInfo.date} {voteInfo.time}</View>
        <View className='guidance'>步骤：点击勾选你的选项，然后按‘确认投票’按钮，确认后将不可更改。</View>
        <Button className="ok" onClick={()=> ok()} disabled={okWord == "已投票"}>{okWord}</Button>
      </View>
    </>
  )
}
const voteDetail = connect((state) => {
  return {
    voteInfo: state?.voteInfo,
    uniqueClickState: state?.uniqueClickState,
    userInfo: state?.userInfo
  }
}, {
  getVoteInfoAsync: getVoteInfoAsync,
  subVoteOptAsync: subVoteOptAsync
  // uniqueStateChange: (list) => dispatch(uniqueStateChange(list)),
}
)(voteDetailIn)
export default voteDetail
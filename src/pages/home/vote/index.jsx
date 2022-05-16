import Taro, {useShareAppMessage} from "@tarojs/taro";
import {
  Button, Image, Label, Picker,
  Radio, RadioGroup, Text, View, Input
} from "@tarojs/components";
import React, { useState } from "react";
import { connect } from 'react-redux';
import {
  AtButton, AtForm,
  AtInput,
  AtList,
  AtListItem, AtMessage,
  AtModal,
  AtModalAction,
  AtModalContent, AtSwitch
} from "taro-ui";
import { randomString } from '@/utils/index';
import api from "@/servers/api";
import './index.less';
const voteid = randomString(16);
const VoteIn = (props) => {
  const [show, setShow] = useState(false)
  const [orignData, setOrignData] = useState({
    voteid: '',  //投票活动的id号
    title: '', //投票标题
    description: '',//补充描述
    tempUnique: 2,//每添加一次选项，tempUnique+1,防止删除选项时造成重复
    optionData: [
      { unique: 0, content: '', number: 0, percent: 0, joiner: [] },
      { unique: 1, content: '', number: 0, percent: 0, joiner: [] },
    ],
    date: '', //投票截止日期
    time: '', //投票截止时间
    noName: false,  //匿名投票
    radio: 0,   //单选还是多选
  })
  useShareAppMessage(res => {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '分享到群',
      path: `/pages/package/pages/voteDetail/index?id=${voteid}&userId=${Taro.getStorageSync('openid')}`
    }
  })
  const inputChange = (event, type, v) => {
    if (type == 'optionData') {
      console.log(event.target);
      let optionData0 = orignData.optionData;
      for (let i = 0; i < optionData0.length; i++) {
        if (optionData0[i].unique == event.target.dataset.unique) {
          optionData0[i].content = event.detail.value;
          setOrignData({ ...orignData, optionData: optionData0 })
          return false;
        }
      }
      console.log(event);
      //  setOrignData({ ...orignData, optionData: [...orignData.optionData, content: event] })
    } else {
      event = event?.detail?.value || event
      setOrignData({ ...orignData, [type]: event })
    }
    console.log(orignData);
  }
  const reduceOption = (e) => {
    console.log(e.target.dataset);
    let optionData0 = orignData.optionData
    for (let i = 0; i < optionData0.length; i++) {
      if (optionData0[i].unique == e.target.dataset.unique) {
        optionData0.splice(i, 1)
        setOrignData({ ...orignData, optionData: optionData0 })
        return false;
      }
    }
  }
  const addOption = () => {
    let tempUnique0 = orignData.tempUnique;
    let optionData0 = orignData.optionData
    optionData0.push({ unique: tempUnique0, content: '', number: 0, percent: 0, joiner: [] })
    tempUnique0++
    setOrignData({ ...orignData, tempUnique: tempUnique0, optionData: optionData0 })
  }
  const onReset = (e) => {
    setOrignData({
      voteid: '',  //投票活动的id号
      title: '', //投票标题
      description: '',//补充描述
      tempUnique: 2,//每添加一次选项，tempUnique+1,防止删除选项时造成重复
      optionData: [
        { unique: 0, content: '', number: 0, percent: 0, joiner: [] },
        { unique: 1, content: '', number: 0, percent: 0, joiner: [] },
      ],
      date: '', //投票截止日期
      time: '', //投票截止时间
      noName: false,  //匿名投票
      radio: 0,   //单选还是多选
    })
  }
  const onConfirm = (e) => {
    e.stopPropagation() // 阻止冒泡
    setShow(!show)
  }
  const submitfrom = (e) => {
    e.stopPropagation() // 阻止冒泡
    setShow(!show)
    api
      .post('/vote/create',{
        ...orignData,
        voteid: voteid,
        userid: Taro.getStorageSync('openid'),
        status: 0,
        people: 0,
      },
       'application/json'
      ).then(res => {
        console.log(res);
      }).catch(err => {
        throw err
      })
  }
  return (
    <>
      <AtForm>
        <AtInput
          placeholder='投票标题'
          placeholderStyle='color:#999;font-size:34rpx;font-weight:bold;'
          value={orignData.title}
          maxLength='32'
          focus='true'
          onChange={(e) => inputChange(e, 'title')}
        />
        <AtInput
          placeholder='补充描述(选填)'
          placeholderStyle='color:#999;font-size:30rpx;'
          value={orignData.description}
          onChange={(e) => { inputChange(e, 'description') }} />
        {
          orignData?.optionData.map(item => {
            return (
              <View key={item.unique} className='option-container' style='margin-top:30px;'>
                <Image
                  src={require('@/assets/imgs/vote/reduce.svg')}
                  onClick={(e) => reduceOption(e)}
                  data-unique={item.unique} />
                <Input
                  data-unique={item.unique}
                  placeholderStyle='color:#999;'
                  value={item.content}
                  maxlength='32'
                  placeholder='选项'
                  onChange={(e, v) => { inputChange(e, 'optionData', v) }} />
              </View>
            )
          })
        }
        <View className='option-container-add' onClick={() => addOption()} >
          <Image src={require('@/assets/imgs/vote/add.svg')} />
          <Text>添加选项</Text>
        </View>

        <View>
          <Picker mode='date' onChange={(e) => { inputChange(e, 'date') }}>
            <AtList >
              <AtListItem title='截止日期:' extraText={orignData.date} />
            </AtList>
          </Picker>
          <Picker mode="time" onChange={(e) => { inputChange(e, 'time') }}>
            <AtList>
              <AtListItem title='截止时间:' extraText={orignData.time} />
            </AtList>
          </Picker>
          <View >
            <AtSwitch
              title='匿名投票'
              checked={orignData.noName}
              onChange={(e) => { inputChange(e, 'noName') }} />
          </View>
        </View>
        <RadioGroup
          className="radio-group"
          onChange={(e) => { inputChange(e, 'radio') }}>
          <Label for='0'>
            <Radio color="#338FFF" value='0' checked>创建单选投票</Radio>
            {/* <Text style='margin-left:20px'>创建单选投票</Text> */}
          </Label>
          <Label for="1" style='margin-top:20px;'>
            <Radio color="#338FFF" value='1'>创建多选投票</Radio>
            {/* <Text style='margin-left:20px'>创建多选投票</Text> */}
          </Label>
        </RadioGroup>
        <View className="form-btn">
          <AtButton className="form-sub" onClick={(e) => onReset(e)} >重置</AtButton>
          <AtMessage />
          <AtButton className="form-sub" type="primary" onClick={(e) => onConfirm(e)} >发布</AtButton>
        </View>
      </AtForm>
      <AtModal isOpened={show}>
        <AtModalContent>请仔细检查，确认发布？</AtModalContent>
        <AtModalAction>
          <Button onClick={e => setShow(!show)}>取消</Button>
          <Button type="primary" openType="share" onClick={(e) => submitfrom(e)}>确定</Button>
        </AtModalAction>
      </AtModal>
    </>

  )
}
const Vote = connect((state) => {//mapStateToProps
  //state为当前redux 执行getState()后获得的对象
  console.log(state);
  return {
    state
  }
}, (dispatch) => {
  return {
    // handleclick: (list) => dispatch(showEnActin(list))
  }
})(VoteIn)

export default Vote
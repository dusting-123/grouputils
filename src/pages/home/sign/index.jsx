import api from "@/servers/api";
import { randomString } from '@/utils/index';
import { Button, Picker, View } from "@tarojs/components";
import Taro, { useShareAppMessage } from "@tarojs/taro";
import React, { useState } from "react";
import { connect } from "react-redux";
import {
  AtButton,
  AtForm,
  AtInput,
  AtList,
  AtListItem,
  AtMessage, 
  AtModal,
  AtModalAction,
  AtModalContent,
  AtSwitch
} from "taro-ui";
import './index.less';
const signid = randomString(16);
const SignIn = ({userInfo}) => {

  const [show, setShow] = useState(false)
  const [form, setForm] = useState({
    title: '',
    address: '',
    total: null,
    endtime: '12:00',
    open: true,
    save: true,
  })

  // const userInfo = useSelector(state => state.userInfo);

  // const store = configStore()
  // const { userInfo } = store.getState()
  console.log(signid);
  useShareAppMessage(res => {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '分享到群',
      path: `/pages/package/pages/signDetail/index?id=${signid}&userId=${Taro.getStorageSync('openid')}`
    }
  })

  // const onTimeChange = (e) => {
  //   setForm({ ...form, endtime: e?.detail?.value });
  // }
  const onConfirm = (e) => {
    e.stopPropagation() // 阻止冒泡
    console.log(form);
    console.log(e);
    setShow(!show)
  }

  const onReset = (e) => {
    console.log(e);
    setForm({
      title: '',
      address: '',
      total: null,
      endtime: '12:00',
      open: true,
      save: true,
    })
  }

  const handleConfirm = (e) => {
    console.log(e);
    setShow(!show)
    // Taro.atMessage({
    //   'message': '发布成功！',
    //   'type': 'success'
    // })
  }
  const handleChange = (type, event) => {
    event = event?.detail?.value || event
    setForm({...form,[type]: event})
  }
  const submitfrom = (e) => {
    e.stopPropagation() // 阻止冒泡
    console.log(form);
    setShow(!show)
    api
      .post('/sign/create',{
        ...form,
        signid: signid,
        userid: Taro.getStorageSync('openid'),
        status: 0,
        people: 0,
      },
       'application/x-www-form-urlencoded'
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
          type="text"
          placeholder="签到标题"
          value={form.title}
          onChange={(e) => handleChange("title", e)}
        />
        <AtInput
          type="text"
          placeholder="签到地点"
          value={form.address}
          onChange={(e) => handleChange("address", e)}
        />
        <AtInput
          type="total"
          placeholder="签到人数"
          value={form.total}
          onChange={(e) => handleChange("total", e)}
        />
        <Picker mode="time" onChange={(e) => handleChange("endtime", e)}>
          <AtList>
            <AtListItem title="截止时间" extraText={form.endtime} />
          </AtList>
        </Picker>
        <AtSwitch title="公开参与人" checked={form.open} onChange={(e) =>  handleChange("open", e)} border />
        <AtSwitch title="允许补签" checked={form.save} onChange={(e) => handleChange('save', e)} border />
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
          <Button type="primary" openType="share" onClick={(e)=> submitfrom(e)}>确定</Button>
        </AtModalAction>
      </AtModal>
    </> 

  )
}
const Sign = connect(({ userInfo }) => {//mapStateToProps
  //state为当前redux 执行getState()后获得的对象
  return {
    userInfo
  }
}, (dispatch) => {
  return {
    // handleclick: (list) => dispatch(showEnActin(list))
  }
})(SignIn)

export default Sign
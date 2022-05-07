import { Button, Picker, View } from "@tarojs/components";
import { useShareAppMessage } from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  AtButton,
  AtForm,
  AtInput,
  AtList,
  AtListItem, AtMessage, AtModal,
  AtModalAction,
  AtModalContent,
  AtSwitch
} from "taro-ui";
import configStore from "../../../store";
import './index.less';

const SignIn = ({userInfo}) => {

  const [show, setShow] = useState(false)
  const [form, setForm] = useState({
    title: '',
    address: '',
    number: null,
    endtime: '12:00',
    open: true,
    save: true,
  })
  const store = configStore()
  // const userInfo = useSelector(state => state.userInfo);

  // const store = configStore()
  // const { userInfo } = store.getState()


  useEffect(() => {

  }, [form])
  useShareAppMessage(res => {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '分享到群',
      path: `/pages/package/pages/signDetail/index?name=${userInfo.nickName}&avatar=${userInfo?.avatarUrl}`
    }
  })

  const onTimeChange = (e) => {
    setForm({ ...form, endtime: e?.detail?.value });
  }
  const onConfirm = (e) => {
    console.log(e);
    setShow(!show)

  }

  const onReset = (e) => {
    console.log(e);
    setForm({
      title: '',
      address: '',
      number: null,
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

  return (
    <>
      <AtForm>
        <AtInput
          type="text"
          placeholder="签到标题"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e })}
        />
        <AtInput
          type="text"
          placeholder="签到地点"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e })}
        />
        <AtInput
          type="number"
          placeholder="签到人数"
          value={form.number}
          onChange={(e) => setForm({ ...form, number: e })}
        />
        <Picker mode="time" onChange={(e) => onTimeChange(e)}>
          <AtList>
            <AtListItem title="截止时间" extraText={form.endtime} />
          </AtList>
        </Picker>
        <AtSwitch title="公开参与人" checked={form.open} onChange={(e) => setForm({ ...form, open: e })} border />
        <AtSwitch title="允许补签" checked={form.save} onChange={(e) => setForm({ ...form, save: e })} border />
        <View className="form-btn">
          <AtButton className="form-sub" onClick={(e) => onReset(e)} >重置</AtButton>
          <AtMessage />
          <AtButton className="form-sub" type="primary" onClick={(e) => onConfirm(e)} >发布</AtButton>
        </View>
      </AtForm>

      {/* <AtModal
        isOpened={show}
        cancelText="取消"
        confirmText="确认"
        onConfirm={(e) => handleConfirm(e)}
        onCancel={e => setShow(!show)}
        content="请仔细检查，确认发布？"
      /> */}
      <AtModal isOpened={show}>
        <AtModalContent>请仔细检查，确认发布？</AtModalContent>
        <AtModalAction>
          <Button onClick={e => setShow(!show)}>取消</Button>
          <Button type="primary" openType="share">确定</Button>
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
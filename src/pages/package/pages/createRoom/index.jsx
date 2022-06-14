import { useState } from "react"
import { AtInput, AtButton } from "taro-ui"
import { randomString } from '@/utils/index';
import { getRoomListAsync } from '@/store/action'
import { connect } from "react-redux";
import api from "@/servers/api";
import Taro from "@tarojs/taro";
const roomid = randomString(16);
const CreateRoomIn = ({getRoomListAsync}) => {
  const [roomInfo, setRoomInfo] = useState({
    name: '',
    address: '',
    mixNum: null,
  })
  const inputHandle = (e, type) => {
    console.log(e);
    setRoomInfo({ ...roomInfo, [type]: e })
  }
  const submit = () => {
    if (roomInfo.name == '') {
      Taro.showToast({
        title: '会议室名称不为空',
        icon: 'error',
        duration: 1000
      })
    } else {
      api
      .post('/bookroom/addroom', {
        ...roomInfo,
        roomid: roomid
      })
      .then(res => {
        const { data } = res
        console.log(data);
        if (data.code == 200) {
          getRoomListAsync()
          Taro.showToast({
            title: '提交成功！',
            icon: 'success',
            duration: 1500
          })
        }
      })
    }
  }
  return (
    <>
      <AtInput
        placeholder="会议室名称"
        value={roomInfo.name}
        maxLength='32'
        onChange={(e) => inputHandle(e, 'name')}
      />
      <AtInput
        placeholder="会议室地址"
        value={roomInfo.address}
        onChange={(e) => inputHandle(e, 'address')}
      />
      <AtInput
        type="number"
        placeholder="容纳人数"
        value={roomInfo.mixNum}
        onChange={(e) => inputHandle(e, 'mixNum')}
      />
      <AtButton type='primary' onClick={() => submit()}>提交</AtButton>
      <AtButton type='secondary' onClick={() => Taro.navigateBack({ delta: 1 })}>返回</AtButton>
    </>
  )
}
const CreateRoom = connect((state)=>{
  return {}
}, {
  getRoomListAsync: getRoomListAsync,
})(CreateRoomIn)
export default CreateRoom
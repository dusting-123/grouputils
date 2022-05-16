import api from "@/servers/api";
import { getCreaterInfoAsync, getSignInfoAsync, getUserSignListAsync } from "@/store/action";
import { parseParam } from "@/utils";
import { formatTimeStampToTime } from '@/utils/common';
import { Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { AtAvatar, AtButton, AtForm, AtToast } from "taro-ui";


const SignDetailIn = (props) => {
  const {
    tid,
    forwardedRef,
    signInfo,
    createrInfo,
    userSignList,
    getSignInfoAsync,
    getCreaterInfoAsync,
    getUserSignListAsync
  } = props
  const [sign, setSign] = useState(false)
  const params = parseParam(tid)
  useEffect(() => {
    console.log(params);
    //获取签到信息
    getSignInfoAsync(params)
    //获取creater信息信息
    getCreaterInfoAsync(params)
    getUserSignListAsync(params)
  }, [])
  const clickHandle = () => {
    api
      .get('sign/update', { signid: signInfo.signid, people: signInfo.people++ })
    setSign(!sign)
  }
  return (
    <View>
      <View>
        <View>{signInfo.title}</View>
        <View>
          <AtAvatar circle image={createrInfo.avatarUrl} />
          <Text>{createrInfo.nickName}</Text>
        </View>
      </View>
      <View>
        <View>{'截止时间:' + signInfo.endtime}</View>
        <View>{'地点：' + signInfo.address}</View>
        <View>{'备注'}</View>

      </View>
      <View>
        <Text>{formatTimeStampToTime(Date.now())}</Text>
        <View>
          <AtButton type="primary" circle disabled={sign} onClick={() => clickHandle()}>{sign ? '已完成' : '签到'}</AtButton>
        </View>
      </View>

      <View>
        <View>{"已签到：" + signInfo.people + "人"}</View>
        {
          userSignList.asignList && userSignList.asignList
            .filter(item => item.signStatus == 1)
            .map((itm, index) => {
              const {auserSignList} = userSignList
              return (
                <View>
                  <AtAvatar className="avatar" size="small" circle image={auserSignList[index]?.avatarUrl || '#'}></AtAvatar>
                  <View className="user-name">{auserSignList[index]?.nickName || ''}</View>
                  <View>{itm.createdAt}</View>
                </View>
              )
            })
            }
      </View>
      <AtToast status="success" duration={800} text="签到成功！" icon="{icon}"></AtToast>
    </View>
  )
}

const SignDetail = connect((state) => {//mapStateToProps
  //state为当前redux 执行getState()后获得的对象
  console.log(state);
  return {
    signInfo: state?.signInfo,
    createrInfo: state?.createrInfo,
    userSignList: state?.userSignList
  }
},
  // handleclick: (list) => dispatch(showEnActin(list))
  {
    getSignInfoAsync: getSignInfoAsync,
    getCreaterInfoAsync: getCreaterInfoAsync,
    getUserSignListAsync: getUserSignListAsync
  }

)(SignDetailIn)
export default SignDetail
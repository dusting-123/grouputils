import XUT from '@/assets/imgs/user/school.gif';
import { getPreInfoAsync } from '@/store/action';
import { Image, Text, View } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import { useEffect } from "react";
import { connect } from "react-redux";
import { AtButton, AtInput } from 'taro-ui';
import './index.less';
import Taro,{useShareAppMessage} from '@tarojs/taro';
const bookDetailIn = (props) => {
  const { preinfo, getPreInfoAsync } = props
  const params = useRouter().params
  useEffect(() => {
    getPreInfoAsync(params)
    // console.log(11111,roomid, phoneNum);
  }, [])
  useShareAppMessage(res => {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '分享到群',
      path: `/pages/package/pages/bookDetail/index?roomid=${params.roomid}&phoneNum=${params.phoneNum}`,
    }
  })
  return (
    <View>
      <AtInput
        disabled
        name='value'
        title='会议室'
        type='text'
        value={preinfo.name}
      />
      <AtInput
        disabled
        name='value'
        title='地址'
        type='text'
        value={preinfo.address}
      />
      {preinfo?.userData && preinfo?.userData.map((item, index) => {
        return (
          <>
            <AtInput
              disabled
              name='value'
              title='预约人'
              type='text'
              value={preinfo.userData[0].userName}
            />
            <AtInput
              disabled
              name='value'
              title='电话'
              type='text'
              value={preinfo.userData[0].phoneNum}
            />
            <AtInput
              disabled
              name='value'
              title='日期'
              type='text'
              value={preinfo.userData[0].data}
            />
            <AtInput
              disabled
              name='value'
              title='时间'
              type='text'
              value={`${preinfo.userData[0].begin}-${preinfo.userData[0].endtime}`}
            />
          </>
        )
      }
      )}
      <AtButton openType='share'>分享</AtButton>
    </View>
  )
}
const bookDetail = connect((state) => {//mapStateToProps
  console.log(342423, state?.preinfo);
  return {
    preinfo: state?.preinfo
  }
}, {
  getPreInfoAsync: getPreInfoAsync,
})(bookDetailIn)
export default bookDetail
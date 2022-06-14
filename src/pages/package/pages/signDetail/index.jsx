import api from "@/servers/api";
import { getCreaterInfoAsync, getSignInfoAsync, getSignRecordAsync, getUserSignListAsync } from "@/store/action";
import { formatTimeStampToTime } from '@/utils/common';
import { Text, View } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { AtAvatar, AtButton, AtToast } from "taro-ui";
import './index.less';

const SignDetailIn = (props) => {
  const {
    signInfo,
    createrInfo,
    userSignList,
    signRecord,
    getSignInfoAsync,
    getCreaterInfoAsync,
    getUserSignListAsync,
    getSignRecordAsync
  } = props
  const [okWord, setOkWord] = useState('签到')
  // const [signInfo, setSignInfo] = useState({})

  const params = useRouter().params
  const openid = Taro.getStorageSync('openid')
  useEffect(() => {
    const fetchData = async () => {
      // 获取签到表信息
      await getSignInfoAsync(params)
      // 获取creater信息信息
      await getCreaterInfoAsync(params)
      await getUserSignListAsync(params)
      //获取当前用户签到情况
      const info = {
        openid,
        signid: params.id
      }
      await getSignRecordAsync(info)
      // api.get('/signlist/record', { ...info }).then(res => {
      //   if (res.statusCode == 200) {
      //     const { data } = res.data
      //     signStatus = data?.statusCode
      //   }
      // })
    }
    fetchData()
    console.log(9999999);
  }, [])

  const signClick = async (signInfo, status) => {
    await getSignInfoAsync(params)
    const date = new Date()
    const nowDate = Date.parse(formatTimeStampToTime(date.getTime()))
    const endDate = Date.parse(signInfo.date)
    const endTime = signInfo.endtime.split(":");
    if (status?.signStatus == 1) {
      Taro.showToast({
        title: '您已经签到过啦！',
        icon: 'none',
        duration: 1000
      })
      setOkWord('已签到')
    } else {
      let [h = 0, m = 0] = endTime || []
      if (nowDate > endDate) {
        console.log(nowDate > endDate);
        Taro.showToast({
          title: '签到结束啦！',
          icon: 'none',
          duration: 1000
        })
        api.get('/sign/update', { ...signInfo, status: 1 })//更新签到表
        setOkWord('已结束')
      } else if ((nowDate == endDate) && (date.setHours(date.getHours(), date.getMinutes()) > date.setHours(h, m))) { 
        Taro.showToast({
          title: '签到结束啦！',
          icon: 'none',
          duration: 1000
        })
        api.get('/sign/update', { ...signInfo, status: 1 })//更新签到表
        setOkWord('已结束')
      }else {
        console.log(date.setHours(date.getHours(), date.getMinutes()) > date.setHours(h, m));

        api.get('/sign/update', { ...signInfo, people: signInfo.people + 1 })//更新签到表
        api.get('/signlist/update', {
          signid: signInfo.signid,
          openid: Taro.getStorageSync('openid'),
          signStatus: 1
        }).then(res => {
          if (res.statusCode == 200) {
            setOkWord('已签到')
            Taro.showToast({
              title: '签到成功！',
              icon: 'success',
              duration: 1000
            })
          }
        })
      }
    }
  }

  //判断状态
  const btnShow = () => {
    const date = new Date()
    const nowDate = Date.parse(formatTimeStampToTime(date.getTime()))
    const endDate = Date.parse(signInfo.date)
    console.log(nowDate, endDate);
    let endTime = signInfo.endtime
    endTime && (endTime = endTime.split(":"));
    if (signStatus == 1) {
      setOkWord('已签到')
    } else {
      if (nowDate > endDate) {
        // api //更新签到表
        //   .get('/sign/update', { ...signInfo, status: 1 })
        setOkWord('已结束')
      } else if (nowDate == endDate) {
        let [h = 0, m = 0] = endTime || []
        if (date.setHours(date.getHours(), date.getMinutes()) > date.setHours(h, m)) {
          // api //更新签到表
          //   .get('/sign/update', { ...signInfo, status: 1 })
          setOkWord('已结束')
        }
      }
    }
  }
  return (
    <View>
      <View className="header">
        <View className="head-title">{signInfo.title}</View>
        <View className="head-avar">
          <AtAvatar className="head-image" circle image={createrInfo.avatarUrl} />
          <Text>{createrInfo.nickName}</Text>
        </View>
      </View>
      <View className="aside">
        <View>{'截止: ' + signInfo.date + ' ' + signInfo.endtime}</View>
        <View>{'地点：' + signInfo.address}</View>
        <View>{'备注: ' + signInfo.description}</View>
      </View>
      <View className="content">
        <Text className="text">{formatTimeStampToTime(Date.now())}</Text>
        <AtButton
          className="sign-btn"
          type="primary"
          circle
          disabled={okWord != "签到"}
          onClick={() => signClick(signInfo, signRecord)}>{okWord}
          {/* {
            
            signStatus == 1 ? "已签到": (
              Date.parse(formatTimeStampToTime(Date.now())) > Date.parse(signInfo.date) ? "已结束" :(
                Date.parse(formatTimeStampToTime(Date.now())) == Date.parse(signInfo.date) ? date.setHours(date.getHours(), date.getMinutes()) > date.setHours(h, m)
              )
            )
          } */}
        </AtButton>
        <View>{"已签到：" + signInfo.people + "人"}</View>
        {/* <button>{}</button> */}
      </View>

      <View className="footer">
        {
          userSignList.asignList && userSignList.asignList
            .filter(item => item.signStatus == 1)
            .map((itm, index) => {
              const { auserSignList } = userSignList
              return (
                <View className="sign-list">
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
    userSignList: state?.userSignList,
    signRecord: state?.signRecord
  }
},
  // handleclick: (list) => dispatch(showEnActin(list))
  {
    getSignInfoAsync: getSignInfoAsync,
    getCreaterInfoAsync: getCreaterInfoAsync,
    getUserSignListAsync: getUserSignListAsync,
    getSignRecordAsync: getSignRecordAsync
  }

)(SignDetailIn)
export default SignDetail
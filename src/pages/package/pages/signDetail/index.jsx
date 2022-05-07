import { Text, View } from "@tarojs/components"
import { useEffect, useState } from "react"
import { AtAvatar, AtButton } from "taro-ui"

const SignDetail = (props) => {
  const [sign, setSign] = useState(false)
  useEffect(()=> {
    console.log(props);
  })
  const userInfo = {
    avatar: `https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83ep0f8lZWNMdph6ZGMgLfIPhVZxlq2edo5pdlLzMSNMT45JpBeLF2ecx2zSviacAmib4WgtN0oUITKww/132`,
    nickName: 'an'//f8lZWNMdph6ZGMgLfIPhVZxlq2edo5pdlLzMSNMT45JpBeLF2ecx2zSviacAmib4WgtN0oUITKww%2F132
  }
  return (
    <>
      <View>
        <View>
          <View>{'biaoti'}</View>
          <View>
            <AtAvatar circle image={userInfo.avatar}/>
            <Text>{userInfo.nickName}</Text>
          </View>
        </View>

        <View>
          <View>{'截止时间'}</View>
          <View>{'备注'}</View>
          <View>{'公开'}</View>
        </View>
        <View>
          <Text>{"日期"}</Text>
          <View>
            <AtButton type="primary" circle disabled={sign} onClick={()=>setSign(true)}>{sign ? '已完成' : '签到'}</AtButton>
          </View>
        </View>

        <View>
          <View>{"今日已签到： 0人"}</View>
          <Form>
            
          </Form>
        </View>
      </View>
    </>
  )
}

export default SignDetail
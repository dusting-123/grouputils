import { View, Image, Text } from "@tarojs/components"
import { AtForm, AtButton, AtTextarea } from "taro-ui"
import { useState } from "react"
import Taro from "@tarojs/taro"
import hihihi1 from "@/assets/imgs/user/heiheihei1.png"
import hihihi from "@/assets/imgs/user/heiheihei.png"
import './index.less'
const suggest = () => {
  const [text, setText] = useState('')
  const onChange = (e) => {
    setText(e)
  }
  const submit = () => {
    if (text == '') {
      Taro.showToast({
        title: '请输入内容！',
        icon: 'error',
        duration: 1000
      })
    } else {
      Taro.showToast({
        title: '提交成功！',
        icon: 'success',
        duration: 1000
      })
    }
  }
  return (
    <>
      <View className='heiheihei1'>
        <Image className="img" src={hihihi1} />
      </View>
      <AtForm className="conts">
        <AtTextarea
        className="textarea"
          value={text}
          onChange={(e) => onChange(e)}
          maxLength={150}
          height={300}
          placeholder='大佬请发挥...'
        />
        <AtButton type="secondary" onClick={() => submit()}>提交</AtButton>
      </AtForm>
      <View className='heiheihei'>
        <Image className="img" src={hihihi} />
      </View>
    </>
  )
}

export default suggest
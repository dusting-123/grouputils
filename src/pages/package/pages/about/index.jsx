import { View, Text, Image } from "@tarojs/components"
import './index.less'
import XUT from '@/assets/imgs/user/school.gif'
const about = (props) => {

  return (
    <View>
      <View className="tubiao">
        <Image className="png" src={XUT} />
      </View>
      <View className="statement">
        <Text>  「群助手」由 CoderZheng 个人开发，难免有未完善之处，希望为理工大所有师生在工作、课堂或其他生活特定场景提供一个小工具，期待您的使用！😘</Text>
      </View>
      <View className="contact">
        <Text>联系方式：zheng11564@163.com</Text>
      </View>
    </View>
  )
}

export default about
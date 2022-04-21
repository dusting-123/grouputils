import { Image, Text, View } from "@tarojs/components";
import { AtAvatar } from "taro-ui";

export default function PartList() {

  return (
    <View>
      <View>
        <View>
          <Text>aaa</Text>
          <Text>截止时间</Text>
        </View>
        <View>
          <Image src="#" />
        </View>
      </View>
      <View>
        <View>
          <AtAvatar />
          <Text></Text>
        </View>
        <View>签到：{} 人</View>
      </View>
    </View>
  )
}
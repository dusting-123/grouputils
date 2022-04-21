import React, { useEffect } from 'react'
import Taro from '@tarojs/taro'
// Taro 额外添加的 hooks 要从 '@tarojs/taro' 中引入
import { useDidShow, useDidHide } from '@tarojs/taro'

// 假设我们要使用 Redux
import { Provider } from 'react-redux'
import configStore from './store/index'

// 全局样式
import 'taro-ui/dist/style/index.scss' //全局引入一次即可
import './app.less'

const store = configStore()

function App (props) {
  // 可以使用所有的 React Hooks
  useEffect(() => {
    Taro.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          Taro.request({
            url: 'http://localhost:3456/login',
            data: {
              code: res.code
            },
            success: res => {
              const { data } = res
              console.log(data);
              Taro.setStorageSync({key: 'openid', data: data?.openid})
              Taro.setStorageSync({key: 'session_key', data: data?.session_key})

            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  })

  // 对应 onShow
  useDidShow(() => {})

  // 对应 onHide
  useDidHide(() => {})

  return (
    // 在入口组件不会渲染任何内容，但我们可以在这里做类似于状态管理的事情
    <Provider store={store}>
      {/* props.children 是将要被渲染的页面 */}
      {props.children}
    </Provider>
  )
}

export default App
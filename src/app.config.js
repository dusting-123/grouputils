export default {
  pages: [
    'pages/home/index',
    'pages/part/index',
    'pages/user/index',
    'pages/home/sign/index',
    'pages/home/vote/index',
    'pages/home/draw/index',
    'pages/home/schedule/index'
  ],
  tabBar: {
    list: [{
      'iconPath': '',
      'selectedIconPath': '',
      pagePath: 'pages/home/index',
      text: '首页'
    }, {
      'iconPath': '',
      'selectedIconPath': '',
      pagePath: 'pages/part/index',
      text: ' 参与'
    }, {
      'iconPath': '',
      'selectedIconPath': '',
      pagePath: 'pages/user/index',
      text: '个人'
    }],
    'color': '#000',
    'selectedColor': '#56abe4',
    'backgroundColor': '#fff',
    'borderStyle': 'white'
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  "subpackages": [
    {
      "root": "pages/package",
      "pages": [
        "pages/signDetail/index",
        "pages/voteDetail/index",
      ]
    }
  ]
}

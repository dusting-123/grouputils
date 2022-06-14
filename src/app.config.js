export default {
  pages: [
    'pages/home/index',
    'pages/part/index',
    'pages/user/index',
    'pages/home/sign/index',
    'pages/home/vote/index',
    'pages/home/bookroom/index',
    'pages/home/schedule/index'
  ],
  tabBar: {
    list: [{
      'iconPath': 'assets/imgs/tabbar/home.png',
      'selectedIconPath': 'assets/imgs/tabbar/home-active.png',
      pagePath: 'pages/home/index',
      text: '首页'
    }, {
      'iconPath': 'assets/imgs/tabbar/part.png',
      'selectedIconPath': 'assets/imgs/tabbar/part-active.png',
      pagePath: 'pages/part/index',
      text: ' 参与'
    }, {
      'iconPath': 'assets/imgs/tabbar/user.png',
      'selectedIconPath': 'assets/imgs/tabbar/user-active.png',
      pagePath: 'pages/user/index',
      text: '个人'
    }],
    'color': '#000',
    'selectedColor': '#1296db',
    'backgroundColor': '#fff',
    'borderStyle': 'black'
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
        "pages/createRoom/index",
        "pages/roomAddUser/index",
        "pages/bookDetail/index",
        "pages/about/index",
        "pages/suggest/index",
        "pages/myInfo/index",
      ]
    }
  ]
}

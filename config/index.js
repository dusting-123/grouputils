import path from 'path'
const config = {
  projectName: 'grouputil',
  date: '2022-4-20',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: [
    '@tarojs/plugin-html',
    // 引入 npm 安装的插件
    '@tarojs/plugin-mock', 
    // 引入 npm 安装的插件，并传入插件参数
    ['@tarojs/plugin-mock', {
      mocks: {
        // '/api/user/1': {
        //   name: 'judy',
        //   desc: 'Mental guy'
        // }
      }
    }],
    // ['@tarojs/plugin-inject', {
    //   components: {
    //     // View: {
    //     //   'data-index': "'dataIndex'"
    //     // },
    //     Image: {
    //       'unique': "'hello'",
    //     }
    //   }
    // }]
  ],
  defineConstants: {
  },
  alias: {
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/package': path.resolve(__dirname, '..', 'package.json'),
    '@/project': path.resolve(__dirname, '..', 'project.config.json'),
    '@/store': path.resolve(__dirname, '..', 'src/store'),
    '@/servers': path.resolve(__dirname, '..', 'src/servers'),
    '@/assets': path.resolve(__dirname, '..', 'src/assets'),
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}

const { defineConfig } = require('@vue/cli-service')
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = defineConfig({
  configureWebpack:{
    // plugins: [new NodePolyfillPlugin()],
    optimization: {
      splitChunks: {
        chunks: "all",
      }
    },
    //target: 'node',
    externals:{
      //crypto: 'crypto'
    }
  },
  devServer:{
    port:9000,
    client: {
      progress: true,
    },
  },
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions:{  
    electronBuilder:{
      builderOptions:{
        "productName": "Composer of ST",
        "appId": "st-composer",
        "win" : {
          "target": [
            "nsis"
          ],
          "icon" : "./public/icons/icon-stc.ico"
        },
        "nsis":{
          "oneClick": false,
          "installerIcon": "./public/icons/icon-stc.ico",
          "uninstallerIcon": "./public/icons/icon-stc.ico",
          "license": "license.md",
          "allowToChangeInstallationDirectory": true,
          "multiLanguageInstaller": true,
          "runAfterFinish": false,
          "unicode": true
        },
        "mac" : {
          "icon" : "./public/icons/icon-stc.ico"
        }
      },
      externals: [],
      nodeIntegration: true
    }
  },
})

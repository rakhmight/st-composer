const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
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
      }
    }
  },
})

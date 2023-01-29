const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions:{
    electronBuilder:{
      builderOptions:{
        "productName": "Composer of Smart Testing (beta)",
        "win" : {
          "icon" : "./public/icons/icon-stc.ico"
        },
        "mac" : {
          "icon" : "./public/icons/icon-stc.ico"
        }
      }
    }
  },
})

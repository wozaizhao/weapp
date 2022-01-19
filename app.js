// app.js
import { wxLogin, code2Session } from './api/wechat';
App({
  async onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    try {
      const { code } = await wxLogin();
      const { code: resCode, data } = await code2Session({ code });
      if (resCode === 200) {
        this.globalData.openID = data.openid;
      }
    } catch (e) {
      console.log('onLaunch catch error: ', e);
    }
  },
  globalData: {
    userInfo: null,
    openID: null,
    // sessionKey: null,
  },
});

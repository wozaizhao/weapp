// app.js
import { code2Session } from './api/wechat';
App({
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: (loginRes) => {
        console.log(loginRes);
        code2Session({ code: loginRes.code }).then((sessionRes) => {
          console.log(sessionRes);
          if (sessionRes.errcode === 0) {
            console.log(sessionRes.openid);
            console.log(sessionRes.session_key);
            this.globalData.sessionKey = sessionRes.session_key;
            //   const session_key = sessionRes.session_key;
            //   wx.getUserInfo({
            //     success: function(userInfores) {
            //       console.log('userInfores', userInfores)
            //       decryptUserInfo({
            //         sessionKey: session_key,
            //         encryptedData: userInfores.encryptedData,
            //         iv:userInfores.iv
            //       }).then(res => {
            //         console.log(res)
            //       })
            //     }
            //   })
          }
        });
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    });
  },
  globalData: {
    userInfo: null,
    sessionKey: null,
  },
});

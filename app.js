// app.js
import { wxLogin, code2Session } from './api/wechat';
import { shortcutLogin } from './api/user';
App({
  async onLaunch() {
    try {
      const { code } = await wxLogin();
      const { code: resCode, data } = await code2Session({ code });
      if (resCode === 200) {
        this.globalData.openID = data.openid;
        await shortcutLogin({ openID: data.openid });
      }
    } catch (e) {
      console.log('onLaunch catch error: ', e);
    }
  },
  globalData: {
    userInfo: null,
    openID: null,
  },
});

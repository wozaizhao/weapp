// app.js
import { wxLogin, code2Session } from './api/wechat';
import { shortcutLogin } from './api/user';
import store from './store/index.js';
App({
  async onLaunch() {
    try {
      const systemInfo = wx.getSystemInfoSync();
      // this.globalData.theme = systemInfo.theme;
      let { theme } = this.store.getState();
      theme = systemInfo.theme;
      this.store.setState({
        theme,
      });
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
  onThemeChange(e) {
    let { theme } = this.store.getState();
    theme = e.theme;
    this.store.setState({
      theme,
    });
  },
  globalData: {
    userInfo: null,
    openID: null,
  },
  store: store,
});

// pages/webview/index.js
import { openID, requestCurrentUser } from '../../api/user';
import config from '../../config/config';
import { clientToken } from '../../api/jwt';
Page({
  /**
   * Page initial data
   */
  data: {
    webUrl: '',
    openID: '',
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const { url } = options;
    this.setData({
      openID: openID(),
      webUrl: url ? decodeURIComponent(url) : config.webUrl,
    });
  },
  onMessage(e) {
    console.log('onMessage', e);
    clientToken({ action: 'set', token: e.detail.data[0].token });
    requestCurrentUser().then((user) => {
      console.log('user', user);
    });
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {},

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {},

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {},

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {},

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {},

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {},

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {},
});

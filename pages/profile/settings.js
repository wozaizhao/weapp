// pages/profile/settings.js
const app = getApp();

Page({
  useStore: true,
  /**
   * Page initial data
   */
  data: {
    checked: false,
  },

  onChange(e) {
    // console.log(e);
    this.setData({
      checked: e.detail,
    });
    app.store.setState({
      theme: e.detail ? 'dark' : 'light',
    });
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(options);
    let { theme } = app.store.getState();
    this.setData({
      checked: theme === 'dark',
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

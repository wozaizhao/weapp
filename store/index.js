import Store from '../plugins/wxministore/index.js';
export default new Store({
  state: {
    theme: 'light', // 系统主题色 dark | light
  },
  methods: {
    goAnyWhere(e) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url,
      });
    },
  },
  pageListener: {
    onLoad(options) {
      console.log('onLoad' + this.route, '参数为', options);
    },
    onHide() {
      console.log('onHide');
    },
    onShareAppMessage(res) {
      console.log('onShareAppMessage', res);
      return {
        title: '全局分享',
        path: '/index/index?id=123',
      };
    },
  },
  // 开启了局部模式
  openPart: true,
});

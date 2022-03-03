import Store from '../plugins/wxministore/index.js';
import { wxNavigateTo, wxRedirectTo } from '../api/wechat';
export default new Store({
  state: {
    theme: 'light', // 系统主题色 dark | light
    darkStyles: `
      --button-default-color: #f2f3f5;
      --cell-background-color: #1c1c1c;
      --cell-text-color: #fff;
      --field-input-text-color: #fff;
    `,
  },
  methods: {
    goToPage(e) {
      const { url, replace } = e.currentTarget.dataset;
      if (replace) {
        wxRedirectTo({ url });
      } else {
        wxNavigateTo({ url });
      }
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

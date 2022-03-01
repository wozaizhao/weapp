// components/tabbar/index.js
// const app = getApp();
import { wxNavigateTo } from '../../api/wechat';

const pages = {
  home: '/pages/index/index',
  me: '/pages/me/index',
  apps: '/pages/webview/index',
};

const darkStyles = `
  --tabbar-background-color: #1c1c1c;
`;

Component({
  useStore: true,
  /**
   * Component properties
   */
  properties: {
    active: String,
  },

  /**
   * Component initial data
   */
  data: {
    styles: '',
    darkStyles: darkStyles,
  },
  lifetimes: {
    attached: function () {},
    detached: function () {
      console.log('detached');
      // 在组件实例被从页面节点树移除时执行
    },
  },
  // onLoad() {
  //   getApp().watchTheme((theme) => {
  //     console.log('theme changed: ', theme);
  //   });
  // },

  /**
   * Component methods
   */
  methods: {
    onChange(e) {
      if (e.detail !== this.data.active) {
        const url = pages[e.detail] || pages['home'];
        wxNavigateTo({ url });
      }
    },
  },
});

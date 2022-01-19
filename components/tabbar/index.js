// components/tabbar/index.js
import { wxRedirectTo } from '../../api/wechat';

const pages = {
  home: '/pages/index/index',
  me: '/pages/me/index',
};

Component({
  /**
   * Component properties
   */
  properties: {
    active: String,
  },

  /**
   * Component initial data
   */
  data: {},

  /**
   * Component methods
   */
  methods: {
    onChange(e) {
      if (e.detail !== this.data.active) {
        const url = pages[e.detail] || pages['home'];
        wxRedirectTo({ url });
      }
    },
  },
});

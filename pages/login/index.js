// pages/login/index.js
const computedBehavior = require('miniprogram-computed').behavior;
import { requestCaptcha, login, openID } from '../../api/user';
import { wxNavigateTo, wxRedirectTo, wxNavigateBack } from '../../api/wechat';
const darkStyles = `
  --cell-background-color: transparent;
  --cell-text-color: #fff;
  --field-input-text-color: #fff;
`;
const privacyWebUrl = 'https://img.wozaizhao.com/policy/1.0/privacy_policy.html?20020302';
const serviceWebUrl = 'https://img.wozaizhao.com/policy/1.0/terms_of_service.html?20020302';
Page({
  useStore: true,
  behaviors: [computedBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    countDown: 0,
    timing: false,
    submitReady: false,
    submiting: false,
    phone: '',
    code: '',
    sent: false,
    darkStyles: darkStyles,
    serviceUrl: `/pages/webview/index?url=${encodeURIComponent(serviceWebUrl)}`,
    privacyUrl: `/pages/webview/index?url=${encodeURIComponent(privacyWebUrl)}`,
  },

  computed: {
    sendReady(data) {
      return /^1[3-9]\d{9}$/.test(data.phone) && !data.timing;
    },
    captchaText(data) {
      return data.timing ? `${data.countDown} 秒后获取` : '获取验证码';
    },
    submitReady(data) {
      return data.code && data.sent;
    },
  },
  onPhoneClear() {
    this.setData({
      phone: '',
    });
  },
  onGetCaptcha() {
    const TencentCaptcha = this.selectComponent('#captcha');
    const captcha = new TencentCaptcha(async (res) => {
      try {
        const { status } = await requestCaptcha({
          phone: this.data.phone,
          openID: openID(),
          ticket: res.ticket,
          randstr: res.randstr,
        });
        if (status === 'success') {
          this.setData({
            sent: true,
          });
          this.startCountDown();
        }
      } catch (e) {
        console.log('requestCaptcha catch error: ', e);
      }
    });

    captcha.show();
  },
  startCountDown() {
    this.setData({
      countDown: 60,
      timing: true,
    });
    this.tid = setInterval(() => {
      this.setData({
        countDown: this.data.countDown - 1,
      });
      if (this.data.countDown < 1) {
        clearInterval(this.tid);
        this.setData({
          timing: false,
        });
      }
    }, 1000);
  },
  async submit() {
    try {
      this.setData({
        submiting: true,
      });
      const { status } = await login({
        phone: this.data.phone,
        code: this.data.code,
        openID: openID(),
      });
      this.setData({
        submiting: false,
      });
      if (status === 'success') {
        if (this.method === 'back') {
          await wxNavigateBack();
        } else if (this.method === 'redirect') {
          await wxNavigateTo({ url: this.url });
        } else {
          await wxRedirectTo({ url: '/pages/index/index' });
        }
      }
    } catch (e) {
      console.log('submit login catch error: ' + e);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { method, url } = options;
    this.method = method;
    this.url = url;
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.tid);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});

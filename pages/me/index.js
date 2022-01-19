// pages/me/index.js
import { activeUser, isLoggedIn } from '../../api/user';
import { wxNavigateTo } from '../../api/wechat';
import config from '../../config/config';
import { imgURL } from '../../utils/util';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLoggedIn: false,
    activeUser: null,
    config: config,
  },
  toLogin() {
    wxNavigateTo({ url: '/pages/login/index?method=back' })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isLoggedIn: isLoggedIn(),
      activeUser: activeUser(),
    })
  },
  imgURL(key) {
    return imgURL(key)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      isLoggedIn: isLoggedIn(),
      activeUser: activeUser(),
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

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

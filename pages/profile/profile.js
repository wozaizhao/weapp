// pages/profile/profile.js
import { activeUser, updateUserInfo, requestCurrentUser } from '../../api/user';
import { wxGetUserProfile } from '../../api/wechat';
import config from '../../config/config';

Page({
  useStore: true,
  /**
   * 页面的初始数据
   */
  data: {
    activeUser: null,
    config: config,
    canIUseGetUserProfile: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      activeUser: activeUser(),
    });
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      });
    }
  },
  async getUserProfile() {
    try {
      const { userInfo } = await wxGetUserProfile({ desc: '设置个人信息' });
      this.setAvatarNickname(userInfo.avatarUrl, userInfo.nickName);
    } catch (e) {
      console.log(e);
    }
  },
  getUserInfo(e) {
    const { userInfo } = e.detail;
    this.setAvatarNickname(userInfo.avatarUrl, userInfo.nickName);
  },
  async setAvatarNickname(avatar, nickname) {
    try {
      await updateUserInfo({
        avatarUrl: avatar,
        nickname,
      });
      await requestCurrentUser();
      this.setData({
        activeUser: activeUser(),
      });
    } catch (e) {
      console.log(e);
    }
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
      activeUser: activeUser(),
    });
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

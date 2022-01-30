// pages/profile/update.js
import { activeUser, updateUserInfo, requestCurrentUser } from '../../api/user';
import { wxSetNavigationBarTitle } from '../../api/wechat';
import { delayGoBack } from '../../utils/util';
import config from '../../config/config';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const methods = {
  phone: '手机号',
  nickname: '昵称',
  gender: '性别',
  bio: '简介',
};
// const columns = ['男', '女'];

Page({
  /**
   * 页面的初始数据
   */
  data: {
    method: '',
    phone: '',
    nickname: '',
    gender: 0,
    bio: '',
    radioColor: config.primaryColor,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { method } = options;
    this.setData({
      method,
    });
    wxSetNavigationBarTitle({ title: `修改${methods[method]}` });
    const user = activeUser();
    this.setData({
      phone: user.phone,
      nickname: user.nickname,
      gender: '' + user.gender,
      bio: user.bio,
    });
  },
  onChangeGender(e) {
    // console.log(e.target.dataset.name);
    this.setData({
      gender: e.target.dataset.name,
    });
  },
  async save() {
    let params = {};
    let message = '';
    switch (this.data.method) {
      case 'phone':
        params = { phone: this.data.phone };
        message = this.data.phone ? '' : '请输入手机号';
        break;
      case 'nickname':
        params = { nickname: this.data.nickname };
        message = this.data.nickname ? '' : '请输入昵称';
        break;
      case 'gender':
        params = { gender: parseInt(this.data.gender) };
        message = this.data.gender ? '' : '请选择性别';
        break;
      case 'bio':
        params = { bio: this.data.bio };
        message = this.data.bio ? '' : '请输入简介';
        break;
      default:
        break;
    }
    if (message) {
      Toast(message);
      return;
    }
    const { status, data } = await updateUserInfo(params);
    if (status === 'success' && data) {
      await requestCurrentUser();
      delayGoBack();
    }
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

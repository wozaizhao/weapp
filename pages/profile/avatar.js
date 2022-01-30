import WeCropper from '../../plugins/we-cropper/we-cropper.js';
import config from '../../config/config.js';
import { upload } from '../../api/request';
import { updateUserInfo, requestCurrentUser } from '../../api/user';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

const device = wx.getSystemInfoSync();
const width = device.windowWidth;
const height = device.windowHeight - 100;

Page({
  data: {
    avatar: '',
    config: config,
    mode: 'preview',
    cropperOpt: {
      id: 'cropper',
      targetId: 'targetCropper',
      pixelRatio: device.pixelRatio,
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 300) / 2,
        y: (height - 300) / 2,
        width: 300,
        height: 300,
      },
      boundStyle: {
        color: config.primaryColor,
        mask: '#f8f8f8',
        lineWidth: 1,
      },
    },
  },
  touchStart(e) {
    this.cropper.touchStart(e);
  },
  touchMove(e) {
    this.cropper.touchMove(e);
  },
  touchEnd(e) {
    this.cropper.touchEnd(e);
  },
  getCropperImage() {
    this.cropper
      .getCropperImage()
      .then(async (src) => {
        Toast.loading({
          message: '上传中...',
          forbidClick: true,
        });
        const { status: uploadStatus, data: uploadData } = await upload(src);
        if (uploadStatus === 'success') {
          const { status, data } = await updateUserInfo({ avatarUrl: uploadData.key });
          if (status === 'success' && data) {
            // saveSuccess();
            await requestCurrentUser();
            this.setData({
              mode: 'preview',
              avatar: uploadData.key,
            });
          } else {
            // saveFail();
          }
        } else {
          // saveFail();
        }
        // wx.previewImage({
        //   current: '', // 当前显示图片的http链接
        //   urls: [src], // 需要预览的图片http链接列表
        // });
      })
      .catch((err) => {
        wx.showModal({
          title: '温馨提示',
          content: err.message,
        });
      });
  },
  uploadTap() {
    const self = this;

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0];
        //  获取裁剪图片资源后，给data添加src属性及其值
        self.setData({
          mode: 'editing',
        });
        self.cropper.pushOrign(src);
      },
    });
  },
  onLoad(option) {
    if (option.avatar) {
      this.setData({
        avatar: option.avatar,
      });
    }
    const { cropperOpt } = this.data;

    cropperOpt.boundStyle.color = config.primaryColor;

    this.setData({ cropperOpt });

    this.cropper = new WeCropper(cropperOpt)
      .on('ready', (ctx) => {
        console.log(`wecropper is ready for work!`);
      })
      .on('beforeImageLoad', (ctx) => {
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000,
        });
      })
      .on('imageLoad', (ctx) => {
        wx.hideToast();
      });
  },
});

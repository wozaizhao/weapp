import { config } from '../config/config';

function request(url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.baseUrl + url,
      method,
      data,
      header: {
        'content-type': 'application/json', // 默认值
      },
      success(res) {
        // console.log(res)
        // resolve(res.data);
        if (res.data.code === 200) {
          resolve(res.data.data);
        } else {
          reject(res.data.errmsg);
        }
      },
      fail(err) {
        reject(err);
      },
    });
  });
}

export default request;

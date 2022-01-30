import { endpointFetch } from './request';

function promisify(fn) {
  return async function (args) {
    return new Promise((resolve, reject) => {
      fn({
        ...(args || {}),
        success: (res) => resolve(res),
        fail: (err) => reject(err),
      });
    });
  };
}

export const wxSetStorage = promisify(wx.setStorage);
export const wxGetStorage = promisify(wx.getStorage);
export const wxRemoveStorage = promisify(wx.removeStorage);

export const wxLogin = promisify(wx.login);
export const wxRequest = promisify(wx.request);
export const wxUploadFile = promisify(wx.uploadFile);
export const wxGetUserProfile = promisify(wx.getUserProfile);
export const wxSetNavigationBarTitle = promisify(wx.setNavigationBarTitle);

export const wxNavigateTo = promisify(wx.navigateTo);
export const wxRedirectTo = promisify(wx.redirectTo);
export const wxNavigateBack = promisify(wx.navigateBack);
export const navigateTo = (path, page = 'index') => {
  const url = `/pages/${path}/${page}`;
  return wxNavigateTo({ url });
};
export const redirectTo = (path, page = 'index') => {
  const url = `/pages/${path}/${page}`;
  return wxRedirectTo({ url });
};
export const code2Session = async (data) => {
  const endpoint = '/wechat/code2Session';
  const r = await endpointFetch(endpoint, 'post', data);
  return r;
};

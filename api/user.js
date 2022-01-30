import { endpointFetch } from './request';
import { clientToken } from './jwt';

export const requestCaptcha = async (params) => {
  const endpoint = '/wechat/captcha';
  const r = await endpointFetch(endpoint, 'get', params);
  return r;
};

export const login = async (data) => {
  const endpoint = '/loginByPhone';
  const r = await endpointFetch(endpoint, 'post', data);
  return r;
};

export const shortcutLogin = async (data) => {
  const endpoint = '/shortcutLogin';
  const r = await endpointFetch(endpoint, 'post', data);
  return r;
};

export const updateUserInfo = async (data) => {
  const endpoint = '/user/edit';
  const r = await endpointFetch(endpoint, 'put', data);
  return r;
};

export const activeUser = () => {
  return getApp().globalData.userInfo;
};

export const isLoggedIn = () => {
  return getApp().globalData.userInfo ? true : false;
};

export const updateUser = (user) => {
  getApp().globalData.userInfo = user;
};

export const deleteCurrentUser = () => {
  clientToken({ action: 'destroy' });
  getApp().globalData.userInfo = undefined;
};

export const logout = () => {
  deleteCurrentUser();
};

export const openID = () => {
  return getApp().globalData.openID;
};

export const requestCurrentUser = async () => {
  const token = clientToken({ action: 'get' });
  let user = undefined;

  if (token) {
    const endpoint = '/user/currentUser';
    const { status, data } = await endpointFetch(endpoint, 'get');
    // If there is a token error, then delete it and force login
    if (status == 'error') {
      logout();
    }
    user = data.user;
    if (user) {
      updateUser(user);
    }
  }
  return user;
};

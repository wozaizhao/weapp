import { endpointFetch } from './request';
import { clientToken } from './jwt';

export const requestCaptcha = async (params) => {
  const endpoint = '/captcha';
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

import { endpointFetch } from './request';

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

export const activeUser = () => {
  return getApp().globalData.userInfo;
};

export const isLoggedIn = () => {
  return getApp().globalData.userInfo ? true : false;
};

export const updateUser = (user) => {
  getApp().globalData.userInfo = user;
};

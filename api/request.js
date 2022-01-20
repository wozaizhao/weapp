import config from '../config/config';
import { updateUser } from './user';
import { clientToken } from './jwt';
import { wxRequest, wxUploadFile } from './wechat';
import Toast from '../miniprogram_npm/@vant/weapp/toast/toast';

export const request = async (options = {}) => {
  const { headers = {}, url } = options;
  const token = await clientToken({ action: 'get' });
  const Authorization = `Bearer ${token}`;
  const source = 'wechat';
  options.header = { Authorization, from: source, ...headers };
  options.url = config.baseUrl + url;

  const r = await wxRequest(options);
  return r.data;
};

export const upload = async (filePath) => {
  const token = (await clientToken({ action: 'get' })) || '';
  const Authorization = `Bearer ${token}`;
  await wxUploadFile({
    url: config.baseUrl + '/user/upload',
    filePath,
    name: 'file',
    header: { Authorization },
  });
};

export const endpointFetch = async (url, method, data, options = {}) => {
  const r = await request({
    url,
    method,
    data,
    ...options,
  });
  if (r.message) {
    Toast(r.message);
  }
  if (r.data.user) {
    updateUser(r.data.user);
  }
  if (r.data.token) {
    clientToken({ action: 'set', token: r.data.token });
  }
  return r;
};

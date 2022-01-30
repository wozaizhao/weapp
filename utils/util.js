import config from '../config/config';
import { wxNavigateBack } from '../api/wechat';
export const imgURL = (key) => {
  if (key) {
    if (key.indexOf('http') > -1) {
      return key;
    }
    return config.imgPrefix + key;
  }
  return key;
};

export const delayGoBack = () => {
  setTimeout(() => {
    wxNavigateBack();
  }, 1000);
};

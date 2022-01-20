import config from '../config/config';

export const imgURL = (key) => {
  if (key) {
    return config.imgPrefix + key;
  }
  return key;
};

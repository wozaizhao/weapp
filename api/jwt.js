import { wxSetStorage, wxGetStorage, wxRemoveStorage } from './wechat';
export const clientToken = async (args = {}) => {
  const { action = 'get', token } = args;
  const TOKEN_KEY = 'wzzUser';
  try {
    if (action === 'destroy') {
      await wxRemoveStorage({ key: TOKEN_KEY });
    } else if (action == 'set' && token) {
      await wxSetStorage({ key: TOKEN_KEY, data: token });
    } else {
      const storageValue = await wxGetStorage({ key: TOKEN_KEY });
      return storageValue ? storageValue : '';
    }
  } catch (e) {
    console.log('clientToken catch error: ', e);
  }
};

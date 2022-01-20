export const clientToken = async (args = {}) => {
  const { action = 'get', token } = args;
  const TOKEN_KEY = 'wzzUser';
  try {
    if (action === 'destroy') {
      wx.removeStorageSync(TOKEN_KEY);
    } else if (action == 'set' && token) {
      wx.setStorageSync(TOKEN_KEY, token);
    } else {
      const storageValue = wx.getStorageSync(TOKEN_KEY);
      return storageValue ? storageValue : '';
    }
  } catch (e) {
    console.log('clientToken catch error: ', e);
  }
};

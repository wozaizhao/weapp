import request from '../utils/request';

function code2Session(data) {
    return request('/wechat/code2Session', 'post', data);
}

function decryptUserInfo(data) {
    return request('/wechat/decryptUserInfo', 'post', data);
}

module.exports = {
    code2Session,
    decryptUserInfo,
};

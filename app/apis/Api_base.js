import $ from 'jquery';
import util from '../utils/util';

export default class Api_base {
    constructor() {
        this.baseUrl = "http://localhost:8081";
    }

    request(obj) {
        return this.ajax(obj);
    }
    appendConfig(data) {
        if (!util.getSessionStorage('userinfo')) {
            return data;
        }
        var permission = util.getSessionStorage('permission');
        var cur_platform_id = util.getSessionStorage('cur_platform_id');
        var cur_channel_id = util.getSessionStorage('cur_channel_id');
        var platform_channel_config = permission[cur_platform_id][cur_channel_id];
        if (typeof data === 'object') {
            data.platform_id = platform_channel_config.platform_id;
            data.channel_id = platform_channel_config.channel_id;
            return data;
        } else {
            return {
                platform_id: platform_channel_config.platform_id,
                channel_id: platform_channel_config.channel_id
            };
        }
    }
    ajax(obj) {
        if (!obj.url) {
            console.log('error:url is null');
            return;
        } else {
            var userinfo;

            if (!(userinfo = util.getSessionStorage('userinfo'))) {
                return $.ajax(obj);
            }
            obj.url = this.baseUrl + obj.url;
            //跨域请求无法使用headers
            obj.data = obj.data || {};
            obj.data.login_token = userinfo.login_token;

            //obj.headers = { 'login_token': userinfo.login_token }
            obj.dataType = "json";
        }
        return $.ajax(obj);
    }
}
var api_base = new Api_base();

export { api_base };
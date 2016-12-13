import React from 'react';
import { hashHistory } from 'react-router';
import { api_base } from '../apis/Api_base';



require('./Login.css');
export default React.createClass({
    getInitialState() {
        return { error: '' };
    },
    componentWillMount() {
        var userinfo = util.getSessionStorage('userinfo');
        if (userinfo) {
            hashHistory.push('/');
        }
    },
    handleSubmit(e) {
        e.preventDefault();
        var username = this.refs.username.value.trim();
        var password = this.refs.password.value.trim();
        if (!username || !password) {
            return;
        }
        this.login(username, password);
        this.refs.username.value = "";
        this.refs.password.value = "";
        return;
    },
    login(username, password) {
        var it = this;
        api_base.request({
            url: '/api_login/login',
            method: 'POST',
            data: {
                username: username,
                password: password
            }
        }).done(function (res) {
            //登录成功
            if (res.msg === 'success') {
                util.setSessionStorage('userinfo', { username: res.data.username });
                util.setSessionStorage('permission', res.data.permission);
                util.setSessionStorage('cur_platform_id', res.data.cur_permission[res.data.cur_channel].platform_id);
                util.setSessionStorage('cur_channel_id', res.data.cur_channel);
                hashHistory.push('/');
            } else {
                //登录失败，显示提示信息
                it.setState({ error: res.data.error });
            }
        }).fail(function () {
            console.log('fasdf');
        });
    },
    underlineLogin(username, password) {
        if (username == 'admin' && password == 'admin') {
            util.setSessionStorage('userinfo', { username: username });
            util.setSessionStorage('permission', {
                "10004": [
                    {
                        "platform_id": "10004",
                        "platform_name": "移动web端",
                        "channel_id": "99999",
                        "channel_name": "所有渠道"
                    }
                ],
                "99999": [
                    {
                        "platform_id": "99999",
                        "platform_name": "全平台",
                        "channel_id": "10000",
                        "channel_name": "自然流量"
                    }
                ]
            });
            util.setSessionStorage('cur_platform_id', '99999');
            util.setSessionStorage('cur_channel_id', 0);
            hashHistory.push('/');
        } else {
            this.setState({ error: "账号或密码错误" });
        }
    },
    render() {
        return (
            <div className="login-form">
                <h1>Login</h1>
                <div className="tips"></div>
                <form role="form" method="post" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="text" ref="username" className="form-control" name="username" placeholder="请输入用户名" />
                    </div>
                    <div className="form-group">
                        <input type="password" ref="password" className="form-control" name="password" placeholder="请输入密码" />
                    </div>
                    <div className="form-group">{this.state.error}</div>
                    <input type="submit" className="btn btn-lg btn-primary btn-block" value="登录" />
                </form>
            </div>
        );
    }
});
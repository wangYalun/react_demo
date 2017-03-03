import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
//概要数据
import Realtime from './pages/profile/realtime';
import Interval from './pages/profile/Interval';
import Daily from './pages/profile/Daily';
import Platform from './pages/profile/Platform';

import NewUser from './pages/user/new_user';
import UserAction from './pages/user/user_action';
import ActiveUser from './pages/user/active_user';
import AccessUserCompare from './pages/user/access_user_compare';
import UserRetention from './pages/user/user_retention';
//payment
import PaymentConversion from './pages/payment/payment_conversion';
import PaymentRank from './pages/payment/payment_rank';
import PaymentRecord from './pages/payment/payment_record';
import PaymentRetention from './pages/payment/payment_retention';

//duobao
import DuobaoGoRecord from './pages/duobao/duobao_go_record';
import DuobaoShopTop from './pages/duobao/duobao_shop_top';
import DuobaoLuckyRecord from './pages/duobao/duobao_lucky_record';

//管理员功能
import Register from './pages/admin/register'; //注册界面
//import ResetPassword from './pages/admin/reset-password'; //重置密码
import Login from './pages/admin/login';


//首页
import App from './pages/index';


//加载工具类
import util from './utils/util';


const Main = React.createClass({
  getInitialState() {
    return {userinfo:util.getSessionStorage('userinfo')};
  },
  componentWillMount(){
    var userinfo=this.state.userinfo;
    if(!(userinfo&&userinfo.login_token)){
      hashHistory.push('/login');
    }
  },
  componentDidMount() {

  },
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Realtime} />
          <Route path='/realtime' component={Realtime} />
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Router>)
  }
});


ReactDOM.render(
  <Main />,
  document.getElementById('container')
);


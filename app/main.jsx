import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './pages/App';
import Realtime from './pages/profile/Realtime';
import Interval from './pages/profile/Interval';
import Daily from './pages/profile/Daily';
import Platform from './pages/profile/Platform';
import Login from './pages/Login';
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


//加载工具类
import util from './utils/util';
//设为全局变量
console.log('Start');
window.util=util;

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
        <IndexRoute component={Realtime}/>
        <Route path='/realtime' component={Realtime} />
        <Route path='/daily' component={Daily} />
        <Route path='/interval' component={Interval} />
        <Route path='/platform' component={Platform} />
        <Route path='/new_user' component={NewUser} />
        <Route path='/active_user' component={ActiveUser} />
        <Route path='/access_user_compare' component={AccessUserCompare} />
        <Route path='/user_retention' component={UserRetention} />
        <Route path='/payment_conversion' component={PaymentConversion} />
        <Route path='/payment_rank' component={PaymentRank} />
        <Route path='/payment_record' component={PaymentRecord} />
        <Route path='/payment_retention' component={PaymentRetention} />
        <Route path='/duobao_go_record' component={DuobaoGoRecord} />
        <Route path='/duobao_shop_top' component={DuobaoShopTop} />
        <Route path='/duobao_lucky_record' component={DuobaoLuckyRecord} />
    </Route>
    <Route path="/login" component={Login}/>
  </Router>,
  document.getElementById('container')
);

// ReactDOM.render(
//   <Router history={hashHistory}>
//     <Route path="/" component={App}>
//       <IndexRoute component={App}/>
//       <Route path="/realtime" component={Realtime} />
//       <Route path="/realtime" component={Realtime} />
//       <Route path="/realtime" component={Realtime} />
//       <Route path="/realtime" component={Realtime} />
//       <Route path="/realtime" component={Realtime} />
//       <Route path="/realtime" component={Realtime} />
//       <Route path="/realtime" component={Realtime} />
//       <Route path="/realtime" component={Realtime} />
//       <Route path="/realtime" component={Realtime} />
//       <Route path="/realtime" component={Realtime} />
//       <Route path="/realtime" component={Realtime} />
//       <Route path="/realtime" component={Realtime} />
//       <Route path="/realtime" component={Realtime} />
//       <Route path="/realtime" component={Realtime} />
//       <Route path="/realtime" component={Realtime} />
//     </Route>
//   </Router>,
//   document.getElementById('container')
// );

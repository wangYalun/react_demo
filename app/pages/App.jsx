import React from 'react';
import $ from 'jquery';
import { Link, hashHistory, browserHistory } from 'react-router';

require('./App.css');

let Navbar = React.createClass({
  getInitialState() {
    var userinfo = util.getSessionStorage('userinfo');
    if (!!userinfo) {
      return { username: userinfo.username };
    }
    return { username: 'login' };
  },
  logout(e) {
    e.preventDefault();
    util.removeSessionStorage('userinfo');
    hashHistory.push('/login');
  },
  render() {

    return (
      <div className="navbar">
        <div className="navbar-header">
          <a className="logo" href="#" ></a>
        </div>
        <div className="navbar-right">
          <div>
            {this.state.username}
            <a href="#" className="logout" onClick={this.logout}>logout</a>
          </div>
        </div>
      </div>);
  }
});

let GlobalNav = React.createClass({
  getInitialState() {
    //获取用户访问权限，存在sessionStorage中
    var permission = util.getSessionStorage('permission');
    var cur_platform_id = util.getSessionStorage('cur_platform_id');
    var cur_channel_id = util.getSessionStorage('cur_channel_id');
    return {
      permission: permission,
      cur_platform_id: cur_platform_id,
      cur_channel_id: cur_channel_id
    }
  },
  componentWillMount() {
    console.log('导航栏加载开始');
  },
  componentDidMount() {
    console.log('导航栏加载完毕');
    $("#app-select-head").click(function () {
      $("#app-select-list").toggle("fast");
    });
    $("#state-select-head").click(function () {
      $("#state-select-list").toggle("fast");
    });
  },
  selectPlatform(e) {
    this.setState({ cur_platform_id: e.target.dataset.platform_id, cur_channel_id: 0 });
    util.setSessionStorage('cur_platform_id', e.target.dataset.platform_id);
    util.setSessionStorage('cur_channel_id', 0);
    $("#state-select-list").toggle("fast");
    //browserHistory.push("/#/");
    location.reload();
  },
  selectChannel(e) {
    this.setState({ cur_channel_id: e.target.dataset.channel_id });
    util.setSessionStorage('cur_channel_id', e.target.dataset.channel_id);
    $("#app-select-list").toggle("fast");
    //browserHistory.push("/#/");
    location.reload();
  },
  render() {
    if (!this.state.permission) {
      return null;
    }
    var cur_platform = this.state.permission[this.state.cur_platform_id];
    var cur_platform_channel = cur_platform[this.state.cur_channel_id];

    var platform_lists = [];
    for (let i in this.state.permission) {
      let temp = this.state.permission[i];
      platform_lists.push(<li data-platform_id={temp[0].platform_id} key={i}>{temp[0].platform_name}</li>);
    }

    var channel_lists = cur_platform.map(function (item, i) {
      return <li data-channel_id={i} key={i}>{item.channel_name}</li>;
    });
    return (
      <div className="globalNav">
        <div className="leftCol">
          <div className="state-select js-select">
            <div className="select-head" id="state-select-head">
              <div className="selected" id="state_selected" data-state={cur_platform_channel.platform_id}>{cur_platform_channel.platform_name}</div>
              <b className="icon pulldown"></b>
            </div>
          </div>
          <ul className="select-list state-select-list none-show" id="state-select-list" onClick={this.selectPlatform} >
            {platform_lists}
          </ul>
          <div className="app-select js-select">
            <div className="select-head" id="app-select-head">
              <div className="selected" id="app_selected" data-app={cur_platform_channel.channel_id}>{cur_platform_channel.channel_name}</div>
              <b className="icon pulldown"></b>
            </div>
          </div>
          <ul className="select-list app-select-list none-show" id="app-select-list" onClick={this.selectChannel}>
            {channel_lists}
          </ul>
        </div>
        <div className="contentCol">
          <div className="linkpanel">
            <div className="rate_idr">
              <div className="roll"><div></div></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

let Content = React.createClass({
  render() {
    return (
      <div className="content">
        <LeftContent />
        <RightContent {...this.props} />
      </div>
    );
  }
});
let LeftContent = React.createClass({
  getInitialState() {
    return {
      hash: "/",
      profile: "list2 on",
      user: "list2",
      payment: "list2",
      duobao: "list2",
      active: "list2"
    };
  },
  componentDidMount() {
    $("a[href$='" + location.hash + "']").addClass("current").parent().addClass("on")
                        .siblings(".list2.on").removeClass("on").children().removeClass("current");
    $(".nav-list>a").click(function () {
      $(this).next("div").slideToggle("fast")
        .siblings(".list2:visible").slideUp("fast");
    });
  },
  navRouter(e) {
    $(e.target).addClass("current").siblings(".list2-item").removeClass("current").parent().addClass("on")
      .siblings(".list2.on").removeClass("on").children().removeClass("current");
  },
  render() {
    return (
      <div className="left-content">
        <div className="nav-list" onClick={this.navRouter}>
          <a className="list1-item">概要数据</a>
          <div className="list2 on">
            <Link to="/realtime" className="list2-item current">实时统计</Link>
            <Link to="/interval" className="list2-item">时段分析</Link>
            <Link to="/daily" className="list2-item">日报</Link>
            <Link to="/platform" className="list2-item">各平台数据</Link>
          </div>
          <a className="list1-item">用户类</a>
          <div className="list2">
            <Link to="/new_user" className="list2-item">新注册用户</Link>
            <Link to="/active_user" className="list2-item">活跃用户</Link>
            <Link to="/access_user_compare" className="list2-item">新老访客比</Link>
            <Link to="/user_retention" className="list2-item">新注册用户留存率</Link>
            <Link to="/user_action" className="list2-item">用户行为数据统计</Link>
          </div>
          <a className="list1-item">付费类</a>
          <div className="list2">
            <Link to="/payment_rank" className="list2-item">大R分析</Link>
            <Link to="/payment_retention" className="list2-item">付费留存</Link>
            <Link to="/payment_conversion" className="list2-item">付费转化</Link>
            <Link to="/payment_record" className="list2-item">支付记录</Link>
          </div>
          <a className="list1-item">夺宝类</a>
          <div className="list2">
            <Link to="/duobao_shop_top" className="list2-item">热度商品排行</Link>
            <Link to="/duobao_lucky_record" className="list2-item">用户中奖记录</Link>
            <Link to="/duobao_go_record" className="list2-item">用户夺宝记录</Link>
          </div>
        
          <a className="list1-item">活动类</a>
          <div className="list2">
            <Link to="/hongbao" className="list2-item">红包领取使用</Link>
          </div>
        </div>
      </div>
    );
  }
});

let RightContent = React.createClass({
  render() {
    return (
      <div className="right-content">
        {this.props.children}
      </div>
    );
  }
});

let Footer = React.createClass({
  render() {
    return (
      <div className="footer">
        <p>©Gaopeng 2016 </p>
      </div>
    );
  }
});

export default React.createClass({
  getInitialState() {
    //将登录信息保存在sessionStorage中
    var userinfo = util.getSessionStorage('userinfo');
    return { userinfo: userinfo };
  },
  componentWillMount() {
    if (!this.state.userinfo) {
      hashHistory.push('/login');
    }
    return false;
  },
  componentDidMount() {

  },
  render() {
    return (
      <div>
        <Navbar />
        <GlobalNav />
        <Content {...this.props} />
        <Footer />
      </div>
    );
  }
});

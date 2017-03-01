import React from 'react';
import { Layout, Cascader, Menu, Icon, Row, Col } from 'antd';
import { Link, hashHistory, browserHistory } from 'react-router';

require('./index.css');
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const {Header, Footer, Sider, Content} = Layout;//对象的解析赋值

const options = [
    {
        value: "all",
        label: "All",
        children: [{
            value: "all",
            label: 'All'
        }]
    },
    {
        value: "android",
        label: "Android",
        children: [{
            value: "all",
            label: 'All'
        }, {
            value: "google",
            label: "Google"
        }]
    },
    {
        value: "ios",
        label: "IOS",
        children: [{
            value: "all",
            label: 'All'
        }]
    }
];



export default React.createClass({
    render() {
        return (

            <Layout>
                <Header className="header">
                    <Row>
                        <Col span={4}><div className="logo"></div></Col>
                        <Col span={2} offset={16}><div className="userinfo">Allen</div>
                        </Col>
                        <Col span={2}><a className="logout">退出登录</a></Col>
                    </Row>
                </Header>

                <Layout>
                    <Sider>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['summary']}
                            style={{ height: '100%' }}
                        >
                            <SubMenu key="summary" title={<span><Icon type="bars" />Summary Data</span>}>
                                <Menu.Item key="1"><Link to="/realtime">实时统计</Link></Menu.Item>
                                <Menu.Item key="2">Time period Analysis</Menu.Item>
                                <Menu.Item key="3">Daily</Menu.Item>
                                <Menu.Item key="4">Each Platform Data</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon type="user" />subnav 2</span>}>
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="6">option6</Menu.Item>
                                <Menu.Item key="7">option7</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title={<span><Icon type="pay-circle-o" />subnav 3</span>}>
                                <Menu.Item key="9">option9</Menu.Item>
                                <Menu.Item key="10">option10</Menu.Item>
                                <Menu.Item key="11">option11</Menu.Item>
                                <Menu.Item key="12">option12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content className="content">
                        {this.props.children}
                    </Content>
                </Layout>
                <Footer className="footer">©Gaopeng 2016</Footer>
            </Layout>
        );
    }
});



// import React from 'react';

// import {DatePicker} from 'antd';

// export default React.createClass({
//     render(){
//         return <DatePicker/>;
//     }
// })
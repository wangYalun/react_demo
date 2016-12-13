import React from 'react';
import Mod from '../../components/mod';
import Highcharts from 'highcharts';
import { api_base } from '../../apis/Api_base';

export default React.createClass({
    getInitialState() {
        var day2 = new Date();
        var day1 = new Date(util.dateDiff(day2, 7));
        return {
            data: [],
            startTime: util.dateFormat(day1),
            endTime: util.dateFormat(day2),
            menu: {
                id: { name: '付费排名', data: [] },
                uid: { name: '用户ID', data: [] },
                username: { name: '用户名', data: [] },
                mobile: { name: '手机号码', data: [] },
                pay_amount: { name: '付费金额', data: [], format: 'money' },
                pay_times: { name: '付费次数', data: [] },
                create_time: { name: '注册时间', data: [] },
                first_pay_time: { name: '首次付费时间', data: [] },
                last_login_time: { name: '最后登录时间', data: [] },
                last_login_platform: { name: '最后登录平台', data: [] }
            }
        };
    },
    componentDidMount() {
        this.onSelectDate();
    },
    onSelectDate(day1, day2) {
        var day1 = day1 || this.state.startTime;
        var day2 = day2 || this.state.endTime;

        var it = this;
        api_base.request({
            url: '/api_selecter/payment_rank',
            data: { day1: day1, day2: day2 }
        }).done(function (res) {
            var data = res.data;

            var menu = it.state.menu;

            //var tBody = [];
            var tBody = data.map(function (item, index, arr) {

                var td = [];
                td.push(<td key={'id'+j}>{index+1}</td>);
                for (var j in menu) {
                    if(arr[index][j]){
                        td.push(<td key={j}>{arr[index][j] || '--' + (menu[j].postfix || '')}</td>);
                    }
                }
                return <tr key={index}>{td}</tr>;
            });
            var tHead = [];

            for (var k in menu) {
                //if (k != 'the_platform_name') {
                tHead.push(<td key={k}>{menu[k].name}</td>);
                //}
            }
            it.setState({ data: res.data, startTime: day1, endTime: day2, tBody: tBody, tHead: tHead });
        }).fail(function () {

        });
        //this.setState({ startTime: day1, endTime: day2 });
    },
    render() {

        return (<div>
            <Mod headerName="付费排行" onSelectDate={this.onSelectDate}><table className="detail-table">
                <thead><tr>{this.state.tHead}</tr></thead>
                <tbody>{this.state.tBody}</tbody>
            </table></Mod>
        </div>);
    }
});
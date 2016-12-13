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
                d: { name: '日期', data: [] },
                new_pay_user: { name: '新增用户', data: [] },
                r1: { name: '1天后', data: [], postfix: '%' },
                r2: { name: '2天后', data: [], postfix: '%' },
                r3: { name: '3天后', data: [], postfix: '%' },
                r4: { name: '4天后', data: [], postfix: '%' },
                r5: { name: '5天后', data: [], postfix: '%' },
                r6: { name: '6天后', data: [], postfix: '%' },
                r7: { name: '7天后', data: [], postfix: '%' },
                r8: { name: '8天后', data: [], postfix: '%' },
                r9: { name: '9天后', data: [], postfix: '%' },
                r10: { name: '10天后', data: [], postfix: '%' },
                r11: { name: '11天后', data: [], postfix: '%' },
                r12: { name: '12天后', data: [], postfix: '%' },
                r13: { name: '13天后', data: [], postfix: '%' },
                r14: { name: '14天后', data: [], postfix: '%' },
                r15: { name: '15天后', data: [], postfix: '%' },
                r30: { name: '30天后', data: [], postfix: '%' }
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
            url: '/api_selecter/payment_retention',
            data: { day1: day1, day2: day2 }
        }).done(function (res) {
            var data = res.data;

            var menu = it.state.menu;

            //var tBody = [];
            var tBody = data.map(function (item, index, arr) {

                var td = [];
                for (var j in menu) {
                    td.push(<td key={j}>{arr[index][j] || '--' + (menu[j].postfix || '')}</td>);
                }
                return <tr key={index}>{td}</tr>;
            });
        
            it.setState({ data: res.data, startTime: day1, endTime: day2, tBody: tBody });
        }).fail(function () {

        });
        //this.setState({ startTime: day1, endTime: day2 });
    },
    render() {

        return (<div>
            <Mod headerName="付费留存率" onSelectDate={this.onSelectDate}><table className="detail-table">
                <thead>
                    <tr><td>注册时间</td><td>首充用户</td><td colSpan="16">付费留存率</td></tr>
                    <tr>
                        <td colSpan="2"></td>
                        <td>1天后</td><td>2天后</td>
                        <td>3天后</td><td>4天后</td>
                        <td>5天后</td><td>6天后</td>
                        <td>7天后</td><td>8天后</td>
                        <td>9天后</td><td>10天后</td>
                        <td>11天后</td><td>12天后</td>
                        <td>13天后</td><td>14天后</td>
                        <td>15天后</td><td>30天后</td>
                    </tr>
                </thead>
                <tbody>{this.state.tBody}</tbody>
            </table></Mod>
        </div>);
    }
});
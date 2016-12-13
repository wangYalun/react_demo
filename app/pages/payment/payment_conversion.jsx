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
                new_user: { name: '新增用户', data: [] },
                day1: { name: '新用户首日付费率', data: [] },
                day3: { name: '新用户3日付费率', data: [] },
                day7: { name: '新用户7日付费率', data: [] },
                day14: { name: '新用户14日付费率', data: [] },
                day30: { name: '新用户30日付费率', data: [] }
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
            url: '/api_selecter/payment_conversion',
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
            <Mod headerName="付费转化" onSelectDate={this.onSelectDate}><table className="detail-table">
                <thead><tr>{this.state.tHead}</tr></thead>
                <tbody>{this.state.tBody}</tbody>
            </table></Mod>
        </div>);
    }
});
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
                uphoto: { name: '头像', data: [], format: 'avatar' },
                uid: { name: '用户ID', data: [] },
                username: { name: '用户昵称', data: [] },
                thumb: { name: '商品缩略图', data: [], format: 'img' },
                shopname: { name: '商品名称', data: [] },
                shopqishu: { name: '商品期数', data: [] },
                money: { name: '商品金额', data: [], sort: true },
                gonumber: { name: '购买金额', data: [], sort: true },
                huode: { name: '中奖码', data: [] },
                ip: { name: '购买IP地址', data: [] },
                jiqiren_go_number: { name: '机器人购买金额', data: [], sort: true },
                user_go_number: { name: '真实用户购买金额', data: [], sort: true },
                go_time: { name: '购买时间', data: [] },
                gailv: { name: '用户中奖概率', data: [], format: '%', sort: true }
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
            url: '/api_selecter/duobao_lucky_record',
            data: { day1: day1, day2: day2 }
        }).done(function (res) {
            var data = res.data;

            var menu = it.state.menu;

            //var tBody = [];
            var tBody = data.map(function (item, index, arr) {

                var td = [];

                for (var j in menu) {
                    if (arr[index][j]) {
                        if (menu[j].format === 'img') {
                            td.push(<td key={j}><img src={arr[index][j] || '--' + (menu[j].postfix || '')} className="table-img" /></td>);
                        } else if(menu[j].format === 'avatar') {
                            td.push(<td key={j}><img src={arr[index][j] || '--' + (menu[j].postfix || '')} className="avatar" /></td>);
                        }else{
                            td.push(<td key={j}>{arr[index][j] || '--' + (menu[j].postfix || '')}</td>);
                        }

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
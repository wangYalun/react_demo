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
                id: { name: '序号', data: [] },
                thumb: { name: '商品缩略图', data: [], format: 'img' },
                shopname: { name: '商品名称', data: [] },
                money: { name: '商品价格', data: [], sort: true },
                duobao_user: { name: '夺宝用户数', data: [], sort: true },
                duobao_amount: { name: '夺宝交易金额', data: [], sort: true },
                q_times: { name: '开奖期数', data: [] },
                lucky_money: { name: '用户中奖金额', data: [], sort: true },
                d_value: { name: '盈利差值', data: [], sort: true }
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
            url: '/api_selecter/duobao_shop_top',
            data: { day1: day1, day2: day2 }
        }).done(function (res) {
            var data = res.data;

            var menu = it.state.menu;

            //var tBody = [];
            var tBody = data.map(function (item, index, arr) {

                var td = [];
                
                for (var j in menu) {
                    if (arr[index][j]) {
                        if(menu[j].format==='img'){
                            td.push(<td key={j}><img src={arr[index][j] || '--' + (menu[j].postfix || '')} className="table-img"/></td>);
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
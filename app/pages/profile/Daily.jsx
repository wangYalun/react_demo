import React from 'react';
import Mod from '../../components/mod';
import Highcharts from 'highcharts';
import { api_base } from '../../apis/Api_base';


export default React.createClass({
    getInitialState() {
        var day2 = new Date();
        var day1 = new Date(util.dateDiff(day2, 7));
        return {
            startTime: util.dateFormat(day1),
            endTime: util.dateFormat(day2),
            headerTime: "昨日数据",
            item: 'new_user',
            menu: {
                new_user: { name: '新增用户', data: [] },
                active_user: { name: '活跃用户', data: [] },
                access_user: { name: '独立访客', data: [] },
                q_times: { name: '开奖期数', data: [] },
                q_money: { name: '开奖金额', data: [] },
                pay_user: { name: '付费用户', data: [] },
                pay_times: { name: '付费次数', data: [] },
                pay_amount: { name: '付费金额', data: [] },
                arppu: { name: 'ARPPU', data: [] },
                new_pay_user: { name: '首充用户', data: [] },
                the_day_pay_user: { name: '新用户付费人数', data: [] },
                the_day_pay_amount: { name: '新用户付费金额', data: [] },
                give_amount: { name: '赠送夺宝币', data: [] },
                duo_user: { name: '夺宝人数', data: [] },
                // duo_times: { name: '夺宝次数', data: [] },
                duo_amount: { name: '夺宝交易金额', data: [] }
            }
        }
    },
    componentDidMount() {
        var it = this;
        api_base.request({
            url: '/api_selecter/daily',
            data: { day1: this.state.startTime, day2: this.state.endTime }
        }).done(function (res) {
            console.log(res);
            it.setState({ data: res.data, headerTime: res.data[res.data.length - 1].d });
        }).fail(function () {
            console.log('fasdf');
        });

    },
    onSelectDate(day1, day2) {
        var it = this;
        api_base.request({
            url: '/api_selecter/daily',
            data: { platform_id: '99999', channel_id: '99999', day1: day1, day2: day2 }
        }).done(function (res) {
            console.log(res);
            it.setState({ data: res.data, headerTime: res.data[res.data.length - 1].d });
        }).fail(function () {
            console.log('fasdf');
        });
        this.setState({ startTime: day1, endTime: day2 });
    },
    toDailyDOM() {
        if (!this.state.data) {
            return <li></li>;
        }
        var menu = {
            new_user: { name: '新增用户', data: [] },
            active_user: { name: '活跃用户', data: [] },
            access_user: { name: '独立访客', data: [] },
            q_times: { name: '开奖期数', data: [] },
            q_money: { name: '开奖金额', data: [], format: 'money' },
            pay_user: { name: '付费用户', data: [] },
            pay_times: { name: '付费次数', data: [] },
            pay_amount: { name: '付费金额', data: [], format: 'money' },
            arppu: { name: 'ARPPU', data: [] },
            new_pay_user: { name: '首充用户', data: [] },
            the_day_pay_user: { name: '新用户付费人数', data: [] },
            the_day_pay_amount: { name: '新用户付费金额', data: [], format: 'money' },
            give_amount: { name: '赠送夺宝币', data: [], format: 'money' },
            duo_user: { name: '夺宝人数', data: [] },
            // duo_times: { name: '夺宝次数', data: [] },
            duo_amount: { name: '夺宝交易金额', data: [], }
        };
        var categories = [];
        for (var i in this.state.data) {
            for (var j in this.state.data[i]) {
                if (menu[j]) {
                    menu[j].data.push(Number(this.state.data[i][j]));
                } else if (j === 'd') {
                    categories.push(this.state.data[i]['d']);
                }
            }
        }
        this.showChart(categories, menu[this.state.item]);
        var the_last_day = this.state.data[this.state.data.length - 1];
        var list = [];
        for (var j in menu) {
            if (the_last_day[j]) {
                list.push({ name: menu[j].name, data: the_last_day[j], gr: the_last_day[j + "_gr"] });
            }
        }

        var listDOM = list.map(function (item, i) {
            return (<li key={i}>
                <p className="menu">{item.name}</p>
                <p className="num">{item.data}</p>
                <div className="rate" title="环比昨天"><span className={item.gr >= 0 ? "asc" : "desc"}><i className="i_arr"></i>{item.gr + "%"}</span></div>
            </li>);
        });
        return listDOM;
    },
    showChart(categories, series) {
        Highcharts.chart('chart_demo', {
            chart: {
            },
            title: {
                text: null
            },
            xAxis: {
                categories: categories
            },
            yAxis: {
                title: {
                    text: 'value'
                }
            },
            series: [series]
        });
    },
    detailData() {
        var it=this;
        if (!this.state.data) {
            return <table></table>;
        }
        var tBody = this.state.data.map(function (item, i) {

            var tr = [];
            tr.push(<td key={i}>{item['d']}</td>);
            for(var j in it.state.menu){
                if(item[j]){
                    tr.push(<td key={j}>{item[j]}</td>); 
                }
            }
            
            return <tr key={i}>{tr}</tr>

        });
        var tHead=[];
        tHead.push(<td key={1}>日期</td>);
        for(var k in this.state.menu){
            tHead.push(<td key={k}>{this.state.menu[k].name}</td>);
        }
        return (<table className="detail-table">
            <thead><tr>{tHead}</tr></thead>
            <tbody>{tBody}</tbody>
        </table>);
    },
    changeItem(e){
        this.setState({item:e.target.value});
    },
    render() {
        //console.log(this.state.data);

        var listDOM = this.toDailyDOM();
        var detailData = this.detailData();

        var itemRadio = [];
        for (var j in this.state.menu) {
            //list.push({ name: this.state.menu[j].name, data: this.state.realtime[j] });
            itemRadio.push(<label key={j}><input type="radio" name="paytype" value={j} onChange={this.changeItem} checked={this.state.item == j} />{this.state.menu[j].name}</label>);
        }
        return (<div>
            <Mod headerName={this.state.headerTime} onSelectDate={this.onSelectDate}>
                <ul className="left-list">{listDOM}</ul>
            </Mod>
            <Mod headerName="整体趋势">
                <div className="select_input">
                    {itemRadio}
                </div>
                <div id="chart_demo"></div>
            </Mod>
            <Mod headerName="明细数据">{detailData}</Mod>
        </div>);
    }
});
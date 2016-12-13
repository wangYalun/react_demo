import React from 'react';
import Mod from '../../components/mod';
import Highcharts from 'highcharts';
import { api_base } from '../../apis/Api_base';


export default React.createClass({
    getInitialState() {
        return {
            data: [],
            realtime: [],
            interval: [],
            item: 'new_user',
            days: 0,
            menu: {
                new_user: { name: '新增用户', data: [] },
                active_user: { name: '活跃用户', data: [] },
                access_user: { name: '独立访客', data: [] },
                access_times: { name: '访问/启动次数', data: [] },
                q_times: { name: '开奖期数', data: [] },
                q_money: { name: '开奖金额', data: [], format: 'money' },
                pay_user: { name: '付费用户', data: [] },
                pay_times: { name: '付费次数', data: [] },
                pay_amount: { name: '付费金额', data: [], format: 'money' },
                give_amount: { name: '赠送夺宝币', data: [], format: 'money' },
                duo_user: { name: '夺宝人数', data: [] },
                duo_times: { name: '夺宝次数', data: [] },
                duo_amount: { name: '夺宝交易金额', data: [], format: 'money' }
            }
        };
    },
    componentDidMount() {
        this.loadRealtime();
        this.loadInterval();
    },
    loadRealtime() {
        var it = this;
        api_base.request({
            url: '/api_selecter/realtime_ajax'
        }).done(function (res) {
            it.setState({ realtime: res.data });
        }).fail(function () {
            console.log('fasdf');
        });

    },
    loadInterval() {
        var it = this;
        api_base.request({
            url: '/api_selecter/interval',
            data: { days: it.state.days }
        }).done(function (res) {
            console.log(res);
            it.showChart(res.data, 'new_user');
            it.setState({ interval: res.data });
        }).fail(function () {
            console.log('fasdf');
        });
    },
    showChart(data, item) {
        //var item = 'new_user';
        var series = [];
        for (var i in data) {
            var serie = {};
            serie.name = i;
            if (!item) {
                for (item in data[i]) {
                    break;
                }
            }
            serie.data = data[i][item];
            series.push(serie);
        }
        Highcharts.chart('chart_demo', {
            chart: {
                type: 'spline'
            },
            title: {
                text: null
            },
            credits: {
                enabled: false
            },
            colors: ['#7cb5ec', '#90ed7d', '#f7a35c', '#8085e9',
                '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'],
            xAxis: {
                categories: ['0:00-1:00', '1:00-2:00', '2:00-3:00', '3:00-4:00', '4:00-5:00',
                    '5:00-6:00', '6:00-7:00', '7:00-8:00', '8:00-9:00', '9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00',
                    '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00',
                    '18:00-19:00', '19:00-20:00', '20:00-21:00', '21:00-22:00', '22:00-23:00', '23:00-24:00'],
                labels: {
                    align: "center",
                    step: parseInt(24 / 10),
                    staggerLines: 1
                }
            },
            yAxis: {
                title: {
                    text: 'value'
                }
            },
            tooltip: {
                crosshairs: true,
                shared: true
            },
            plotOptions: {
                spline: {
                    marker: {
                        radius: 4,
                        lineColor: '#666666',
                        lineWidth: 1
                    }
                }
            },
            series: series
        });
    },
    changeItem(e) {
        this.setState({ item: e.target.value });
        this.showChart(this.state.interval, e.target.value);
    },
    changeDays(e) {
        var it = this;
        this.setState({ days: e.target.value === this.state.days ? 0 : e.target.value }, function () {
            it.loadInterval();
        });
    },
    render() {
        var list = [];
        var itemRadio = [];
        for (var j in this.state.menu) {
            if (this.state.realtime[j]) {
                list.push({ name: this.state.menu[j].name, data: this.state.realtime[j] });
                itemRadio.push(<label key={j}><input type="radio" name="paytype" value={j} onChange={this.changeItem} checked={this.state.item == j} />{this.state.menu[j].name}</label>);
            }
        }
        var listDOM = list.map(function (item, i) {
            return (<li key={i}>
                <p className="menu">{item.name}</p>
                <p className="num">{item.data}</p>
            </li>);
        });

        return (
            <div>
                <Mod headerName="今日数据"><ul className="left-list">{listDOM}</ul></Mod>
                <Mod headerName="时段分析">
                    <div className="select_input" data-item="new_user">
                        {itemRadio}
                        <div className="js-checkbox" id="compare_select">
                            <label>对比：</label>
                            <input type="checkbox" value="1" checked={this.state.days == 1} onChange={this.changeDays} />前一天
                            <input type="checkbox" value="7" checked={this.state.days == 7} onChange={this.changeDays} />上周同期
                            <input type="checkbox" value="30" checked={this.state.days == 30} onChange={this.changeDays} />上月同期
                        </div>
                    </div>
                    <div id="chart_demo"></div>
                </Mod>
            </div>);
    }
});
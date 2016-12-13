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
            item: 'new_user',
            compare: 'compare',//compare,result
            menu: {
                new_user: { name: '新增用户', data: [] },
                active_user: { name: '活跃用户', data: [] },
                access_user: { name: '访问/启动用户', data: [] },
                access_times: { name: '访问/启动次数', data: [] },
                pay_user: { name: '付费用户', data: [] },
                pay_times: { name: '付费次数', data: [] },
                pay_amount: { name: '付费金额', data: [] },
                duo_user: { name: '夺宝用户', data: [] },
                duo_times: { name: '夺宝次数', data: [] },
                duo_amount: { name: '夺宝金额', data: [] }
            }
        }
    },
    componentDidMount() {
        var it = this;
        api_base.request({
            url: '/api_selecter/interval2',
            data: { day1: this.state.startTime, day2: this.state.endTime, compare: 'true' }
        }).done(function (res) {
            console.log(res);
            it.setState({ data: res.data });
        }).fail(function () {
            console.log('fasdf');
        });

    },
    onSelectDate(day1, day2) {
        var it = this;
        api_base.request({
            url: '/api_selecter/interval2',
            data: { day1: day1, day2: day2, compare: 'true' }
        }).done(function (res) {
            it.setState({ data: res.data });
        }).fail(function () {
            console.log('fasdf');
        });
        this.setState({ startTime: day1, endTime: day2 });
    },
    changeItem(e) {
        this.setState({ item: e.target.value });
    },
    changeCompare(e) {
        this.setState({ compare: e.target.value });
    },
    showChart(data, item) {
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
    detailData() {
        var it = this;
        if (!this.state.data) {
            return <table></table>;
        }
        this.showChart(this.state.data[this.state.compare], this.state.item);
        var d = ['0:00-1:00', '1:00-2:00', '2:00-3:00', '3:00-4:00', '4:00-5:00',
            '5:00-6:00', '6:00-7:00', '7:00-8:00', '8:00-9:00', '9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00',
            '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00',
            '18:00-19:00', '19:00-20:00', '20:00-21:00', '21:00-22:00', '22:00-23:00', '23:00-24:00'];
        var result = this.state.data['result'];
        var tBody = [];
        for (var i = 0; i < 24; i++) {
            var tr = [];
            tr.push(<td key={i}>{d[i]}</td>);
            for (var j in this.state.menu) {
                for (var k in result) {
                    tr.push(<td key={j + i}>{result[k][j][i]}</td>);
                }
            }
            tBody.push(<tr key={i}>{tr}</tr>);
        }

        var tHead = [];
        tHead.push(<td key={1}>时间段</td>);
        for (var k in this.state.menu) {
            tHead.push(<td key={k}>{this.state.menu[k].name}</td>);
        }
        
        return (<table className="detail-table">
            <thead><tr>{tHead}</tr></thead>
            <tbody>{tBody}</tbody>
        </table>);
    },
    render() {
        var detailData = this.detailData();

        var itemRadio = [];
        for (var j in this.state.menu) {

            itemRadio.push(<label key={j}><input type="radio" name="paytype" value={j} onChange={this.changeItem} checked={this.state.item == j} />{this.state.menu[j].name}</label>);
        }
        return (<div>
            <Mod headerName="时段分析" onSelectDate={this.onSelectDate}>
                <div className="select_input">
                    {itemRadio}
                    <div className="js-checkbox" id="compare_select">
                            <label>显示方式：</label>
                            <input type="checkbox" value="compare" checked={this.state.compare=="compare"} onChange={this.changeCompare}/>对比
                            <input type="checkbox" value="result" checked={this.state.compare=="result"} onChange={this.changeCompare}/>合并
                        </div>
                </div>
                <div id="chart_demo"></div>
            </Mod>
            <Mod headerName="明细数据(合并)">{detailData}</Mod>
        </div>);
    }
});
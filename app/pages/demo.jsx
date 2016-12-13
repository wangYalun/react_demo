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
            item: 'client_new_user',
            startTime: util.dateFormat(day1),
            endTime: util.dateFormat(day2),
            menu: {
                the_platform_name: { name: '平台名称', data: [] },
                client_new_user: { name: '新增用户', data: [] },
                client_active_user: { name: '活跃用户', data: [] },
                client_access_user: { name: '访问/启动用户', data: [] },
                client_access_times: { name: '访问/启动次数', data: [] },
                client_access_ip: { name: '独立IP', data: [] },
                client_pay_user: { name: '付费用户', data: [] },
                client_pay_times: { name: '付费次数', data: [] },
                client_pay_amount: { name: '付费金额', data: [] }
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
            url: '/api_selecter/platform_con',
            data: { day1: day1, day2: day2 }
        }).done(function (res) {
            var data = res.data;
            var categories = [];
            var menu = {
                the_platform_name: { name: '平台名称', data: [] },
                client_new_user: { name: '新增用户', data: [] },
                client_active_user: { name: '活跃用户', data: [] },
                client_access_user: { name: '访问/启动用户', data: [] },
                client_access_times: { name: '访问/启动次数', data: [] },
                client_access_ip: { name: '独立IP', data: [] },
                client_pay_user: { name: '付费用户', data: [] },
                client_pay_times: { name: '付费次数', data: [] },
                client_pay_amount: { name: '付费金额', data: [] }
            }

            var flag = true;
            var tBody = [];
            for (var i in data) {
                categories.push(i);

                for (var j in data[i]) {
                    var td = [];

                    if (j == 0) {
                        td.push(<td key={i + j} rowSpan={data[i].length}>{i}</td>);
                    }
                    for (var k in menu) {
                        if (flag) {
                            menu[k].data.push({ name: data[i][j]['the_platform_name'], data: [] });
                        }
                        if (k != 'the_platform_name') {
                            menu[k].data[j].data.push(Number(data[i][j][k]));
                        }
                        td.push(<td key={i + j + k} >{data[i][j][k] || "--"}</td>);
                    }
                    tBody.push(<tr key={i + j}>{td}</tr>);
                }

                flag = false;

                //html.push(<tr>)
            }
            var tHead = [];
            tHead.push(<td key={1}>时间</td>);
            for (var k in menu) {
                //if (k != 'the_platform_name') {
                tHead.push(<td key={k}>{menu[k].name}</td>);
                //}
            }
            it.setState({ data: res.data, startTime: day1, endTime: day2, menu: menu, categories: categories, tBody: tBody, tHead: tHead }, function () {
                it.showChart();
            });
        }).fail(function () {

        });
        //this.setState({ startTime: day1, endTime: day2 });
    },
    detailData() {

    },
    showChart() {
        var series = this.state.menu[this.state.item].data;
        Highcharts.chart('chart_demo', {
            chart: {
                type: 'column'
            },
            title: {
                text: null
            },
            subtitle: {
                text: null
            },
            xAxis: {
                categories: this.state.categories
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: series
        });
    },
    changeItem(e) {
        var it=this;
        this.setState({item:e.target.value},function(){
            it.showChart();
        })
    },
    render() {

        var itemRadio = [];
        for (var j in this.state.menu) {
            if (j != 'the_platform_name') {
                itemRadio.push(<label key={j}><input type="radio" name="paytype" value={j} onChange={this.changeItem} checked={this.state.item == j} />{this.state.menu[j].name}</label>);
            }
        }
        return (<div>
            <Mod headerName="各平台数据">
                <div className="select_input">
                    {itemRadio}
                </div>
                <div id="chart_demo"></div>
            </Mod>
            <Mod headerName="明细数据"><table className="detail-table">
                <thead><tr>{this.state.tHead}</tr></thead>
                <tbody>{this.state.tBody}</tbody>
            </table></Mod>
        </div>);
    }
});
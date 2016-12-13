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
                old_access_user: { name: '老访客', data: [] },
                new_access_user: { name: '新访客', data: [] }
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
            url: '/api_selecter/access_user_compare',
            data: { day1: day1, day2: day2 }
        }).done(function (res) {
            var data = res.data;
            var categories = [];
            var menu = {
                old_access_user: { name: '老访客', data: [] },
                new_access_user: { name: '新访客', data: [] }
            }

            var tBody = data.map(function (item, i, arr) {

                var td = [];
                for (var j in item) {
                    if (menu[j]) {
                        menu[j].data.push(+data[i][j]);
                    } else if (j === 'd') {
                        categories.push(data[i]['d']);
                        td.push(<td key={j}>{data[i][j] || '--'}</td>);
                    }
                    if (j !== 'd') {
                        td.push(<td key={j}>{data[i][j] || '--'}</td>);
                    }
                }
                return <tr key={i}>{td}</tr>;
            });



            var tHead = [];
            tHead.push(<td key={1}>日期</td>);
            for (var k in menu) {
                //if (k != 'the_platform_name') {
                tHead.push(<td key={k}>{menu[k].name}</td>);
                tHead.push(<td key={k+'_gr'}>{menu[k].name + '占比'}</td>);
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
        var series=[];
        for(var i in this.state.menu){
            series.push(this.state.menu[i]);
        }
         Highcharts.chart('chart_demo', {
            chart: {
            },
            title: {
                text: null
            },
            xAxis: {
                categories: this.state.categories
            },
            yAxis: {
                title: {
                    text: 'value'
                }
            },
            series: series
        });
    },
    
    render() {

        
        return (<div>
            <Mod headerName="新老访客比" onSelectDate={this.onSelectDate}>
                <div id="chart_demo"></div>
            </Mod>
            <Mod headerName="明细数据"><table className="detail-table">
                <thead><tr>{this.state.tHead}</tr></thead>
                <tbody>{this.state.tBody}</tbody>
            </table></Mod>
        </div>);
    }
});
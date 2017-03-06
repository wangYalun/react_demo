import React from 'react';
import Highcharts from 'highcharts';


export default React.createClass({
    getInitialState() {
        return {};
    },
    componentDidMount() {
        this.showChart();
    },
    showChart() {
        Highcharts.chart(this.refs.chart_demo, {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Fruit Consumption'
            },
            xAxis: {
                categories: ['Apples', 'Bananas', 'Oranges']
            },
            yAxis: {
                title: {
                    text: 'Fruit eaten'
                }
            },
            series: [{
                name: 'Jane',
                data: [1, 0, 4]
            }, {
                name: 'John',
                data: [5, 7, 3]
            }]
        });
    },
    render() {
        return (<div className="chart" ref="chart_demo"></div>);
    }
});
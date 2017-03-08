import Highcharts from 'highcharts';


function Hchart() {

}

Hchart.getDefaultConfig = function () {
    return {
        chart: {
            type: 'line'
        },
        title: {
            text: null
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
    };
};
Hchart.chart = function (dom, config) {

    config = Object.assign(Hchart.getDefaultConfig(), config);

    Highcharts.chart(dom, config);
};

export default Hchart;
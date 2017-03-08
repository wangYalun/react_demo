import React from 'react';
import Content from '../../components/content';
import Hchart from '../../utils/hchart';
import { DatePicker, Select, Radio, Row, Col } from 'antd';
import moment from 'moment';
import { api_base } from '../../apis/Api_base';

const { Button: RadioButton, Group: RadioGroup } = Radio;
const { RangePicker } = DatePicker;
const { Option } = Select;

const { Mod, ContentHeader } = Content;
const { Summary } = Mod;


import { Table, Button } from 'antd';


const dateFormat = 'YYYY/MM/DD';

var dataSource = [];

const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
}, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
}];
for (let i = 0; i < 40; i++) {
    dataSource.push({
        key: i + 1,
        name: '胡彦斌' + i,
        age: 32 + i,
        address: '西湖区湖底公园1号'
    });
}



export default React.createClass({
    getInitialState(){
        return {
            summaryData:[]
        }
    },
    componentDidMount() {
        var it=this;
        api_base.request({ url: '/api_selecter/today' })
            .done(function (res) {
                console.log(res.data);
                it.setState({summaryData:res.data});
            });

        Hchart.chart(this.refs.chart_demo, { chart: { type: "bar" } });
        Hchart.chart(this.refs.chart_demo2);
    },
    render() {
        var summaryDataCols=this.state.summaryData.map(function(item,i){
            return  <Col span={4} key={i}><Summary summaryData={item}/></Col>;
        });
        return (
            <div>
                <ContentHeader contentObj={{ contentName: "实时统计", tipsTitle: "统计截止到当前时刻的数据" }}>   </ContentHeader>
                <Mod modName="今日数据">
                    <Row type="flex" justify="space-between">
                        {summaryDataCols}
                    </Row>
                </Mod>
                <Mod modName="时段分析">
                    <div className="chart">
                        <div className="chart-controller clearfix">
                            <div className="l">
                                <RadioGroup defaultValue="a" size="small">
                                    <RadioButton value="a">活跃用户</RadioButton>
                                    <RadioButton value="c">付费用户</RadioButton>
                                </RadioGroup>
                            </div>
                            <div className="r">
                                <label>对比:</label>
                                <RadioGroup defaultValue={1} size="small">
                                    <Radio value={1}>前一天</Radio>
                                    <Radio value={2}>上周同期</Radio>
                                </RadioGroup>
                            </div>
                        </div>
                        <div ref="chart_demo2"></div>
                    </div>
                </Mod>
                <Row>
                    <Col span={8}> <Mod modName="时段分析" inline={true}>
                        <div className="chart">

                            <div className="chart-controller clearfix">
                                <div className="l">
                                    <RadioGroup defaultValue="a" size="small">
                                        <RadioButton value="a">活跃用户</RadioButton>
                                        <RadioButton value="c">付费用户</RadioButton>
                                    </RadioGroup>
                                </div>
                                <div className="r">
                                    <label>对比:</label>
                                    <RadioGroup defaultValue={1} size="small">
                                        <Radio value={1}>前一天</Radio>
                                        <Radio value={2}>上周同期</Radio>
                                    </RadioGroup>
                                </div>
                            </div>
                            <div ref="chart_demo"></div>
                        </div>
                    </Mod></Col>
                    <Col span={8}><Mod modName="详细数据" inline={true}>
                        <Table dataSource={dataSource} columns={columns} size="small" />
                    </Mod></Col>
                    <Col span={8}><Mod modName="详细数据">
                        <Table dataSource={dataSource} columns={columns} size="small" />
                    </Mod></Col>
                </Row>

                
                <Mod modName="详细数据">
                    <Table dataSource={dataSource} columns={columns} size="small" />
                </Mod>
            </div>);
    }
});



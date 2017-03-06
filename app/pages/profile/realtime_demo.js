import React from 'react';
import Content from '../../components/content';
import Hchart from '../../components/hchart';
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
  componentDidMount() {
    api_base.request({url:'/api_selecter/'})
    .done(function (res) {
      console.log(res);
    });
  },
  render() {
    return (
      <div>
        <ContentHeader contentObj={{ contentName: "实时统计", tipsTitle: "统计截止到当前时刻的数据" }}>
          <div className="filters">
            <div className="control-bar-wrapper">
              时间：<RangePicker
                defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                format={dateFormat}
              />
            </div>
            <div className="control-bar-wrapper">
              <div className="filter">
                版本：<Select className="select-input" defaultValue="1.1.0">
                  <Option value="1.0.0">1.0.0</Option>
                  <Option value="1.1.0">1.1.0</Option>
                  <Option value="2.0.0">2.0.0</Option>
                </Select>
              </div>
              <div className="filter">
                访客：<RadioGroup defaultValue="a">
                  <RadioButton value="a">全部</RadioButton>
                  <RadioButton value="b">新访客</RadioButton>
                  <RadioButton value="c">老访客</RadioButton>
                </RadioGroup>
              </div>
            </div>
          </div>
        </ContentHeader>
        <Row>
          <Col span={8}> <Mod modName="时段分析" inline={true}>
            <Hchart />
          </Mod></Col>
          <Col span={8}><Mod modName="详细数据" inline={true}>
            <Table dataSource={dataSource} columns={columns} size="small" />
          </Mod></Col>
          <Col span={8}><Mod modName="详细数据">
            <Table dataSource={dataSource} columns={columns} size="small" />
          </Mod></Col>
        </Row>
        <Mod modName="今日数据">
          <Row type="flex" justify="space-between">
            <Col span={4}><Summary summaryData={{ title: "浏览量(PV)", num: "100", rate: -89.01, tipsTitle: "网站的访问量" }} /></Col>
            <Col span={4}><Summary summaryData={{ title: "浏览量(PV)", num: "100", rate: -89.00 }} /></Col>
            <Col span={4}><Summary summaryData={{ title: "浏览量(PV)", num: "100", rate: 89 }} /></Col>
            <Col span={4}><Summary summaryData={{ title: "浏览量(PV)", num: "100", rate: 89 }} /></Col>
            <Col span={4}><Summary summaryData={{ title: "浏览量(PV)", num: "100", rate: 89 }} /></Col>
            <Col span={4}><Summary summaryData={{ title: "浏览量(PV)", num: "100", rate: 89 }} /></Col>
          </Row>
        </Mod>
        <Mod modName="时段分析">
          <Hchart />
        </Mod>
        <Mod modName="详细数据">
          <Table dataSource={dataSource} columns={columns} size="small" />
        </Mod>
      </div>);
  }
});



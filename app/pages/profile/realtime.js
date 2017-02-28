import React from 'react';
import Content from '../../components/content';
import { DatePicker, Select, Radio } from 'antd';
import moment from 'moment';

const {Button: RadioButton, Group: RadioGroup} = Radio;
const {RangePicker} = DatePicker;
const {Option}=Select;

const {Mod, ContentHeader} = Content;


import { Table, Button } from 'antd';


const dateFormat = 'YYYY/MM/DD';

const dataSource = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}];

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



export default React.createClass({
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
        <Mod modName="今日数据">
          <Table dataSource={dataSource} columns={columns} size="small" />
        </Mod>
      </div>);
  }
});



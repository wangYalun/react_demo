import React from 'react';
import Mod from '../../components/mod';
import Highcharts from 'highcharts';
import { api_base } from '../../apis/Api_base';
import $ from '../../utils/datepicker';

export default React.createClass({
    getInitialState() {
        var day2 = new Date();
        var day1 = new Date(util.dateDiff(day2, 1));
        return {
            data: [],
            startTime:util.dateFormat(day1),
            endTime:util.dateFormat(day2),
            menu: {
                uid: { name: '用户ID', data: [] },
                username: { name: '用户昵称', data: [] },
                mobile: { name: '手机号', data: [] },
                code: { name: '订单ID', data: [] },
                money: { name: '新增用户', data: [] },
                pay_type: { name: '支付方式', data: [] },
                status: { name: '支付状态', data: [] },
                buy_type: { name: '支付入口', data: [] },
                trans_id: { name: '付款ID', data: [] },
                create_time: { name: '支付时间', data: [] }
            }
        };
    },
    componentDidMount() {
        $(this.refs.start_time).datepicker({
            showOtherMonths: true,
            selectOtherMonths: true,
            showButtonPanel: true,
            /*显示今天的日期的显示，以及关闭时间选择器*/
            changeMonth: true,
            /*显示选择其他月份*/
            changeYear: true,
            /*显示选择其他年份*/
            dateFormat: "yy-mm-dd" /*设置日期的显示格式*/,
            showWeek: true, /*显示一年中的第几周*/
            firstDay: 1
        });
        $(this.refs.end_time).datepicker({
            showOtherMonths: true,
            selectOtherMonths: true,
            showButtonPanel: true,
            /*显示今天的日期的显示，以及关闭时间选择器*/
            changeMonth: true,
            /*显示选择其他月份*/
            changeYear: true,
            /*显示选择其他年份*/
            dateFormat: "yy-mm-dd" /*设置日期的显示格式*/,
            showWeek: true, /*显示一年中的第几周*/
            firstDay: 1
        });
        if(this.refs.uid_or_username.value.trim()){
            this.onSelectDate();
        }
    },
    getFormData(){
        return {
            code:this.refs.code.value.trim(),
            trans_id:this.refs.trans_id.value.trim(),
            start_time:this.refs.start_time.value.trim(),
            end_time:this.refs.end_time.value.trim(),
            status:this.refs.status.value.trim(),
            uid_or_username:this.refs.uid_or_username.value.trim()
        }
    },
    onChange(){
        this.setState({
            startTime:this.refs.start_time.value,
            endTime:this.refs.end_time.value
        });
    },
    onSelectDate() {
        var it = this;
        var formData=this.getFormData();
        api_base.request({
            url: '/api_selecter/payment_record',
            data: formData
        }).done(function (res) {
            var data = res.data;

            var menu = it.state.menu;

            //var tBody = [];
            var tBody = data.map(function (item, index, arr) {

                var td = [];
                for (var j in menu) {
                    td.push(<td key={j}>{arr[index][j] || '--' + (menu[j].postfix || '')}</td>);
                }
                return <tr key={index}>{td}</tr>;
            });
            var tHead = [];

            for (var k in menu) {
                //if (k != 'the_platform_name') {
                tHead.push(<td key={k}>{menu[k].name}</td>);
                //}
            }
            it.setState({ data: res.data, startTime: formData.start_time, endTime: formData.end_time, tBody: tBody, tHead: tHead });
        }).fail(function () {

        });
        //this.setState({ startTime: day1, endTime: day2 });
    },
    onTest(){
        console.log('fasdfasdasdf');
    },
    render() {

        return (<div>
            <Mod headerName="支付记录">
                <div className="select_input">
                    <form id="select_form">
                        <label>订单ID：</label><input type="text" value="" name="code" ref="code"/>
                        <label>用户昵称或ID：</label><input type="text" id="uid_or_username" value="" name="uid_or_username" ref="uid_or_username"/>
                        <label>付款订单ID：</label><input type="text" value="" name="trans_id" ref="trans_id" />
                        <label>日期：</label><input type="text" value={this.state.startTime} className="has-datepicker" onChange={this.onChange} name="start_time" ref="start_time" /><span>-</span>
                        <input type="text" value={this.state.endTime} className="has-datepicker" name="end_time" onChange={this.onChange} ref="end_time" />
                        <label>付款状态：</label><select name="status" ref="status"><option value="all">全部</option><option>已付款</option><option>未付款</option></select>
                        <input type="button" value="查询" id="select_btn" onClick={this.onSelectDate} />
                        <label></label>
                        <input type="button" className="none-show" value="导出CSV" id="export_btn" onClick={this.exportCSV}/>
                    </form>
                </div>
                <div className="user-info">
                    <table className="detail-table" onClick={this.onTest}>
                        <thead><tr>{this.state.tHead}</tr></thead>
                        <tbody>{this.state.tBody}</tbody>
                    </table>
                    
                </div>
            </Mod>
        </div>);
    }
});
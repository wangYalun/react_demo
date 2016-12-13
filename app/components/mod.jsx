import React from 'react';
import $ from '../utils/datepicker';

var SelectDate = React.createClass({
    getInitialState() {
        var day2 = new Date();
        var day1 = new Date(util.dateDiff(day2, 7));
        return {
            startTime: util.dateFormat(day1),
            endTime: util.dateFormat(day2)
        }
    },
    onSelectDate(e) {
        var days = e.target.dataset.days;
        var startTime = this.state.startTime;
        var endTime = this.state.endTime;
        switch (days) {
            case "0":
                var start = this.refs.startTime.value.trim();
                var end = this.refs.endTime.value.trim();
                if (start&&end) {
                    startTime = start;
                    endTime = end;      
                }
                break;
            default:
                var day2 = new Date();
                var day1 = new Date(util.dateDiff(day2, days));
                startTime = util.dateFormat(day1);
                endTime = util.dateFormat(day2);
        }

        $('#date-select-list').hide();
        this.props.onSelectDate(startTime,endTime);
        this.setState({
            startTime:startTime,
            endTime:endTime
        })
    },
    componentDidMount() {
        $(this.refs.startTime).datepicker({
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
        $(this.refs.endTime).datepicker({
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
    },
    showDateSelecter() {
        console.log('hahsd');
        $('#date-select-list').toggle();
    },
    render() {
        return (<div className="option" id="select_daily_date">
            <div className="date-select js-select" id="date-select" onClick={this.showDateSelecter}>
                <div className="select-head">
                    <span className="start">{this.state.startTime}</span>
                    <span> ~ </span>
                    <span className="end" >{this.state.endTime}</span>
                    <b className="icon pulldown"></b>
                </div>
            </div>
            <ul className="select-list date-select-list none-show" id="date-select-list">
                <li onClick={this.onSelectDate} data-days="60">过去60天</li>
                <li onClick={this.onSelectDate} data-days="30">过去30天</li>
                <li onClick={this.onSelectDate} data-days="7">过去7天</li>
                <li>自选</li>
                <li className="date-def-li" >
                    <div className="date-def">
                        <div>
                            <input className="startTime" ref="startTime" type="text" value="" /> -
                                <input className="endTime" ref="endTime" type="text" value="" />
                        </div>
                        <div>
                            <input type="button" className="btn-cancel" value="取消" onClick={this.showDateSelecter} />
                            <input type="button" className="btn-confirm" value="确定" onClick={this.onSelectDate} data-days="0" />
                        </div>
                    </div>
                </li>
            </ul>
        </div>);
    }
});

var ModHeader = React.createClass({
    render() {
        if (this.props.onSelectDate) {
            return (
                <div className="mod-header">
                    <h4>{this.props.headerName}</h4>
                    <SelectDate onSelectDate={this.props.onSelectDate} />
                </div>);
        } else {
            return (
                <div className="mod-header">
                    <h4>{this.props.headerName}</h4>
                </div>);
        }
    }
});

var ModBody = React.createClass({
    render() {
        return (
            <div className="mod-body">{this.props.children}</div>
        );
    }
});

export default React.createClass({
    render() {
        return <div className="mod">
            <ModHeader {...this.props} />
            <ModBody {...this.props} />
        </div>
    }
});

export { ModHeader, ModBody }
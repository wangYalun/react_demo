
import React from 'react';
import { Tooltip, Icon } from 'antd';
import classnames from 'classnames';

var Content = React.createClass({
    render() {
        return (<div>{this.props.children}</div>);
    }
});

Content.ContentHeader = React.createClass({
    render() {
        const props = this.props.contentObj;
        const tips = <Tooltip title={props.tipsTitle || ""}>
            <Icon type="question-circle-o" />
        </Tooltip>;
        return (<div className="content-header">
            <div className="title-bar"><b>{props.contentName || "默认标题"}</b> {props.tipsTitle && tips}</div>
            {this.props.children}
        </div>);
    }
});
Content.Mod = React.createClass({
    render() {
        const modClassNames=classnames("mod",{"inline-mod":this.props.inline});
        return <div className={modClassNames}>
            <div className="mod-header"><h4>{this.props.modName}</h4></div>
            <div className="mod-body">{this.props.children}</div>
        </div>
    }
});

Content.Mod.Summary = React.createClass({
    render() {
        const summaryData = this.props.summaryData;
        const summaryRateClassNames=classnames('summary','summary-rate',summaryData.rate<0?'summary-rate-desc':"summary-rate-asc");
        const tips=<Tooltip title={summaryData.tipsTitle||""}><Icon type="question-circle-o"/></Tooltip>;
        return <div className="summary-wrap">
            <div className="summary">{summaryData.title} {summaryData.tipsTitle&&tips}</div>
            <div className="summary summary-num">{summaryData.num}</div>
            <div className={summaryRateClassNames}><i className="i-arr"></i>{summaryData.rate}%</div>
        </div>
    }
});

export default Content;



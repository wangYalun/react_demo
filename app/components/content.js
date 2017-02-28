
import React from 'react';
import {Tooltip,Icon} from 'antd';

var Content = React.createClass({
    render() {
        return (<div>{this.props.children}</div>);
    }
});

Content.ContentHeader = React.createClass({
    render() {
        const props = this.props.contentObj;
        const tips= <Tooltip title={props.tipsTitle||""}>
                                <Icon type="question-circle-o" />
                            </Tooltip>;
        return (<div className="content-header">
            <div className="title-bar"><b>{props.contentName||"默认标题"}</b> {props.tipsTitle&&tips}</div>
            {this.props.children}
        </div>);
    }
});
Content.Mod = React.createClass({
    render() {
        return <div className="mod">
            <div className="mod-header"><h4>{this.props.modName}</h4></div>
            <div className="mod-body">{this.props.children}</div>
        </div>
    }
});

export default Content;



import React from 'react';

var Mod=React.createClass({
    render(){
        return <div className="mod">
            <div className="mod-header"><h4>{this.props.modName}</h4></div>
            <div className="mod-body">{this.props.children}</div>
        </div>
    }
});

Mod.Summary=React.createClass({
    render(){
        const summaryData=this.props.summaryData;
        return <div className="summary-wrap">
            <div className="summary">{summaryData.title}</div>
            <div className="summary">{summaryData.num}</div>
            <div className="summary">{summaryData.rate}</div>
        </div>
    }
});

export default Mod;
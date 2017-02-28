import React from 'react';

var Mod=React.createClass({
    render(){
        return <div className="mod">
            <div className="mod-header"><h4>{this.props.modName}</h4></div>
            <div className="mod-body">{this.props.children}</div>
        </div>
    }
});

export default Mod;
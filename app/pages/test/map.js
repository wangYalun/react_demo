import React from 'react';
import Content from '../../components/content';

const { Mod, ContentHeader } = Content;

export default React.createClass({
    componentDidMount() {
        var map = new BMap.Map("map");          // 创建地图实例  
        var point = new BMap.Point(116.404, 39.915);  // 创建点坐标  
        map.centerAndZoom(point, 15);
    },
    loadMapScript() {

    },
    render() {
        return (<div>
            <ContentHeader contentObj={{ contentName: "Baidu Map", tipsTitle: "Hello, it is Baidu Map~" }}>   </ContentHeader>

            <Mod modName="Map Content">
                <div id="map" style={{height:"500px"}}></div>
            </Mod>
        </div>);
    }
});
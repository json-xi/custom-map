import './App.css';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchPlace from './view/CustomTools/SearchPlace';
import CustomTools from './view/CustomTools';
const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;
const SearchContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
`;
function App() {
  const [aMap, setAmap] = useState(null);
  const [aMapInstance, setMapInstance] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    AMapLoader.load({
      key: '0a0b869db7ee8184ce4eca63aaa39a45', //申请好的Web端开发者 Key，调用 load 时必填
      version: '2.0', //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
    })
      .then((AMap) => {
        setAmap(AMap);

        const map = new AMap.Map('container', {
          viewMode: '2d',
          resizeEnable: true, //是否监控地图容器尺寸变化
          mapStyle: 'amap://styles/graffiti',
          WebGLParams: {
            preserveDrawingBuffer: true, // ✅ 保留图像像素，才能截图
          },
        });

        setMapInstance(map);

        // 增加交通图层
        const traffic = new AMap.TileLayer.Traffic({
          autoRefresh: true, //是否自动刷新，默认为false
          interval: 180, //刷新间隔，默认180s
        });
        map.add(traffic); //通过add方法添加图层

        // 增加地图控件
        //放大缩小控件
        AMap.plugin('AMap.ToolBar', function () {
          const toolbar = new AMap.ToolBar({
            position: 'RT',
          }); //缩放工具条实例化
          map.addControl(toolbar); //添加控件
        });
        // 比例尺控件
        AMap.plugin('AMap.Scale', function () {
          const scale = new AMap.Scale();
          map.addControl(scale); //添加控件
        });
        // 鹰眼缩略图
        AMap.plugin('AMap.HawkEye', function () {
          const hawkEye = new AMap.HawkEye();
          map.addControl(hawkEye); //添加控件
        });
        // 旋转倾斜
        AMap.plugin('AMap.ControlBar', function () {
          const controlBar = new AMap.ControlBar({
            position: {
              bottom: '50px',
              left: '20px',
            },
          });
          map.addControl(controlBar); //添加控件
        });
        // 地图类型切换控件
        AMap.plugin('AMap.MapType', function () {
          const mapType = new AMap.MapType({
            defaultType: 0,
            position: {
              top: '10px',
              right: '60px',
            },
          });
          map.addControl(mapType); //添加控件
        });
      })
      .catch((e) => {
        console.error(e); //加载错误提示
      });
  }, []);
  return (
    <>
      <MapContainer id="container"></MapContainer>
      <SearchContainer>
        <CustomTools aMap={aMap} aMapInstance={aMapInstance}></CustomTools>
      </SearchContainer>
    </>
  );
}

export default App;

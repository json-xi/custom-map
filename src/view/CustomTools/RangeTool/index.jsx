import React, { useEffect, useState } from 'react';
import { Button } from 'antd';

const RangeTool = ({ aMap, aMapInstance }) => {
  const [rangeIns, setRangeIns] = useState(null);
  // 测量
  function onRange() {
    if (!rangeIns) {
      return;
    }
    rangeIns.turnOn();
  }

  useEffect(() => {
    if (!aMap) {
      return;
    }
    // 测距
    aMap.plugin('AMap.RangingTool', function () {
      const rangingTool = new aMap.RangingTool(aMapInstance);
      setRangeIns(rangingTool);
      // 可选：设置测距样式
      rangingTool.setOptions({
        strokeColor: '#FF33FF',
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: '#ee2200',
        fillOpacity: 0.3,
        toolTipMarker: {
          offset: new aMap.Pixel(10, 10),
        },
        // endLabel 设置结果文字样式
        endLabel: {
          visible: true,
          color: '#f00',
          fontSize: 14,
        },
      });
    });
  }, [aMap, aMapInstance]);
  return (
    <Button size="large" type="primary" onClick={onRange}>
      RangeTool
    </Button>
  );
};

export default RangeTool;

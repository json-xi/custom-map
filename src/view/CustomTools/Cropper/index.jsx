import React from 'react';
import html2canvas from 'html2canvas';
import { Button } from 'antd';
const Cropper = () => {
  function onCropper() {
    const mapContainer = document.querySelector('#container');
    if (!mapContainer) return;
    html2canvas(mapContainer, {
      useCORS: true, // 允许跨域图片截图（地图瓦片）
      allowTaint: false,
      backgroundColor: null,
      logging: false,
    }).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'map-screenshot.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  }

  return (
    <Button size="large" onClick={onCropper}>
      Cropper
    </Button>
  );
};

export default Cropper;

import RangeTool from './RangeTool';
import SearchPlace from './SearchPlace';
import Cropper from './Cropper';
import { Flex } from 'antd';

const Tools = ({ aMapInstance, aMap }) => {
  return (
    <Flex gap={10} align="center" justify="space-between">
      <SearchPlace aMapInstance={aMapInstance} aMap={aMap}></SearchPlace>
      <RangeTool aMapInstance={aMapInstance} aMap={aMap}></RangeTool>
      <Cropper></Cropper>
    </Flex>
  );
};

export default Tools;

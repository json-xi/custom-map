import { useEffect, useState } from 'react';
import { Input } from 'antd';
const { Search } = Input;
const SearchPlace = ({ aMap, aMapInstance }) => {
  const [loading, setLoading] = useState(false);
  const [serchInstance, setSerchInstance] = useState(null);

  // 搜索
  function onSearch(value) {
    console.log('value', value);

    if (!serchInstance || !value) {
      return;
    }
    setLoading(true);
    serchInstance.search(value);
  }
  useEffect(() => {
    console.log('current', aMap);

    if (!aMap) {
      return;
    }
    // 地点搜索
    aMap.plugin('AMap.PlaceSearch', function () {
      var PlaceSearchOptions = {
        //设置PlaceSearch属性
        city: '杭州', //城市
        type: '', //数据类别
        pageSize: 10, //每页结果数,默认10
        pageIndex: 1, //请求页码，默认1
        extensions: 'base', //返回信息详略，默认为base（基本信息）
        map: aMapInstance,
      };
      const MSearch = new aMap.PlaceSearch(PlaceSearchOptions); //构造PlaceSearch类
      setSerchInstance(MSearch);
      MSearch.on('complete', (res) => {
        setLoading(false);
        console.log('结果', res);
      });
    });
  }, [aMap, aMapInstance]);

  return (
    <Search
      placeholder="input search text"
      onSearch={onSearch}
      enterButton="Search"
      size="large"
      loading={loading}
    />
  );
};

export default SearchPlace;

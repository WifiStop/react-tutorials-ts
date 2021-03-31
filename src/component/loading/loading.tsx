import React from 'react'
import { Spin } from 'antd'
import Loadable  from 'react-loadable';
interface LoaderProps extends Loadable.LoadingComponentProps  {}
const loadingWrapper = {
position:'relative' as any,
  height: '100vh'
}

const loadingSpin = {
  position: 'absolute' as any,
  left: '50%',
  top: '45%',
  transform: 'translate(-50%, -45%)'
}

const Loading:React.FC<LoaderProps> = ()=>{
    return (
        <div style={loadingWrapper}>
          <Spin style={loadingSpin} tip="正在加载中..."></Spin>
        </div>
      )
}
export default Loading



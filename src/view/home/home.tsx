import React, { useEffect, useState } from 'react'
import Style from './home.module.scss'
import { Card, Col, Progress, Radio, Row, Tag } from 'antd';
import { HEAD_BANNER, CHART_OPTION } from './constants'
import $http from '../../utils/http'
import { ApiUrl } from '../../share/enum/Api.enum';
import { home } from './home.interface'
import { EllipsisOutlined, FlagOutlined, PoundOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import * as echarts from 'echarts'

const bannerInitialData: home.headerBannerType = {
  visit: [0, '0万'],
  download: [0, '0%'],
  income: [0, '***'],
  activeUser: [0, '0%']
}
const showIcon = (type: string) => {
  switch (type) {
    case 'Flag':
      return <FlagOutlined />
    case 'Smile':
      return <SmileOutlined />
    case 'Pound':
      return <PoundOutlined />
    case 'User':
      return <UserOutlined />
    default:
      return <EllipsisOutlined />
  }
}
const echartsInitialData = {
  averageVisits: [],
  download: [],
  monthDownload: 0,
  monthIncome: 0,
  monthVisit: 0,
  visit: []
}
const HomePage: React.FC<void> = (props) => {
  const [headerBanner, setHeaderBanner] = useState<home.headerBannerType>(bannerInitialData)
  const [chart, setChart] = useState<echarts.ECharts | null>(null)
  const [chartData, setEhartData] = useState<home.echartsDataType>(echartsInitialData)
  const getCount = async () => {
    let res = await $http.get<home.headerBannerType>(ApiUrl.getCount)
    setHeaderBanner(res.data)
  }
  const initCharts = () => {
    let echart = document.getElementById('chart') as HTMLDivElement
    setChart(echarts.init(echart))
    if (!chart) return
    chart!.showLoading('default', { color: '#5FB878' })
    $http.get<home.echartsDataType>('getChartData').then(res => {
      let data = res.data
      setEhartData(data)
      CHART_OPTION.series[0].data = data.visit
      CHART_OPTION.series[1].data = data.download
      CHART_OPTION.series[2].data = data.averageVisits
      console.log(data)
      chart.setOption(CHART_OPTION as echarts.EChartOption)
      chart.hideLoading()
    }).catch(() => {
      chart!.hideLoading()
    })
  }
  useEffect(() => {
    getCount()
    initCharts()
  }, [chart])

  return (
    <div className={Style['homePage-box']}>
      <div className={Style['card-box']}>
        {
          HEAD_BANNER.map(item => {
            return <Card className={Style.card} title={item.title} key={item.key} extra={<Tag color={item.tagColor}>{item.tagValue}</Tag>}>
              <p>{headerBanner[item.aliasCurrency][0]}</p>
              <div className={Style['data-details']}>
                <span>{item.desc}</span>
                <div >
                  <span style={{ 'marginRight': '8px' }}>{item.count}</span>
                  <i>{showIcon(item.icon)}</i>
                </div>
              </div>
            </Card>
          })
        }

      </div>
      <div className={Style['echarts-box']}>
        <Card title="访问量" extra={
          <Radio.Group size="small" className="fs-12"  >
            <Radio.Button value="1">今年</Radio.Button>
            <Radio.Button value="0">去年</Radio.Button>
          </Radio.Group>
        }>
          <div className={Style['views-box']}>
            <div id="chart" className={Style.chart}></div>
            <div className={Style.progress}>
              <div className="p15">
                <p className={`pb-10 fs-20 text-grey-6 ${Style['chart-title']}`}>月访问数</p>
                <p>同上期增长</p>
                <Progress percent={chartData!.monthVisit} strokeWidth={12} />
              </div>
              <div className="p15">
                <p className={`pb-10 fs-20 text-grey-6 ${Style['chart-title']}`}>月下载数</p>
                <p>同上期增长</p>
                <Progress percent={chartData!.monthDownload} strokeWidth={12} />
              </div>
              <div className="p15">
                <p className={`pb-10 fs-20 text-grey-6 ${Style['chart-title']}`}>月收入</p>
                <p>同上期增长</p>
                <Progress percent={chartData!.monthIncome} strokeWidth={12} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
export default HomePage



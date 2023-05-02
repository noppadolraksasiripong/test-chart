import { EChartsOption } from '@/lib/ReactECharts'
import dynamic from 'next/dynamic'
const ReactECharts = dynamic(() => import('@/lib/ReactECharts'), { ssr: false })
import { memo, useState } from 'react'



const ECharts = () => {
  // const myChart = Echarts.init(chartDom);
  let xAxisData = []
  let data1 = []
  let data2 = []
  let data3 = []
  let data4 = []
  for (let i = 0; i < 10; i++) {
    xAxisData.push('Class' + i)
    data1.push(+(Math.random() * 2).toFixed(2))
    data2.push(+(Math.random() * 5).toFixed(2))
    data3.push(+(Math.random() + 0.3).toFixed(2))
    data4.push(+Math.random().toFixed(2))
  }

  const data = [
    {
      name: 'Solicitados',
      value: 18203,
    },
    {
      name: 'Aprobados',
      value: 12000,
    },
    {
      name: 'Aceptados',
      value: 13203,
    },
    {
      name: 'Cerrados',
      value: 8203,
    },
    {
      name: 'Negados',
      value: 1203,
    },
    {
      name: 'En revision',
      value: 6203,
    },
    {
      name: 'En mora',
      value: 2203,
    },
  ]

  const option: EChartsOption = {
    brush: {
      toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
      brushType: 'rect',
      xAxisIndex: 0,
      throttleType: 'debounce',
      throttleDelay: 300,
    },
    xAxis: {
      data
    },
    yAxis: {},
    grid: {
      bottom: 100
    },
    series: [
      {
        type: 'bar',
        data: [23, 24, 18, 25, 27, 28, 25]
      }
    ]
  }

  function onBrushSelected(event: any) {
    let brushed: string[] = []
    const brushComponent = event.batch[0]
    for (let sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
      const rawIndices = brushComponent.selected[sIdx].dataIndex
      brushed.push(rawIndices.join(', '))
    }
    console.log(brushed)
  };

  return (
    <div id='echarts' >
      <ReactECharts
        option={option}
        onEvents={{
          brushSelected: onBrushSelected
        }}
        height={300}
      ></ReactECharts>
    </div >
  )
}

export default memo(ECharts)

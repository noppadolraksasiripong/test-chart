
import { memo } from 'react'
import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
const Apexcharts = () => {
  const options: ApexOptions = {

    chart: {
      type: 'bar',
      height: 350,
      selection: {
        enabled: true,
        fill: {
          color: "#24292e",
          opacity: 0.1
        }
      },
      zoom: {
        enabled: false,
      },
      events: {
        selection: function (chart, e) {
          console.log(chart)
        }
      }

    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      }
    },
    xaxis: {
      // type: 'numeric',
      // min: 0,
      // max: 10,
    },
    yaxis: {
      min: 0,
      max: 10,
    },

  }
  const series = [
    {
      name: 'y',
      data: [[1, 1], [2, 3], [3, 1], [4, 2], [5, 5], [6, 2], [7, 1]]
    }
  ]
  return (
    <Chart options={options} series={series} type='bar' width={500} height={400}></Chart>
  )
}
export default memo(Apexcharts)

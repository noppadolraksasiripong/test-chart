
import Apexcharts from '@/components/Apexcharts'
import Echarts from '@/components/Echarts'

export default function Home() {
  return (
    <div className="container">
      <div id='apexcharts'>
        <Apexcharts />
      </div>
      <div id="echarts">
        <Echarts />
      </div>
    </div>
  )
}

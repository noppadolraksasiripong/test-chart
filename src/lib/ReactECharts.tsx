import { useRef, useEffect, CSSProperties } from "react"
import { CanvasRenderer } from "echarts/renderers"
import { init, getInstanceByDom, use } from "echarts/core"
import { HeatmapChart, ScatterChart, LineChart, GraphChart, BarChart } from "echarts/charts"
import {
  LegendComponent,
  GridComponent,
  TooltipComponent,
  ToolboxComponent,
  VisualMapComponent,
  TitleComponent,
  DataZoomComponent,
  BrushComponent
} from "echarts/components"
import type { ECharts, ComposeOption, SetOptionOpts, ElementEvent } from "echarts/core"
import type {
  BarSeriesOption,
  LineSeriesOption,
  ScatterSeriesOption,
} from "echarts/charts"
import type { TitleComponentOption, GridComponentOption, BrushComponentOption } from "echarts/components"
// Register the required components
use([
  LegendComponent,
  ScatterChart,
  LineChart,
  BarChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  ToolboxComponent, // A group of utility tools, which includes export, data view, dynamic type switching, data area zooming, and reset.
  DataZoomComponent, // Used in Line Graph Charts
  CanvasRenderer, // If you only need to use the canvas rendering mode, the bundle will not include the SVGRenderer module, which is not needed.
  BrushComponent
])

// Combine an Option type with only required components and charts via ComposeOption
export type EChartsOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | GridComponentOption
  | ScatterSeriesOption
  | BrushComponentOption
>

export interface ReactEChartsProps {
  option: EChartsOption
  style?: CSSProperties
  settings?: SetOptionOpts
  loading?: boolean
  theme?: "light" | "dark"
  onEvents?: Record<string, (...args: unknown[]) => boolean | void>
  height?: number
  width?: number | string
}

export default function ReactECharts({
  option,
  style,
  settings,
  loading,
  theme,
  onEvents,
  height,
  width
}: ReactEChartsProps): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null)



  useEffect(() => {
    // Initialize chart
    let chart: ECharts | undefined
    if (chartRef.current !== null) {
      chart = init(chartRef.current, theme)
    }

    // Add chart resize listener
    // ResizeObserver is leading to a bit janky UX
    function resizeChart() {
      chart?.resize()
    }
    window.addEventListener("resize", resizeChart)

    // Return cleanup function
    return () => {
      chart?.dispose()
      window.removeEventListener("resize", resizeChart)
    }
  }, [theme])

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)
      chart?.setOption(option, settings)
      if (onEvents) {
        Object.entries(onEvents).forEach(([key, val]) => {
          return chart?.on(key, val)
        })
      }
    }
  }, [onEvents, option, settings, theme]) // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)
      loading === true ? chart?.showLoading() : chart?.hideLoading()
    }
  }, [loading, theme])


  return <div ref={chartRef} style={{ width: width ?? "100%", height: height ?? 300, minHeight: height ?? 300, ...style }} />
}

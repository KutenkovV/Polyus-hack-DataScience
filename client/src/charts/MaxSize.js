import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartValueAxis,
  ChartValueAxisItem,
  ChartTitle,
  ChartLegend,
} from "@progress/kendo-react-charts";

export const series = [
  {
    data: [120, 233, 108, 376, 299],
  },
];

const MaxSize = (props) => {
  return (
    <Chart pannable zoomable style={{ height: 350 }}>
      <ChartTitle text="Максимальный размер частиц" />
      <ChartLegend position="top" orientation="horizontal" />
      <ChartValueAxis>
        <ChartValueAxisItem title={{ text: "ММ" }} min={100} max={400} />
      </ChartValueAxis>
      <ChartSeries>
        {series.map((item, idx) => (
          <ChartSeriesItem
            key={idx}
            type="line"
            tooltip={{ visible: true }}
            data={item.data}
          />
        ))}
      </ChartSeries>
    </Chart>
  );
};

export default MaxSize;

import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartValueAxis,
  ChartValueAxisItem,
  ChartTitle,
  ChartLegend,
} from '@progress/kendo-react-charts';


export interface IMaxSizeProps {
  data: number[][]
}

const MaxSize: React.FC<IMaxSizeProps> = ({ data }) => {
  return (
    <Chart pannable zoomable style={{ height: 350 }}>
      <ChartTitle text="Максимальный размер частиц" />
      <ChartLegend position="top" orientation="horizontal" />
      <ChartValueAxis>
        <ChartValueAxisItem title={{ text: 'ММ' }} min={100} max={400} />
      </ChartValueAxis>
      <ChartSeries>
        {data.map((item, idx) => (
          <ChartSeriesItem key={idx} type="line" tooltip={{ visible: true }} data={item} />
        ))}
      </ChartSeries>
    </Chart>
  );
};

export default MaxSize;

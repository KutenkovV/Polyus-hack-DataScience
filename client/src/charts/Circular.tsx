import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels,
} from '@progress/kendo-react-charts';
import { COLORS } from './colors';

interface ICircularProps {
  data: number[]
}

const Circular: React.FC<ICircularProps> = ({ data }) => {
  return (
    <Chart style={{ height: 350 }}>
      <ChartLegend visible={true} />
      <ChartSeries>
        <ChartSeriesItem
          type="donut"
          data={
            data
              ? data.map((p, idx) => ({
                status: idx + 1,
                value: p.toPrecision(2),
                color: COLORS[idx % Object.keys(COLORS).length],
              }))
              : []
          }
          categoryField="status"
          field="value">
          <ChartSeriesLabels color="#fff" background="none" />
        </ChartSeriesItem>
      </ChartSeries>
    </Chart>
  );
};

export default Circular;

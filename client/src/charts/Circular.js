import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels,
} from "@progress/kendo-react-charts";
import { COLORS } from "./colors";

const applicationsStatus = [
  {
    status: "14%",
    value: 14,
    color: COLORS.one,
  },
  {
    status: "13%",
    value: 13,
    color: COLORS.two,
  },
  {
    status: "11%",
    value: 11,
    color: COLORS.three,
  },
  {
    status: "4%",
    value: 4,
    color: COLORS.four,
  },
  {
    status: "17%",
    value: 17,
    color: COLORS.five,
  },
  {
    status: "22%",
    value: 22,
    color: COLORS.six,
  },
  {
    status: "19%",
    value: 19,
    color: COLORS.seven,
  },
];

const Circular = (props) => {
  return (
    <Chart style={{ height: 350 }}>
      <ChartLegend visible={true} />
      <ChartSeries>
        <ChartSeriesItem
          type="donut"
          data={applicationsStatus}
          categoryField="status"
          field="value"
        >
          <ChartSeriesLabels
            color="#fff"
            background="none"
          />
        </ChartSeriesItem>
      </ChartSeries>
    </Chart>
  );
};

export default Circular;

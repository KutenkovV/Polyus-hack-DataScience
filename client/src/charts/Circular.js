import {
    Chart,
    ChartTitle,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem,
    ChartSeriesLabels,
  } from "@progress/kendo-react-charts";
  import { COLORS } from "./colors";
  
  const applicationsStatus = [
    {
   status: "1",
   value: 14,
   color: COLORS.one,
    },
    {
   status: "2",
   value: 14,
   color: COLORS.two,
    },
    {
   status: "3",
   value: 10,
   color: COLORS.three,
    },
    {
   status: "4",
   value: 4,
   color: COLORS.four,
    },
    {
    status: "5",
    value: 17,
    color: COLORS.five,
    },
    {
        status: "6",
        value: 22,
        color: COLORS.six,
    },
    {
        status: "7",
        value: 19,
        color: COLORS.seven,
    },
  ];
  
  const labelContent = e => e.category;
  
  const Circular = props => {
    return (
   <Chart>
   <ChartTitle text="" />
   <ChartLegend visible={false} />
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
   content={labelContent}
   />
   </ChartSeriesItem>
   </ChartSeries>
   </Chart>
    );
  };
  
  export default Circular;
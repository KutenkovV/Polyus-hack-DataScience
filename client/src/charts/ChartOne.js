import React from "react";
import {Bar} from "react-chartjs-2";

const ChartOne = () => {
    return <div>
        <Bar 
            data = {{
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']
            }}
            height = {350}
            width = {350}
        />
    </div>
}

export default ChartOne;
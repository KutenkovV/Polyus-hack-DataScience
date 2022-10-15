import "../pages/main.css";
import Video from "../components/video";
import Analysis from "../components/analysis";
import { useEffect, useState } from "react";
import "@progress/kendo-theme-material/dist/all.css";
import Circular from "../charts/Circular";
import MaxSize from "../charts/MaxSize";
import ChartOne from "../charts/ChartOne";

import io from "socket.io-client";
// const socket = io("http://127.0.0.1:5000/");

const Main = () => {
  const [analysis, setAnalysis] = useState([]);
  const [maxSize, setMaxSize] = useState([]);

  // useEffect(() => {
  //   // В таблицу с гранулометрическим анализом
  //   socket.on('Analysis', (data) => {
  //     setAnalysis(data);
  //   })

  //   // В график "Максимальный размер частиц"
  //   socket.on('MaxSize', (data) => {
  //     setMaxSize(data);
  //   })
  // }, []);

  return (
    <>
      <div className="m-1 d-flex">
        <div className="col-6 content_info">
          <Video />
          <MaxSize data={maxSize} />
        </div>

        <div className="d-flex ms-3 col content_info">
          <div className="d-block col">
            <Analysis data={analysis} />
            <Circular />
            {/* <ChartOne /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;

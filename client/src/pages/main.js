import "../pages/main.css";
import Video from "../components/video";
import Analysis from "../components/analysis";

import "@progress/kendo-theme-material/dist/all.css";
import Circular from "./../charts/Circular";
import MaxSize from "./../charts/MaxSize";
import ChartOne from "../charts/ChartOne";

function main() {
  return (
    <>
      <div className="m-1 d-flex">
        <div className="col-6 content_info">
          <Video />
          <MaxSize />
        </div>

        <div className="d-flex ms-3 col content_info">
          <div className="d-block col">
            <Analysis />
            <Circular />
            {/* <ChartOne /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default main;

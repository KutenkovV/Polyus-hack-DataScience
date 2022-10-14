import Video from "../components/video";
import Analysis from "../components/analysis";

import "@progress/kendo-theme-material/dist/all.css";
import Circular from "./../charts/Circular";
import MaxSize from "./../charts/MaxSize";

function name() {
  document.title = "Главная страница";

  return (
    <>
      <div className="m-3">
        <div className="d-flex">
          <Video />
          <Analysis />
        </div>
        <div className="d-flex">
          <div>
            <MaxSize />
          </div>
          <div>
            <Circular />
          </div>
        </div>
      </div>
    </>
  );
}

export default name;

import Video from "../components/video";
import Analysis from "../components/analysis";

import "@progress/kendo-theme-material/dist/all.css";
import Circular from "./../charts/Circular";
import MaxSize from "./../charts/MaxSize";

function name() {
  document.title = "Страница оператора";

  return (
    <>
      <div className="m-3 d-flex">
        <div className="col-5">
          <Video />
        </div>
        <div className="d-flex col-7">
          <div className="ms-3 col">
            <Analysis />
            <MaxSize />
          </div>
          <div className="col">
            <Circular />
          </div>
        </div>
      </div>
    </>
  );
}

export default name;

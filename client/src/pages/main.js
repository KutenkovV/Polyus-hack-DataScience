import Video from "../components/video";
import Analysis from "../components/analysis";

import "@progress/kendo-theme-material/dist/all.css";
import Circular from "./../charts/Circular";
import MaxSize from "./../charts/MaxSize";

function name() {
  document.title = "Главная страница";

  return (
    <>
      <div className="d-flex">
        <div>
          <Video />
          <MaxSize />
        </div>
        <div>
          <Analysis />
          <Circular />
        </div>
        
      </div>
    </>
  );
}

export default name;

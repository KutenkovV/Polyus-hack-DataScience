import Video from "../components/video";
import Analysis from "../components/analysis";
import MaxSize from "../charts/MaxSize";

function name() {
  document.title = "Главная страница";

  return (
    <>
      <div className="d-flex">
        <div>
          <Video />
        </div>
        <div>
          <Analysis />
          {/* <MaxSize /> */}
        </div>
        
      </div>
    </>
  );
}

export default name;

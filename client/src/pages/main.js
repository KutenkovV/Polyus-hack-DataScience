import Video from "../components/video";
import Analysis from "../components/analysis";

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
        </div>
      </div>
    </>
  );
}

export default name;

import "../components/video.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Video = () => {
  const [data, setData] = useState();

  useEffect(() => {
    console.log("Axios is worked!");
    axios
      .get("http://127.0.0.1:5000/get-image")
      .then((response) => {
        setData(response.data.image);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    // <video controls width="100%" height="50%">
    //   <source src="/" type="video/mp4" />
    // </video>

    <img width="100%" src={`data:image/png;base64, ${data}`} alt="Red dot" />
  );
};

export default Video;

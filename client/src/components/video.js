import "../components/video.css";
import { useEffect, useState } from 'react';


const Video = () => {
  const axios = require('axios').default;
  const [data, setData] = useState();
  const handleSub = async () => {
  };

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/get-image')
    .then(function (response) {
      setData(response.data.image);
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
    });
  } , []);

  
  return (
    // <video controls width="100%" height="50%">
    //   <source src="/" type="video/mp4" />
    // </video>
    
    <img width="100%" onChange={handleSub} src={`data:image/png;base64, ${data}`} alt="Red dot" />
  );
};

export default Video;

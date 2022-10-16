import '../pages/main.css';
import Video from '../components/video';
import Analysis from '../components/analysis';
import { useEffect, useState } from 'react';
import '@progress/kendo-theme-material/dist/all.css';
import Circular from '../charts/Circular';
import MaxSize from '../charts/MaxSize';
import ChartOne from '../charts/ChartOne';
import axios from 'axios';

import io from 'socket.io-client';
const socket = io('http://127.0.0.1:5000/');

const Main = () => {
  // Для сокетов если хоть кто-то сделает их на бэке блин
  // const [analysis, setAnalysis] = useState([]);
  // const [maxSize, setMaxSize] = useState([]);
  const [propertyes, setPropertyes] = useState();
  const [img, setImg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('http://127.0.0.1:5000/get-image')
      .then((response) => {
        setIsLoading(false);

        setPropertyes(Object.values(response.data.propertyes));
        setImg(response.data.image);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          {isLoading ? (
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          ) : (
            <>
              <Video data={img} />
              <MaxSize data={propertyes} />
            </>
          )}
        </div>

        <div className="d-flex ms-3 col content_info">
          <div className="d-block col">
            {isLoading ? (
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            ) : (
              <>
                <Analysis propertyes={propertyes} />
                <Circular propertyes={propertyes} />
              </>
            )}
            {/* <ChartOne /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;

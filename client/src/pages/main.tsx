import '../pages/main.css';
import Video from '../components/video';
import Analysis from '../components/analysis';
import { useEffect, useState } from 'react';
import '@progress/kendo-theme-material/dist/all.css';
import Circular from '../charts/Circular';
import MaxSize from '../charts/MaxSize';
import ChartOne from '../charts/ChartOne';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchData } from '../store/dataSlice/dataSlice';
import { LoadingStatuses } from '../types/loadingStatuses';

const Main: React.FC = () => {
  // Для сокетов если хоть кто-то сделает их на бэке блин
  // const [analysis, setAnalysis] = useState([]);
  // const [maxSize, setMaxSize] = useState([]);

  const dispatch = useAppDispatch();
  const { image, propertyes, status } = useAppSelector((state) => state.data);


  useEffect(() => {
    dispatch(fetchData())
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
          {status === LoadingStatuses.PENDING ? (
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          ) : status === LoadingStatuses.REJECTED ?
            (
              <div className="alert alert-danger" role="alert">
                Ошибка загрузки
              </div>) : (
              <>
                <Video data={image} />
                <MaxSize data={propertyes} />
              </>
            )}
        </div>

        <div className="d-flex ms-3 col content_info">
          <div className="d-block col">
            {status === LoadingStatuses.PENDING ? (
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            ) : status === LoadingStatuses.REJECTED ?
              (
                <div className="alert alert-danger" role="alert">
                  Ошибка загрузки
                </div>
              )
              : (
                <>
                  <Analysis propertyes={propertyes} />
                  <Circular propertyes={propertyes} />
                </>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;

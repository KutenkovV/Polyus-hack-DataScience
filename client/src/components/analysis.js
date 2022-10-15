import "../components/analysis.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

const Analysis = ({ data }) => {
  const [dataa, setData] = useState([]);

  useEffect(() => {
    setData([data]);
  }, []);

  return (
    <>
      <div>
        <label className="form-label">Введите размер негабарита</label>
        <input
          style={{ width: "50%" }}
          className="form-control"
          type="number"
          min="0"
          step="1"
        ></input>
      </div>
      <div className="pt-2">
        <label className="form-label">Гранулометрический состав руды</label>
        <table className="table">
          <thead>
            <tr>
              <th>№</th>
              <th>Классы крупности, мм</th>
              <th>Выход по классу, %</th>
            </tr>
          </thead>
          <tbody>
            {/* Не придумал как другие атрибуты выводить по колонкам */}
            {/* {dataa.map((item) => (
              <tr>
                <td>{item.propertyes}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Analysis;

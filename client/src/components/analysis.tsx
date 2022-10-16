import '../components/analysis.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

interface IAnalysisProps {
  data: number[]
}

const Analysis: React.FC<IAnalysisProps> = ({ data }) => {
  console.log(data)
  const all = data.reduce((all, p) => (all += p), 0);
  return (
    <>
      <div>
        <label className="form-label">Введите размер негабарита</label>
        <input
          style={{ width: '50%' }}
          className="form-control"
          type="number"
          min="0"
          step="1"></input>
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
            {data &&
              data.map((property, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{property}</td>
                  <td> {((property / all) * 100).toFixed(2)}%</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Analysis;

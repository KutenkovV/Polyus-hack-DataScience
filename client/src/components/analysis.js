import '../components/analysis.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Analysis = () => {
  return (
    <>
      <div>
        <label className="form-label">Введите размер негабарита</label>
        <input className="form-control" type="number" min="0" step="1"></input>
      </div>
      <div className="pt-2">
        <label className="form-label">Гранулометрический состав руды</label>
        <table className="table">
          <thead>
            <tr>
              <th>Легенда</th>
              <th>№</th>
              <th>Классы крупности, мм</th>
              <th>Выход по классу, %</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="box_1" />
              </td>
              <td>1</td>
              <td>более 250</td>
              <td>с бэка получаем</td>
            </tr>
            <tr>
              <td>
                <div className="box_2" />
              </td>
              <td>2</td>
              <td>от 150 до 250</td>
              <td>с бэка получаем</td>
            </tr>
            <tr>
              <td>
                <div className="box_3" />
              </td>
              <td>3</td>
              <td>от 100 до 150</td>
              <td>с бэка получаем</td>
            </tr>
            <tr>
              <td>
                <div className="box_4" />
              </td>
              <td>4</td>
              <td>от 80 до 100</td>
              <td>с бэка получаем</td>
            </tr>
            <tr>
              <td>
                <div className="box_5" />
              </td>
              <td>5</td>
              <td>от 70 до 80</td>
              <td>с бэка получаем</td>
            </tr>
            <tr>
              <td>
                <div className="box_6" />
              </td>
              <td>6</td>
              <td>от 40 до 70</td>
              <td>с бэка получаем</td>
            </tr>
            <tr>
              <td>
                <div className="box_7" />
              </td>
              <td>7</td>
              <td>от 0 до 40</td>
              <td>с бэка получаем</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Analysis;

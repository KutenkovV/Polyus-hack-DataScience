import "../components/analysis.css";

const Analysis = () => {
  return (
    <>
      <p>Гранулометрический состав руды</p>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Классы крупности, мм</th>
            <th>Выход класса, %</th>
            <th>Легенда</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>более 250</td>
            <td>с бэка получаем</td>
            <td>
              <div className="box_1" />
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>от 150 до 250</td>
            <td>с бэка получаем</td>
            <td>
              <div className="box_2" />
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>от 100 до 150</td>
            <td>с бэка получаем</td>
            <td>
              <div className="box_3" />
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>от 80 до 100</td>
            <td>с бэка получаем</td>
            <td>
              <div className="box_4" />
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>от 70 до 80</td>
            <td>с бэка получаем</td>
            <td>
              <div className="box_5" />
            </td>
          </tr>
          <tr>
            <td>6</td>
            <td>от 40 до 70</td>
            <td>с бэка получаем</td>
            <td>
              <div className="box_6" />
            </td>
          </tr>
          <tr>
            <td>7</td>
            <td>от 0 до 40</td>
            <td>с бэка получаем</td>
            <td>
              <div className="box_7" />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Analysis;

import './ParkedCars.css';
import { Button } from 'antd';
import {ROMAINIAN_LOCALE} from "../../constants/locale";

export const ParkedCars = ({ cars, onCarExit }) => (
  <div className="parkedCarsWrapper">
    {cars.map(({ plateNo, timeArrive }) => (
      <div key={`${plateNo} - ${timeArrive}`} className="parkedCars">
        <span className="parkedCar">{plateNo}</span>
        <span className="parkedCar">
          {`${timeArrive.toLocaleDateString(ROMAINIAN_LOCALE)} 
          ${timeArrive.toLocaleTimeString(ROMAINIAN_LOCALE)}`}
        </span>
        <Button type="primary" onClick={onCarExit(plateNo)}>
          Exit
        </Button>
      </div>
    ))}
  </div>
);

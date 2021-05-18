import { useState, useCallback } from 'react';
import { Button } from 'antd';
import { AddCar } from './features/parking/AddCar';
import { ParkedCars } from './features/parking/ParkedCars';
import { ParkingSummary } from './features/parking/ParkingSummary';

import './App.css';

const MAX_CARS_PARKED = 10;

function App() {
  const [shouldShowAddCar, setShouldShowAddCar] = useState(false);
  const [selectedCar, setSelectedCar] = useState(undefined);
  const [cars, setCars] = useState([
    {
      plateNo: 'B947URS',
      timeArrive: new Date(Date.now() - 864e5), //TODO: UTC FTW
    },
  ]);

  const onAddCar = useCallback(
    (plateNo) => setCars(cars.concat({ plateNo, timeArrive: new Date() })),
    [cars]
  );

  const onCarExit = useCallback(
    (plateNo) => () => {
      const leavingCar = cars.find((car) => car.plateNo === plateNo);
      setSelectedCar(leavingCar);
    },
    [cars]
  );

  const onSummaryClose = useCallback(() => {
    setSelectedCar(undefined);
  }, []);

  const onParkingPay = useCallback(
    (plateNo, parkingFee) => {
      console.log(plateNo, parkingFee);
      const newCarsList = cars.filter((car) => car.plateNo !== plateNo);

      setCars(newCarsList);
    },
    [cars]
  );

  const onAddCarClick = useCallback(() => {
    setShouldShowAddCar(true);
  }, []);

  const onCloseAddCarClick = useCallback(() => {
    setShouldShowAddCar(false);
  }, []);

  return (
    <div className="App">
      <Button
        disabled={cars.length >= MAX_CARS_PARKED}
        onClick={onAddCarClick}
        type="primary"
      >
        Add Car
      </Button>

      <ParkedCars cars={cars} onCarExit={onCarExit} />

      <AddCar
        onClose={onCloseAddCarClick}
        onSubmit={onAddCar}
        isOpen={shouldShowAddCar && cars.length <= MAX_CARS_PARKED}
      />

      <ParkingSummary
        isOpen={!!selectedCar}
        onClose={onSummaryClose}
        car={selectedCar}
        onPay={onParkingPay}
      />
    </div>
  );
}

export default App;

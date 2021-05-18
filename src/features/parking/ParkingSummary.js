import { Button, Drawer } from 'antd';
import { useCallback, useMemo } from 'react';
import { HAS_FIRST_HOUR_FEE, HOUR_FEE } from '../../constants/parkingFees';
import { ROMAINIAN_LOCALE } from '../../constants/locale';

const getHours = (milliseconds) => {
  const millisecondsAsNumber = parseFloat(milliseconds);

  if (Number.isNaN(millisecondsAsNumber)) {
    return 0;
  }

  //TODO: extract formula
  const hours = millisecondsAsNumber / (1000 * 60 * 60);

  return Math.ceil(hours);
};

export const ParkingSummary = ({ car, onClose, isOpen, onPay }) => {
  //TODO: fix this
  const { plateNo = '', timeArrive = '' } = car || {};

  const leaveDate = useMemo(() => new Date(), [plateNo]);

  const carStay = useMemo(
    () => getHours(leaveDate - timeArrive),
    [timeArrive, leaveDate]
  );

  const parkingFee = useMemo(
    () => (HAS_FIRST_HOUR_FEE ? (carStay + 1) * HOUR_FEE : carStay * HOUR_FEE),
    [carStay]
  );

  const onPayButtonClicky = useCallback(() => {
    onPay(plateNo, parkingFee);
    onClose();
  }, [onPay, onClose, parkingFee, plateNo]);

  //TODO: also this one shoudl be optimised
  if (!car) {
    return null;
  }

  return (
    <Drawer
      title="Parking summary"
      onClose={onClose}
      visible={isOpen}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={onPayButtonClicky} type="primary">
            Pay
          </Button>
        </div>
      }
    >
      {`
          Car with plate number: ${plateNo} 
          has arrived on ${timeArrive.toLocaleDateString(ROMAINIAN_LOCALE)} 
          at ${timeArrive.toLocaleTimeString(ROMAINIAN_LOCALE)} 
          and leaves on ${leaveDate.toLocaleDateString(ROMAINIAN_LOCALE)} 
          at ${leaveDate.toLocaleTimeString(ROMAINIAN_LOCALE)} 
          Total parking time is: ${carStay} hour(s) 
          which means the parking fee is: ${parkingFee}$     
      `}
    </Drawer>
  );
};

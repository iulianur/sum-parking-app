import { useState, useCallback } from 'react';
import { Drawer, Form, Button, Col, Row, Input } from 'antd';
import { isValidRoPlateNumber } from '../../validators/plateNumbers';

// TODO: add proptypes
// TODO: add duplicate cars validation
export const AddCar = ({ isOpen, onClose, onSubmit }) => {
  const [form] = Form.useForm();
  const [isPlateNoValid, setIsPlateNoValid] = useState(true);

  const onPlateNumberChange = useCallback((e) => {
    setIsPlateNoValid(true);
  }, []);

  const onFormSubmit = useCallback(() => {
    const { plateNo } = form.getFieldsValue();

    if (!isValidRoPlateNumber(plateNo)) {
      setIsPlateNoValid(false);
      return;
    }

    onSubmit(plateNo.toUpperCase());
    onClose();
  }, [form, onSubmit, onClose]);

  const getPlateNoValidationStatus = useCallback(
    (isValidPlateNoParkedCars) => (isValidPlateNoParkedCars ? '' : 'error'),
    []
  );

  const getPlateNoValidationText = useCallback(
    (isValidPlateNoParkedCars) =>
      isValidPlateNoParkedCars
        ? ''
        : 'Please enter a valid vehicle plate number',
    []
  );

  return (
    <Drawer
      title="Add some car"
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
          <Button onClick={onFormSubmit} type="primary">
            Submit
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="plateNo"
              label="Vehicle Plate Number"
              validateStatus={getPlateNoValidationStatus(isPlateNoValid)}
              help={getPlateNoValidationText(isPlateNoValid)}
            >
              <Input
                onChange={onPlateNumberChange}
                style={{ width: '100%' }}
                placeholder="Vehicle Plate Number"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

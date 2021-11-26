import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Select from 'react-select';
import {
  createDepartment,
  updateDepartment,
} from '../../Services/DepartmentService';
import { getAllLocations } from '../../Services/LocationsService';
import { getAllRestaurants } from '../../Services/RestaurantService';
import {
  addDepartmentSchema,
  editDepartmentSchema,
} from '../../Validators/DepartmentValidator';
import CustomButton from '../../Components/CustomerButton/index';

const initialValues = {
  departmentName: '',
  locationIds: [],
  restaurantId: '',
};

const DepartmentFormModal = ({
  toggleDepartmentFormModal,

  handleSubmit,
}) => {
  const [departName, setdepartName] = useState('');
  return (
    <Modal
      show={true}
      onHide={() => {
        toggleDepartmentFormModal(false);
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {'Create Department'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="departmentName">
            <Form.Label>Department Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter department name"
              name="departmentName"
              value={departName}
              onChange={(ev) => setdepartName(ev.target.value)}
              //   isInvalid={!!errors.departmentName && touched.departmentName}
              //   onChange={handleChange}
              //   onBlur={handleBlur}
            />
          </Form.Group>

          <div className="text-right mt-3">
            {/* <Button className="my-4" variant="primary" type="submit">
              {'Add'}
            </Button> */}
            <CustomButton
              title={`  Add `}
              type="primary"
              onClick={() => handleSubmit(departName)}
              disabled={departName.length === 0}
            >
              Save
            </CustomButton>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default DepartmentFormModal;

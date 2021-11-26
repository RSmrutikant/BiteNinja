import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { createLocation, updateLocation } from "../../Services/LocationsService";
import { getAllRestaurants } from "../../Services/RestaurantService";
import { addLocationSchema, editLocationSchema } from "../../Validators/LocationValidator";

const initialValues = {
    locationName: '',
    locationAddress: '',
    restaurantId: ''
};

const LocationFormModal = ({ toggleLocationFormModal, createLocationSuccess, selectedLocationDetailsState }) => {

    const [restaurants, setRestaurants] = useState([]);

    const formik = useFormik({
        initialValues,
        validationSchema: selectedLocationDetailsState && Object.keys(selectedLocationDetailsState).length ? editLocationSchema : addLocationSchema,
        onSubmit: async () => {
            selectedLocationDetailsState && Object.keys(selectedLocationDetailsState).length ? editLocation() : addLocation();
        }
    });

    const { values, touched, errors, setFieldValue, handleChange, handleBlur, handleSubmit } = formik;

    const fetchAllRestaurants = async () => {
        try {
            const res = await getAllRestaurants();
            const { data } = res;
            const { success } = data;
            const restaurants = data?.data?.restaurants;
            if (success) {
                setRestaurants(restaurants);
            }
        } catch (error) {

        }
    }

    const addLocation = async () => {
        try {
            const res = await createLocation(values);
            const { data } = res;
            const { success } = data;
            if (success) {
                toggleLocationFormModal(false);
                createLocationSuccess();
            }
        } catch (error) {

        }
    }

    const editLocation = async () => {
        try {
            const res = await updateLocation(selectedLocationDetailsState.id, values);
            const { data } = res;
            const { success } = data;
            if (success) {
                toggleLocationFormModal(false);
                createLocationSuccess();
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchAllRestaurants();
        if (selectedLocationDetailsState && Object.keys(selectedLocationDetailsState).length) {
            const { locationName, locationAddress } = selectedLocationDetailsState;
            const { id } = selectedLocationDetailsState?.restaurant;
            setFieldValue('locationName', locationName);
            setFieldValue('locationAddress', locationAddress);
            setFieldValue('restaurantId', id);
        }
    }, []);


    return (
        <Modal
            show={true}
            onHide={() => { toggleLocationFormModal(false) }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {selectedLocationDetailsState ? 'Edit Location' : 'Create Location'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="locationName">
                        <Form.Label>Location Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter location name"
                            name="locationName"
                            value={values.locationName}
                            isInvalid={!!errors.locationName && touched.locationName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.locationName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="locationAddress">
                        <Form.Label>Location Address</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Enter location address"
                            name="locationAddress"
                            value={values.locationAddress}
                            isInvalid={!!errors.locationAddress && touched.locationAddress}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.locationAddress}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="restaurantId">
                        <Form.Label>Restaurant</Form.Label>
                        <Form.Control
                            value={values.restaurantId}
                            className="Inputstyle"
                            as="select"
                            isInvalid={!!errors.restaurantId && touched.restaurantId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <option disabled selected value="">Select</option>
                            {
                                restaurants?.map(restaurant => <option value={restaurant?.id} key={restaurant.id}>{restaurant.restaurantName}</option>)
                            }
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {errors.restaurantId}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className="text-right">
                        <Button className="my-4" variant="primary" type="submit">
                            {selectedLocationDetailsState ? 'Update' : 'Add'}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default LocationFormModal;
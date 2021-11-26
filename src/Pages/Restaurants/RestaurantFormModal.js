import { useFormik } from "formik";
import { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createRestaurant, updateRestaurant } from "../../Services/RestaurantService";
import { addRestaurantSchema, editRestaurantSchema } from "../../Validators/RestaurantValidator";


const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    restaurantName: '',
    country: ''
};

const RestaurantFormModal = ({ toggleRestaurantFormModal, createRestaurantSuccess, selectedRestaurantDetailsState }) => {

    const formik = useFormik({
        initialValues,
        validationSchema: selectedRestaurantDetailsState && Object.keys(selectedRestaurantDetailsState).length ? editRestaurantSchema : addRestaurantSchema,
        onSubmit: async (values) => {
            console.log(values);
            selectedRestaurantDetailsState && Object.keys(selectedRestaurantDetailsState).length ? editRestaurant() : addRestaurant();
        }
    });

    const { values, touched, errors, setFieldValue, handleChange, handleBlur, handleSubmit } = formik;

    const addRestaurant = async () => {
        try {
            const res = await createRestaurant(values);
            const { data } = res;
            const { success } = data;
            if (success) {
                toggleRestaurantFormModal(false);
                createRestaurantSuccess();
            }
        } catch (error) {

        }
    }

    const editRestaurant = async () => {
        try {
            const res = await updateRestaurant(selectedRestaurantDetailsState.id, selectedRestaurantDetailsState?.users[0].id, values);
            const { data } = res;
            const { success } = data;
            if (success) {
                toggleRestaurantFormModal();
                createRestaurantSuccess();
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        if (selectedRestaurantDetailsState && Object.keys(selectedRestaurantDetailsState).length) {
            const { restaurantName, country } = selectedRestaurantDetailsState;
            const { firstName, lastName, email, mobileNo } = selectedRestaurantDetailsState?.users[0];
            setFieldValue('restaurantName', restaurantName);
            setFieldValue('country', country);
            setFieldValue('firstName', firstName);
            setFieldValue('lastName', lastName);
            setFieldValue('email', email);
            setFieldValue('mobileNo', mobileNo);
        }
    }, []);

    return (
        <Modal
            show={true}
            onHide={() => toggleRestaurantFormModal(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {selectedRestaurantDetailsState && Object.keys(selectedRestaurantDetailsState).length ? 'Edit Restaurant' : 'Add Restaurant'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                        <h5><strong>Restaurant Details</strong></h5>
                    </Form.Group>
                    <Form.Group controlId="restaurantName">
                        <Form.Label>Restaurant Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter restaurant name"
                            name="restaurantName"
                            value={values.restaurantName}
                            isInvalid={!!errors.restaurantName && touched.restaurantName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.restaurantName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            value={values.country}
                            // onChange={(e) => this.nameChange(e.target.value)}
                            className="Inputstyle"
                            as="select"
                            isInvalid={!!errors.country && touched.country}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <option disabled selected value="">Select</option>
                            <option value="India">India</option>
                            <option value="UK">UK</option>
                            <option value="USA">USA</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {errors.country}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mt-4 mb-4">
                        <h5><strong>Restaurant Owner Details</strong></h5>
                    </Form.Group>
                    <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter first name"
                            name="firstName"
                            value={values.firstName}
                            isInvalid={!!errors.firstName && touched.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.firstName}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter last name"
                            name="lastName"
                            value={values.lastName}
                            isInvalid={!!errors.lastName && touched.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.lastName}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter email"
                            name="email"
                            value={values.email}
                            isInvalid={!!errors.email && touched.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={selectedRestaurantDetailsState && Object.keys(selectedRestaurantDetailsState).length !== 0}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="mobileNo">
                        <Form.Label>Mobile No</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter mobile no"
                            name="mobileNo"
                            value={values.mobileNo}
                            isInvalid={!!errors.mobileNo && touched.mobileNo}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.mobileNo}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div className="text-right">
                        <Button className="my-4" variant="primary" type="submit">
                            {selectedRestaurantDetailsState && Object.keys(selectedRestaurantDetailsState).length ? `Update Restaurant` : `Add Restaurant`}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal >)
}

export default RestaurantFormModal;
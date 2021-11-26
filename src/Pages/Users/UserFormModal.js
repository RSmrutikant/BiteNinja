import { useEffect } from "react";
import { Col, Form, Modal, Button } from "react-bootstrap";
import { useFormik } from 'formik';

import { addUserSchema, editUserSchema } from '../../Validators/UserValidator';
import { createUser, updateUser } from "../../Services/UserService";
import { showSuccessToastMessage } from "../../Utils/ToastUtils";

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    status: '',
    role: '',
    password: ''
};

const UserFormModal = ({ toggleAddUserModal, createUserSuccess, selectedUserDetails }) => {

    const formik = useFormik({
        initialValues,
        validationSchema: selectedUserDetails && Object.keys(selectedUserDetails).length ? editUserSchema : addUserSchema,
        onSubmit: async (values) => {
            selectedUserDetails && Object.keys(selectedUserDetails).length ? editUser() : addUser()
        }
    });

    const { values, touched, errors, setFieldValue, handleChange, handleBlur, handleSubmit } = formik;

    const addUser = async () => {
        try {
            const res = await createUser(values);
            const { data } = res;
            const { success, message } = data;
            if (success) {
                showSuccessToastMessage(message);
                toggleAddUserModal();
                createUserSuccess();
            }
        } catch (error) {

        }
    }

    const editUser = async () => {
        try {
            const res = await updateUser(selectedUserDetails.id, values);
            const { data } = res;
            const { success, message } = data;
            if (success) {
                showSuccessToastMessage(message);
                toggleAddUserModal();
                createUserSuccess();
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        if (selectedUserDetails && Object.keys(selectedUserDetails).length) {
            const { firstName, lastName, email, role, status } = selectedUserDetails;
            setFieldValue('firstName', firstName);
            setFieldValue('lastName', lastName);
            setFieldValue('email', email);
            setFieldValue('status', status);
            setFieldValue('role', role);
        }
    }, []);

    return (
        <Modal
            show={true}
            onHide={() => toggleAddUserModal(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {selectedUserDetails && Object.keys(selectedUserDetails).length ? 'Edit User' : 'Add User'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Col>
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
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={values.email}
                                    isInvalid={!!errors.email && touched.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    autoComplete="new-password"
                                    name="password"
                                    value={values.password}
                                    isInvalid={!!errors.password && touched.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Label>Status</Form.Label>
                            <Form.Group controlId="status">
                                <Form.Check type="radio" name="status" label="Active" inline onChange={(e) => setFieldValue("status", "ACTIVE")} checked={values.status === "ACTIVE"} />
                                <Form.Check type="radio" name="status" label="In-Active" inline onChange={(e) => setFieldValue("status", "IN_ACTIVE")} checked={values.status === "IN_ACTIVE"} />
                                {touched.status && errors.status && <p className="required">{errors.status}</p>}
                            </Form.Group>

                            <Form.Label>Role</Form.Label>
                            <Form.Group controlId="role">
                                <Form.Check type="radio" name="role" label="Admin" inline onChange={(e) => setFieldValue("role", "ADMIN")} checked={values.role === "ADMIN"} />
                                <Form.Check type="radio" name="role" label="Employee" inline onChange={(e) => setFieldValue("role", "EMPLOYEE")} checked={values.role === "EMPLOYEE"} />
                                {touched.status && errors.status && <p className="required">{errors.role}</p>}
                            </Form.Group>

                            <Col md="12" className="text-right">
                                <Button variant="primary" type="button" onClick={handleSubmit}>
                                    {selectedUserDetails && Object.keys(selectedUserDetails).length ? `Update User` : `Add User`}
                                </Button>
                            </Col>
                        </Col>
                    </Form.Row>
                </Form>
            </Modal.Body>
        </Modal>)
}

export default UserFormModal
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';

import { meetingSchema } from '../../Validators/MeetingValidator';
import { createMeeting, updateMeeting } from '../../Services/MeetingService';

const initialValues = {
    roomName: '',
    meetingNumber: '',
    meetingPassword: ''
};

const MeetingFormModal = ({ show, onHide, fetchMeetings, selectedMeeting }) => {

    const finalInitialValues = { ...initialValues };
    if (selectedMeeting) {
        finalInitialValues.roomName = selectedMeeting.roomName;
        finalInitialValues.meetingNumber = selectedMeeting.meetingNumber;
        finalInitialValues.meetingPassword = selectedMeeting.meetingPassword;
    }

    const formik = useFormik({
        initialValues: finalInitialValues,
        validationSchema: meetingSchema,
        onSubmit: values => {
            console.log('values', values);
            if (selectedMeeting) {
                onUpdateMeeting(values);
            } else {
                onCreateMeeting(values);
            }
        }
    });

    const onCreateMeeting = async values => {
        try {
            await createMeeting(values);
            fetchMeetings();
            resetForm();
            onHide();
        } catch (error) {
            console.log('onCreateMeeting error :: ', error);
        }
    };

    const onUpdateMeeting = async values => {
        try {
            await updateMeeting(selectedMeeting.id, values);
            fetchMeetings();
            resetForm();
            onHide();
        } catch (error) {
            console.log('onUpdateMeeting error :: ', error);
        }
    };

    const { values, touched, errors, handleChange, handleBlur, handleSubmit, resetForm } = formik;

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {selectedMeeting ? 'Edit Meeting' : 'Create Meeting'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group controlId="roomName">
                        <Form.Label>Room Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter room name"
                            name="roomName"
                            value={values.roomName}
                            isInvalid={!!errors.roomName && touched.roomName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.roomName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="meetingNumber">
                        <Form.Label>Meeting Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter meeting number"
                            name="meetingNumber"
                            value={values.meetingNumber}
                            isInvalid={!!errors.meetingNumber && touched.meetingNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.meetingNumber}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="meetingPassword">
                        <Form.Label>Meeting Password</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter meeting password"
                            name="meetingPassword"
                            value={values.meetingPassword}
                            isInvalid={!!errors.meetingPassword && touched.meetingPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.meetingPassword}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className="text-right">
                        <Button className="my-4" variant="primary" type="submit">
                            {selectedMeeting ? 'Update' : 'Add'}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
};

export default MeetingFormModal;
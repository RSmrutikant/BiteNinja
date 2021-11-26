import { Button, Col, Modal, Row } from 'react-bootstrap';

const ConfirmationModal = ({ toggleConfirmationModal, confirmationMessage, confirmationSuccess }) => {
    return (
        <Modal
            show={true}
            onHide={() => toggleConfirmationModal(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                {/* <Modal.Title id="confirmation-modal-title">
                    {confirmationMessage}
                </Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={12}>
                        <h5> {confirmationMessage}</h5>
                    </Col>
                </Row>
                <Col md="12" className="text-right">
                    <Button variant="secondary" className="mr-3" onClick={() => toggleConfirmationModal(false)}>No</Button>
                    <Button variant="danger" onClick={() => confirmationSuccess()}>Yes</Button>
                </Col>
            </Modal.Body>
        </Modal>
    )
}

export default ConfirmationModal
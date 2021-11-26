import { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import ConfirmationModal from "../../Components/ConfirmationModal.js/ConfirmationModal";
import { deleteLocation, getAllLocations, getLocationDetails } from "../../Services/LocationsService";
import { showErrorToastMessage } from "../../Utils/ToastUtil";
import LocationFormModal from "./LocationFormModal";

const Locations = () => {

    const [addLocationFormModalState, setAddLocationFormModalState] = useState(false);
    const [locations, setLocations] = useState([]);
    const [confirmationModalState, setConfirmationModalState] = useState(false);
    const [selectedLocationDetailsState, setSelectedLocationDetailsState] = useState(null);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [noDataFound, setNoDataFound] = useState(false);

    const toggleLocationFormModal = (value) => {
        setAddLocationFormModalState(value);
    }

    const fetchAllLocations = async () => {
        try {
            const res = await getAllLocations();
            const { data } = res;
            const { success } = data;
            const locations = data?.data?.locations;
            if (success) {
                setLocations(locations);
            }
            setNoDataFound(locations.length === 0);
        } catch (error) {

        }
    }

    const fetchLocationDetails = async (location) => {
        try {
            const res = await getLocationDetails(location?.id);
            const { data } = res;
            const { success } = data;
            if (success) {
                setSelectedLocationDetailsState(data?.data?.location);
                toggleLocationFormModal(true);
            }
        } catch (error) {
            console.log(error)
            showErrorToastMessage('Something went wrong');
        }
    }


    const deleteLocationRecord = async () => {
        try {
            const res = await deleteLocation(selectedLocationDetailsState?.id);
            const { data } = res;
            const { success } = data;
            if (success) {
                toggleConfirmationModal(false);
                fetchAllLocations();
            }
        } catch (error) {

        }
    }

    const createLocationSuccess = () => {
        fetchAllLocations();
    }

    const toggleConfirmationModal = async (value, location) => {
        setConfirmationModalState(value);
        setSelectedLocationDetailsState(location);
    }

    const confirmationSuccess = () => {
        deleteLocationRecord();
    }

    const onEditLocation = (location) => {
        fetchLocationDetails(location);
    }

    const onAddLocation = () => {
        toggleLocationFormModal(true);
        setSelectedLocationDetailsState(null);
    }

    const onDeleteLocation = async (location) => {
        setConfirmationMessage('Are you sure, you want to delete location?');
        toggleConfirmationModal(true);
        setSelectedLocationDetailsState(location);
    }

    useEffect(() => {
        fetchAllLocations(null);
    }, []);

    return (
        <>
            <Row className="my-4">
                <Col md={11}>
                    <h2>Locations</h2>
                </Col>
                <Col md={1}>
                    <Button variant="primary" onClick={() => onAddLocation(null)}>Add</Button>
                </Col>
            </Row>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>Location Name</th>
                        <th>Location Address</th>
                        <th>Restaurant</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {locations?.map((location, i) => {
                        return (
                            <tr key={i}>
                                <td>{location.locationName}</td>
                                <td>{location.locationAddress}</td>
                                <td>{location?.restaurant?.restaurantName}</td>
                                <td>
                                    <Button
                                        variant="secondary"
                                        onClick={() => onEditLocation(location)}
                                        className="mr-2"
                                    >Edit</Button>

                                    <Button
                                        variant="danger"
                                        onClick={() => onDeleteLocation(location)}
                                    >Delete</Button>
                                </td>
                            </tr>
                        )
                    })}

                    {noDataFound && (
                        <tr>
                            <td colSpan="5" className="text-center">No locations found.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            {addLocationFormModalState && <LocationFormModal toggleLocationFormModal={toggleLocationFormModal} createLocationSuccess={createLocationSuccess} selectedLocationDetailsState={selectedLocationDetailsState} />}
            {confirmationModalState && <ConfirmationModal toggleConfirmationModal={toggleConfirmationModal} confirmationMessage={confirmationMessage} confirmationSuccess={confirmationSuccess} />}
        </>
    )
}

export default Locations;
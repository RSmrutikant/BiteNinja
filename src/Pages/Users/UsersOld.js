import { useEffect, useState } from "react";
import { Container, Table, Row, Col, Tabs, Tab } from "react-bootstrap";
import './Users.css';
import ConfirmationModal from "../../Components/ConfirmationModal.js/ConfirmationModal";
import UserFormModal from "./UserFormModal";
import { getAllUsers, deleteUser, getUserDetails, updateUser } from "../../Services/UserService";
import { showErrorToastMessage, showSuccessToastMessage } from "../../Utils/ToastUtils";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [addUserModalState, setAddUserModalState] = useState(false);
    const [confirmationModalState, setConfirmationModalState] = useState(false);
    const [selectedUserDetailsState, setSelectedUserDetailsState] = useState(null);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [noDataFound, setNoDataFound] = useState(false);

    const fetchAllUsers = async () => {
        try {
            const res = await getAllUsers();
            const { data } = res;
            const { success } = data;
            const users = data?.data;
            if (success) {
                setUsers(users);
            }
            setNoDataFound(users.length === 0);
            console.log('users', users);
        } catch (error) {

        }
    }

    const fetchUserDetails = async (user) => {
        try {
            const res = await getUserDetails(user?.id);
            const { data } = res;
            const { success } = data;
            if (success) {
                setSelectedUserDetailsState(data?.data?.user);
                toggleAddUserModal(true);
            }
        } catch (error) {
            showErrorToastMessage('Something went wrong');
        }
    }

    const deleteUserRecord = async () => {
        try {
            const res = await deleteUser(selectedUserDetailsState?.id);
            const { data } = res;
            const { success, message } = data;
            if (success) {
                showSuccessToastMessage(message);
                toggleConfirmationModal(false);
                fetchAllUsers();
            }
        } catch (error) {

        }
    }


    const editUser = async (payload) => {
        try {
            const res = await updateUser(selectedUserDetailsState.id, payload);
            const { data } = res;
            const { success, message } = data;
            if (success) {
                showSuccessToastMessage(message);
                toggleConfirmationModal(false);
                fetchAllUsers();
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchAllUsers();
    }, [])

    const toggleAddUserModal = (value) => {
        setAddUserModalState(value);
    }

    const toggleConfirmationModal = async (value, user) => {
        setConfirmationModalState(value);
        setSelectedUserDetailsState(user);
    }

    const createUserSuccess = () => {
        fetchAllUsers();
    }

    const confirmationSuccess = () => {
        if (selectedUserDetailsState?.action === 'DELETE') {
            deleteUserRecord();
        }
        if (selectedUserDetailsState?.action === 'ROLE') {
            const data = {
                email: selectedUserDetailsState?.email,
                role: selectedUserDetailsState?.role
            }
            editUser(data);
        }
        if (selectedUserDetailsState?.action === 'STATUS') {
            const data = {
                email: selectedUserDetailsState?.email,
                status: selectedUserDetailsState?.status
            }
            editUser(data);
        }
    }

    const onEditUser = (user) => {
        fetchUserDetails(user);
    }

    const onAddUser = () => {
        toggleAddUserModal(true);
        setSelectedUserDetailsState(null)
    }

    const onDeleteUser = async (user) => {
        setConfirmationMessage('Are you sure, you want to delete user?');
        toggleConfirmationModal(true);
        const userCopy = {
            ...user, action: 'DELETE'
        }
        setSelectedUserDetailsState(userCopy);
    }

    const handleRoleChange = (e, user) => {
        setConfirmationMessage('Are you sure, you want to change user role?');
        toggleConfirmationModal(true);
        const userCopy = {
            ...user, action: 'ROLE', role: e.target.value
        }
        setSelectedUserDetailsState(userCopy);
    }

    const handleStatusChange = (e, user) => {
        if (user.status === 'ACTIVE') {
            user.newStatus = 'IN_ACTIVE'
        } else {
            user.newStatus = 'ACTIVE'
        }
        setConfirmationMessage('Are you sure, you want to change user status?');
        toggleConfirmationModal(true);
        const userCopy = {
            ...user, action: 'STATUS', status: user.newStatus
        }
        setSelectedUserDetailsState(userCopy);

    }

    return (
        <>
            <Row className="my-4">
                <Col md={8}>
                    <h2 className="Users-heading" style={{ color: '#e06030' }}>Users</h2>
                </Col>
                <Col md={3} className="d-flex justify-content-around User-action">
                    <h5><a variant="primary" onClick={() => onAddUser()}> Add User</a></h5>
                    <h6><a href="#/"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                    </svg></a></h6>
                    <h6><a href="#/"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg></a></h6>
                </Col>
                <Col md={1}></Col>
            </Row>

            {/* TABS FOR DIFFERENT USERS OPTIONS */}
            <Container fluid>
                <Tabs defaultActiveKey="AllUsers" id="uncontrolled-tab-example">
                    <Tab eventKey="AllUsers" title="All Users">
                        <Table responsive="sm">
                            <thead className="text-center user-table">
                                <tr>
                                    <th ><input type="checkbox" name="" id="" /><svg style={{ marginInline: '0.5rem' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                                    </svg></th>
                                    <th>Name<svg style={{ marginInline: '0.5rem' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                                    </svg></th>
                                    <th>Email<svg style={{ marginInline: '0.5rem' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                                    </svg></th>
                                    <th>Status<svg style={{ marginInline: '0.5rem' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                                    </svg></th>
                                    <th>Role<svg style={{ marginInline: '0.5rem' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                                    </svg></th>
                                    <th>Action<svg style={{ marginInline: '0.5rem' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                                    </svg></th>
                                </tr>
                            </thead>
                            <tbody className="table-content text-center">
                                {users.map((user, i) => {
                                    return (
                                        <tr key={i}>
                                            <td><input type="checkbox" name="" id="" /></td>
                                            <td>{user.firstName} {user.lastName}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <label class="switch">
                                                    <input type="checkbox" id={`status${i}`} onChange={e => handleStatusChange(e, user)} checked={user.status === 1} />
                                                    <div class="slider round"></div>
                                                </label>

                                            </td>
                                            <td>
                                                <select className="form-select user-role-select" aria-label="Role" onChange={(e) => handleRoleChange(e, user)} value={user.role}>
                                                    <option disabled>Role</option>
                                                    <option value="ADMIN">ADMIN</option>
                                                    <option value="EMPLOYEE">EMPLOYEE</option>
                                                    <option value="RESTAURANT_MANAGER">RESTAURANT MANAGER</option>
                                                </select>
                                            </td>
                                            <td>
                                                <b
                                                    // variant="secondary"
                                                    onClick={() => onEditUser(user)}
                                                    className="mr-4 action-btn"
                                                ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                    </svg></b>

                                                <b
                                                    // variant="danger"
                                                    className=" action-btn"
                                                    onClick={() => onDeleteUser(user)}
                                                ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                    </svg></b>
                                            </td>
                                        </tr>
                                    )
                                })}

                                {noDataFound && (
                                    <tr>
                                        <td colSpan="5" className="text-center">No users found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Tab>
                    <Tab eventKey="Admins" title="Admins">
                        <h1>Admins</h1>
                    </Tab>
                    <Tab eventKey="Employees" title="Employees" >
                        <h1>Employees</h1>
                    </Tab>
                </Tabs>

            </Container>

            {addUserModalState && <UserFormModal toggleAddUserModal={toggleAddUserModal} createUserSuccess={createUserSuccess} selectedUserDetails={selectedUserDetailsState} />}
            {confirmationModalState && <ConfirmationModal toggleConfirmationModal={toggleConfirmationModal} confirmationMessage={confirmationMessage} confirmationSuccess={confirmationSuccess} />}
        </>
    )
}

export default Users;





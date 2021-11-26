import React, { Component, Fragment } from 'react'
import { getAllUsers, deleteUser, getUserDetails, updateUser, updateUserStatus, createUser } from "../../Services/UserService";
import { showErrorToastMessage, showSuccessToastMessage } from "../../Utils/ToastUtils";
import { Container, Row, Col } from "react-bootstrap";
import { Tabs, Button, Divider, Checkbox, Table, Switch, Modal, Form, Input, Radio } from 'antd';
import { DownOutlined, UpOutlined, DownloadOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {
    EDIT_ICON,
    DELETE_ICON
} from '../../Helpers/IconsHelper';
import './Users.css';
import _ from 'lodash';
const { TabPane } = Tabs;
const { confirm } = Modal;
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            addUserModal: false,
            userDetails: {
                userId: '',
                firstName: 'N/A',
                lastName: 'N/A',
                email: 'N/A'
            },
            editModalVisible: false,
            currentPage: 1,
            activeTabKey: 'all',
            columns: [
                {
                    title: 'First Name',
                    dataIndex: 'firstName',
                },
                {
                    title: 'Last Name',
                    dataIndex: 'lastName',
                },
                {
                    title: 'Email',
                    dataIndex: 'email',
                },
                {
                    title: 'Role',
                    dataIndex: 'role',
                },
                {
                    title: 'Status',
                    dataIndex: 'status',
                    render: (text, record) => (
                        <Switch
                            checked={record.status}
                            onChange={(e) =>
                                this.onRadioChange({
                                    userId: record.userId
                                }, e)
                            }
                        >
                        </Switch>
                    )
                },
                {
                    title: 'Action',
                    key: 'action',
                    render: (text, record) => (
                        <>
                            <a className="placebid-btn" onClick={() => this.editUser(text, record)}>
                                <img src={EDIT_ICON} alt="Edit User" style={{ "width": "15%", "margin": "1rem" }} data-toggle="tooltip" title="Edit User" />
                                {/* <EditOutlined data-toggle="tooltip" title="Edit User" style={{ "fontSize": "1.5rem" }} /> */}
                            </a>
                            <a className="placebid-btn" onClick={() => this.showConfirm(text, record)}>
                                <img src={DELETE_ICON} alt="Delete User" style={{ "width": "15%" }} data-toggle="tooltip" title="Delete User" />
                                {/* <DeleteOutlined data-toggle="tooltip" title="Delete User !" style={{ "fontSize": "1.5rem" }} /> */}
                            </a>
                        </>
                    ),
                }
            ],
            allUserList: [],
            allAdminList: [],
            allEmployeeList: []
        }
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onTabChange = this.onTabChange.bind(this);
        this.fetchUsers = this.fetchUsers.bind(this);
        this.onExpandRow = this.onExpandRow.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };

    componentDidMount = async () => {
        try {
            const { currentPage } = this.state;
            const res = await getAllUsers('', currentPage);
            const { data } = res;
            const { success } = data;
            let users = data?.data?.results;
            users = users.map((data) => {
                return {
                    key: data.userId,
                    ...data
                }
            })
            if (success) {
                this.setState({ allUserList: users });
            }
            console.log('users', users);
        } catch (e) {
            console.error(e);
        }
    }

    // on radio change
    onRadioChange = async (user, e) => {
        try {
            await updateUserStatus(user.userId, e ? 'approve' : 'refuse').then(async (res) => {
                await this.fetchUsers();
            });
        } catch (e) {
            console.error(e);
            showErrorToastMessage(e);
        }
    }

    // on tab change 
    onTabChange = async (e) => {
        try {
            this.setState({ activeTabKey: e }, async () => {
                await this.fetchUsers();
            });
        } catch (e) {
            console.error(e);
            showErrorToastMessage(e);
        }
    }

    fetchUsers = async (e) => {
        try {
            const { currentPage, activeTabKey } = this.state;
            let role = activeTabKey;
            if (activeTabKey == 'all') role = '';
            const res = await getAllUsers(role, currentPage);
            const { data } = res;
            const { success } = data;
            let users = data?.data?.results;
            users = users.map((data) => {
                return {
                    key: data.userId,
                    ...data
                }
            })
            if (success) {
                if (activeTabKey == 'all')
                    this.setState({ allUserList: users });
                else if (activeTabKey == 'employee')
                    this.setState({ allEmployeeList: users });
                else if (activeTabKey == 'admin')
                    this.setState({ allAdminList: users });
            }
        } catch (e) {
            console.error(e);
            showErrorToastMessage(e);
        }
    }

    onExpandRow = (record) => {
        console.log('record', record);
        return <Fragment>
            <td className="ant-table-cell">
            </td>
            <td className="ant-table-cell">
                <p>Proof Of Identity</p>
            </td>
            <td className="ant-table-cell">
                <DownloadOutlined />
            </td>
            <td className="ant-table-cell">
                <p>W9 Form</p>
            </td>
            <td className="ant-table-cell">
                <DownloadOutlined />
            </td>
            <td className="ant-table-cell">
            </td>
            <td className="ant-table-cell">
            </td>
        </Fragment>
    }

    deleteUser = async (text, record) => {
        try {
            let userId = text?.userId;

            // if userId is defined
            if (userId) {
                await deleteUser(userId).then(async () => {
                    await this.fetchUsers();
                }).catch(e => {
                    console.error(e);
                    showErrorToastMessage(e);
                })
            }

        } catch (e) {
            console.error(e);
            showErrorToastMessage(e);
        }
    }

    showConfirm = (text, record) => {
        let deleteUser = this.deleteUser;
        confirm({
            title: `Do you Want to remove ${text.firstName} ?`,
            icon: <ExclamationCircleOutlined />,
            content: 'Once Deleted, you cannot retrieve it back !',
            onOk() {
                deleteUser(text, record);
            }
        })
    }

    editUser = async (text, record) => {
        try {
            let userId = text?.userId;

            // if userId is defined
            if (userId) {
                this.setState({
                    editModalVisible: true,
                    userDetails: {
                        userId: text?.userId,
                        firstName: text?.firstName,
                        lastName: text?.lastName,
                        email: text?.email
                    }
                });
            }

        } catch (e) {
            console.error(e);
            showErrorToastMessage(e);
        }
    }

    editUserConfirm = async (values) => {
        try {
            const { userDetails } = this.state;
            const res = await updateUser(userDetails.userId, values);
            const { data } = res;
            const { success, message } = data;
            if (success) {
                showSuccessToastMessage(message);
                // if userId is defined
                this.setState({
                    editModalVisible: false
                });
                await this.fetchUsers();
            }

        } catch (e) {
            console.error(e);
            showErrorToastMessage(e);
        }
    }

    toggleEditModelVisibility = async () => {
        try {
            const { editModalVisible } = this.state;
            // if userId is defined
            this.setState({
                editModalVisible: !editModalVisible
            });

        } catch (e) {
            console.error(e);
            showErrorToastMessage(e);
        }
    }

    toggleAddModelVisibility = async () => {
        try {
            const { addUserModalVisible } = this.state;
            // if userId is defined
            this.setState({
                addUserModalVisible: !addUserModalVisible
            });

        } catch (e) {
            console.error(e);
            showErrorToastMessage(e);
        }
    }

    onReset = () => {
        this.formRef.current.resetFields();
    };

    onResetAdd = () => {
        this.addUserFormRef.current.resetFields();
    }

    addUserConfirm = async (values) => {
        try {
            const res = await createUser(values);
            const { data } = res;
            const { success, message } = data;
            if (success) {
                showSuccessToastMessage(message);
                // if userId is defined
                this.setState({
                    addUserModalVisible: false
                });
                await this.fetchUsers();
            }
        } catch (e) {
            console.error(e);
            showErrorToastMessage(e);
        }
    }

    formRef = React.createRef();
    addUserFormRef = React.createRef();
    render() {
        const { selectedRowKeys, columns, allUserList, allAdminList, allEmployeeList, activeTabKey, editModalVisible, userDetails, addUserModalVisible } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            selections: [
                Table.SELECTION_ALL
            ],
        };
        return (
            <Fragment>
                <Container fluid className="px-4 py-4">
                    <Row>
                        <Col md={4}>
                            <h2 className="Meeting-heading">Users</h2>
                        </Col>
                        <Col md={8}>
                            <div className="create-btn-wrapper">
                                <img src={DELETE_ICON} alt="Delete User" style={{ "width": "3%", "margin-left": "2rem", "margin-top": "0.9rem", "margin-right": "2rem" }} data-toggle="tooltip" title="Delete User" />
                                <Button type="primary" className="addUserBtn" onClick={() => this.toggleAddModelVisibility()}>+ Add User</Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Tabs tabBarGutter={"15rem"} onChange={(e) => this.onTabChange(e)} activeKey={activeTabKey}>
                                <TabPane tab="All Users" key="all">
                                    <Table rowSelection={rowSelection} columns={columns} dataSource={allUserList}
                                        expandable={{
                                            expandIconColumnIndex: 7,
                                            expandedRowRender: this.onExpandRow,
                                            expandIcon: ({ expanded, onExpand, record }) =>
                                                expanded ? (
                                                    <UpOutlined onClick={e => onExpand(record, e)} />
                                                ) : (
                                                    <DownOutlined onClick={e => onExpand(record, e)} />
                                                ),
                                        }}
                                    />
                                </TabPane>
                                <TabPane tab="Admins" key="admin">
                                    <Table rowSelection={rowSelection} columns={columns} dataSource={allAdminList}
                                        expandable={{
                                            expandIconColumnIndex: 7,
                                            expandedRowRender: record => (
                                                <p style={{ margin: 0 }}>{record.username}</p>
                                            ),
                                            expandIcon: ({ expanded, onExpand, record }) =>
                                                expanded ? (
                                                    <UpOutlined onClick={e => onExpand(record, e)} />
                                                ) : (
                                                    <DownOutlined onClick={e => onExpand(record, e)} />
                                                ),
                                        }}
                                    />
                                </TabPane>
                                <TabPane tab="Employees" key="employee">
                                    <Table rowSelection={rowSelection} columns={columns} dataSource={allEmployeeList}
                                        expandable={{
                                            expandIconColumnIndex: 7,
                                            expandedRowRender: record => (
                                                <p style={{ margin: 0 }}>{record.username}</p>
                                            ),
                                            expandIcon: ({ expanded, onExpand, record }) =>
                                                expanded ? (
                                                    <UpOutlined onClick={e => onExpand(record, e)} />
                                                ) : (
                                                    <DownOutlined onClick={e => onExpand(record, e)} />
                                                ),
                                        }}
                                    />
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
                <Modal
                    footer={null}
                    title={`Edit User - ${userDetails.firstName}`}
                    centered
                    visible={editModalVisible}
                    cancelText="Close"
                    destroyOnClose={true}
                    onCancel={() => this.toggleEditModelVisibility()}
                >
                    <Form
                        name="basic"
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 14,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={(val) => this.editUserConfirm(val)}
                        onFinishFailed={() => this.toggleEditModelVisibility()}
                        autoComplete="off"
                        ref={this.formRef}
                    >
                        <Form.Item
                            label="First Name"
                            name="firstName"
                            initialValue={userDetails.firstName}
                            rules={[
                                {
                                    message: 'Please input your first name!',
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Last Name"
                            name="lastName"
                            initialValue={userDetails.lastName}
                            rules={[
                                {
                                    message: 'Please input your last name!',
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            initialValue={userDetails.email}
                            rules={[
                                {
                                    message: 'Please input your Email !',
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" className="submit-btn" htmlType="submit">
                                Update
                            </Button>
                            <Button htmlType="button" onClick={this.onReset}>
                                Reset
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    footer={null}
                    title={`Add New User`}
                    centered
                    visible={addUserModalVisible}
                    cancelText="Close"
                    destroyOnClose={true}
                    onCancel={() => this.toggleAddModelVisibility()}
                >
                    <Form
                        name="basic"
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 14,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={(val) => this.addUserConfirm(val)}
                        onFinishFailed={() => this.toggleAddModelVisibility()}
                        autoComplete="off"
                        ref={this.addUserFormRef}
                    >
                        <Form.Item
                            label="First Name"
                            name="firstName"
                            initialValue=""
                            rules={[
                                {
                                    message: 'Please input your first name!',
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Last Name"
                            name="lastName"
                            initialValue=""
                            rules={[
                                {
                                    message: 'Please input your last name!',
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            initialValue=""
                            rules={[
                                {
                                    message: 'Please input your Email !',
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item name="userType" label="User Type">
                            <Radio.Group>
                                <Radio value="admin">admin</Radio>
                                <Radio value="employee">employee</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" className="submit-btn" htmlType="submit">
                                Add
                            </Button>
                            <Button htmlType="button" onClick={this.onResetAdd}>
                                Reset
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Fragment >
        )
    }
}

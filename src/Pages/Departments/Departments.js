import { useEffect, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import ConfirmationModal from '../../Components/ConfirmationModal.js/ConfirmationModal';
import {
  deleteDepartment,
  getAllDepartments,
  // getDepartmentDetails,
  getAllDepartmentMaster,
  deleteDepartmentMaster,
  updateDepartmentMaster,
} from '../../Services/DepartmentMasterService.js';
import { showErrorToastMessage } from '../../Utils/ToastUtil';
import DepartmentFormModal from './DepartmentFormModal';
import {
  Table,
  Input,
  InputNumber,
  Button,
  Popconfirm,
  Form,
  Typography,
} from 'antd';
import Custombutton from '../../Components/CustomerButton';
import EditableCell from '../../Components/EditableCell/index';
import './department.css';
import { createDepartment } from '../../Services/DepartmentService';
import { DELETE_ICON, EDIT_ICON } from '../../Helpers/IconsHelper';
import { width } from 'dom-helpers';
const Departments = () => {
  const [addDepartmentFormModalState, setAddDepartmentFormModalState] =
    useState(false);
  const [departments, setDepartments] = useState([]);
  const [confirmationModalState, setConfirmationModalState] = useState(false);
  const [selectedDepartmentDetailsState, setSelectedDepartmentDetailsState] =
    useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      departmentName: '',
      id: '',

      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...departments];
      const index = newData.findIndex((item) => key === item.id);
      if (index > -1) {
        console.log('Updating row in -1', row);
        const res = await updateDepartmentMaster(key, row);
        if (res.status === 200) {
          const { data } = res;
          const item = newData[index];
          newData.splice(index, 1, { ...item, ...row });
          setDepartments(newData);
          setEditingKey('');
        }
      } else {
        newData.push(row);
        setDepartments(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const fetchAllDepartments = async () => {
    try {
      const res = await getAllDepartmentMaster(1);
      const { data } = res;
      //   const { success } = data;
      const departments = data?.data?.results;
      setDepartments(departments);
    } catch (error) {}
  };

  const tableColumns = [
    {
      title: 'Department Name',
      dataIndex: 'departmentName',
      editable: true,
    },

    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (item, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span className="d-flex">
            <Custombutton
              title={`  Save `}
              type="primary"
              onClick={() => save(record.id)}
            >
              Save
            </Custombutton>
            <Custombutton
              type="alternate"
              title="Cancel"
              onClick={() => cancel()}
            >
              Cancel
            </Custombutton>
          </span>
        ) : (
          <span className="d-flex">
            {/* <a
              //   className="placebid-btn"
              disabled={editingKey !== ''}
              onClick={() => edit(record)} 
            >*/}
            {/* <img
              src={EDIT_ICON}
              alt="Edit "
              style={{ width: 20, height: 20, margin: '1rem' }}
              data-toggle="tooltip"
              title="Edit"
            /> */}
            {/* <EditOutlined data-toggle="tooltip" title="Edit User" style={{ "fontSize": "1.5rem" }} /> */}
            {/* </a> */}
            {/* <a
              //   className="placebid-btn"
              onClick={() => deleteDepartmentRecord(item?.id)}
            > */}
            {/* <img
              src={DELETE_ICON}
              alt="Delete "
              style={{ width: 20, height: 20, margin: '1rem' }}
              data-toggle="tooltip"
              title="Delete"
            /> */}
            {/* <DeleteOutlined data-toggle="tooltip" title="Delete User !" style={{ "fontSize": "1.5rem" }} /> */}
            {/* </a> */}
            <img
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
              style={{ maxHeight: 28 }}
              src={EDIT_ICON}
              className="mr-3"
            />

            <img
              onClick={() => deleteDepartmentRecord(item?.id)}
              style={{ maxHeight: 28 }}
              src={DELETE_ICON}
            />
            {/* <Custombutton
              title="Delete"
              type="primary"
              onClick={() => deleteDepartmentRecord(item?.id)}
            >
              Delete
            </Custombutton>
            <Custombutton
              title="Edit   "
              className="ml-2"
              type="alternate"
              //   onClick={() => deleteDepartmentRecord(item?.id)}
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
            >
              Edit
            </Custombutton> */}
          </span>
        );
      },
    },
  ];
  const mergedColumns = tableColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        departmentName: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const fetchDepartmentDetails = async (department) => {
    try {
      // const res = await getDepartmentDetails(department?.id);
      // const { data } = res;
      // const { success } = data;
      // if (success) {
      //   setSelectedDepartmentDetailsState(data?.data?.department);
      //   toggleDepartmentFormModal(true);
      // }
    } catch (error) {
      console.log(error);
      showErrorToastMessage('Something went wrong');
    }
  };

  const deleteDepartmentRecord = async (id) => {
    try {
      const res = await deleteDepartmentMaster(id);
      const { data } = res;
      const { success } = data;
      if (success) {
        // toggleConfirmationModal(false);
        fetchAllDepartments();
      }
    } catch (error) {}
  };

  const toggleDepartmentFormModal = (value) => {
    setAddDepartmentFormModalState(value);
  };

  const toggleConfirmationModal = async (value, department) => {
    setConfirmationModalState(value);
    setSelectedDepartmentDetailsState(department);
  };

  const onAddDepartment = () => {
    toggleDepartmentFormModal(true);
    setSelectedDepartmentDetailsState(null);
  };

  const onEditDepartment = (department) => {
    fetchDepartmentDetails(department);
  };

  const createDepartmentSuccess = () => {
    fetchAllDepartments();
  };

  const confirmationSuccess = () => {
    deleteDepartmentRecord();
  };

  const createNewDepartment = async (body) => {
    const res = await createDepartment(body);
    //   const { success } = data;
    if (res.status === 200) {
      toggleDepartmentFormModal(false);
      fetchAllDepartments();
    }
  };

  const onDeleteDepartment = async (department) => {
    setConfirmationMessage('Are you sure, you want to delete department?');
    toggleConfirmationModal(true);
    setSelectedDepartmentDetailsState(department);
  };

  useEffect(() => {
    fetchAllDepartments();
  }, []);

  return (
    <Container fluid className="px-4 py-4">
      <Row className="d-flex align-items-center">
        <Col md={10}>
          <h2 className="Meeting-heading" style={{ color: '#e06030' }}>
            Departments
          </h2>
        </Col>
        <Col md={2}>
          <Button
            shape="round"
            type="primary"
            // className="addUserBtn"
            onClick={() => onAddDepartment(null)}
          >
            + Add Department
          </Button>
        </Col>
      </Row>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={departments}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>

      {addDepartmentFormModalState && (
        <DepartmentFormModal
          toggleDepartmentFormModal={toggleDepartmentFormModal}
          handleSubmit={(val) => {
            // let createDepartment({ departmentName: val });
            createNewDepartment({ departmentName: val });
          }}
        />
      )}
      {confirmationModalState && (
        <ConfirmationModal
          toggleConfirmationModal={toggleConfirmationModal}
          confirmationMessage={confirmationMessage}
          confirmationSuccess={confirmationSuccess}
        />
      )}
    </Container>
  );
};

export default Departments;

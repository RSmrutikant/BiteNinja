import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import ConfirmationModal from '../../Components/ConfirmationModal.js/ConfirmationModal';
import {
  Table,
  Input,
  Button,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
} from 'antd';
import {
  getAllRestaurants,
  deleteRestaurant,
  getRestaurantDetails,
  updateZoom,
} from '../../Services/RestaurantService';
import { showErrorToastMessage } from '../../Utils/ToastUtil';
import RestaurantFormModal from './RestaurantFormModal';
import EditableCell from '../../Components/EditableCell/index';
import Custombutton from '../../Components/CustomerButton';
import RestaurantCreateModal from './RestaurantCreateModal';
import './Restraunt.css';
import { EDIT_ICON } from '../../Helpers/IconsHelper';
const columns = [
  {
    title: 'Restaurant Name',
    dataIndex: 'restaurantName',
    key: 'restaurantName',
  },
];

const Restaurants = () => {
  const [addRestaurantFormModalState, setAddRestaurantFormModalState] =
    useState(false);
  const [restuarants, setRestaurants] = useState([]);
  const [confirmationModalState, setConfirmationModalState] = useState(false);
  const [selectedRestaurantDetailsState, setSelectedRestaurantDetailsState] =
    useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [noDataFound, setNoDataFound] = useState(false);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.id === editingKey;

  const toggleRestaurantFormModal = (value) => {
    setAddRestaurantFormModalState(value);
  };

  const fetchAllRestaurants = async () => {
    try {
      const res = await getAllRestaurants();
      const { data } = res;
      const restaurants = data?.data?.results;
      console.log('***********restaurants********', restaurants);
      setRestaurants(restaurants || []);
    } catch (error) {}
  };

  const fetchRestaurantDetails = async (restaurant) => {
    try {
      const res = await getRestaurantDetails(restaurant?.id);
      const { data } = res;
      const { success } = data;
      if (success) {
        setSelectedRestaurantDetailsState(data?.data?.restaurant);
        toggleRestaurantFormModal(true);
      }
    } catch (error) {
      console.log(error);
      showErrorToastMessage('Something went wrong');
    }
  };

  const deleteRestaurantRecord = async () => {
    try {
      const res = await deleteRestaurant(selectedRestaurantDetailsState?.id);
      const { data } = res;
      const { success } = data;
      if (success) {
        toggleConfirmationModal(false);
        fetchAllRestaurants();
      }
    } catch (error) {}
  };

  const createRestaurantSuccess = () => {
    fetchAllRestaurants();
  };

  const toggleConfirmationModal = async (value, restaurant) => {
    setConfirmationModalState(value);
    setSelectedRestaurantDetailsState(restaurant);
  };

  useEffect(() => {
    fetchAllRestaurants();
  }, []);

  const onEditRestaurant = (restaurant) => {
    fetchRestaurantDetails(restaurant);
  };

  const onDeleteRestaurant = async (restaurant) => {
    setConfirmationMessage('Are you sure, you want to delete restaurant?');
    toggleConfirmationModal(true);
    setSelectedRestaurantDetailsState(restaurant);
  };

  const confirmationSuccess = () => {
    deleteRestaurantRecord();
  };

  const onAddRestaurant = () => {
    toggleRestaurantFormModal(true);
    setSelectedRestaurantDetailsState(null);
  };
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
      const newData = [...restuarants];
      //   let fields
      const index = newData.findIndex((item) => key === item.id);
      console.log('New value in the row is', row, key);

      const res = await updateZoom(key, row);
      const { data } = res;
      console.log('res res in res res is', data);
      setEditingKey('');

      fetchAllRestaurants();
      // need to call update api and fetch list back again row will have the data of the form
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const savePosChanges = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...restuarants];
      //   let fields
      const index = newData.findIndex((item) => key === item.id);
      console.log('New value in the row is', row, key);
      // call update api

      //   const res = await updateZoom(key, row);
      //   const { data } = res;
      //   console.log('res res in res res is', data);
      setEditingKey('');

      fetchAllRestaurants();
      // need to call update api and fetch list back again row will have the data of the form
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const departmentTableColumn = [
    {
      title: 'Departments',
      dataIndex: 'departmentName',
      key: 'departmentName',
      render: (item) => {
        return <a>{item}</a>;
      },
    },
    {
      title: 'Zoom Meeting Id',
      dataIndex: 'zoomId',
      key: 'zoomId',
      editable: true,
    },
    {
      title: 'Zoom Meeting Password',
      dataIndex: 'zoomPassword',
      key: 'zoomPassword',
      editable: true,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => {
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
            <img
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
              style={{ maxHeight: 28 }}
              src={EDIT_ICON}
              className="mr-3"
            />
          </span>
        );
      },
    },
  ];

  const nestedColums = [
    { title: 'Location', dataIndex: 'locationName', key: 'locationName' },
    {
      title: 'Location Address',
      dataIndex: 'locationAddress',
      key: 'locationAddress',
    },
    {
      title: 'Menu',
      dataIndex: 'posLink',
      key: 'posLink',
      editable: true,
      render: (item) => {
        return <a>{item || '-'}</a>;
      },
    },
    {
      title: 'departments',
      dataIndex: 'departments',
      key: 'departments',
      render: (item) => {
        let result = item?.map((a) => a.departmentName);
        return <a>{result.toString() || '-'}</a>;
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => {
        const editable = isEditing(record);

        return editable ? (
          <span className="d-flex">
            <Custombutton
              title={`  Save `}
              type="primary"
              onClick={() => savePosChanges(record.id)}
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
            <img
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
              style={{ maxHeight: 28 }}
              src={EDIT_ICON}
              className="mr-3"
            />
          </span>
        );
      },
    },
  ];
  const mergednestedColumns = nestedColums.map((col) => {
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

  const mergedColumns = departmentTableColumn.map((col) => {
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

  return (
    <>
      <Row className="my-4">
        <Col md={10}>
          <h2>Restaurants</h2>
        </Col>
        <Col md={2}>
          {/* <Button variant="primary" onClick={() => onAddRestaurant(null)}>
            Add
          </Button> */}
          <Button
            shape="round"
            type="primary"
            // className="addUserBtn"
            onClick={() => onAddRestaurant(null)}
          >
            + Add
          </Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        rowKey={(record) => record?.id}
        // title={() => 'Restaurants'}
        expandable={{
          expandedRowRender: (record) => (
            <>
              <Form form={form} component={false}>
                <Table
                  columns={mergednestedColumns}
                  dataSource={record?.locations}
                  rowKey={(record) => record?.id}
                  pagination={false}
                  // title={() => 'Locations'}
                  components={{
                    body: {
                      cell: EditableCell,
                    },
                  }}
                  rowClassName="editable-row"
                  expandable={{
                    expandedRowRender: (depatments) => (
                      <Form form={form} component={false}>
                        <Table
                          // title={() => 'Departments'}
                          columns={mergedColumns}
                          dataSource={depatments?.departments}
                          rowKey={(record) => record?.id}
                          components={{
                            body: {
                              cell: EditableCell,
                            },
                          }}
                          rowClassName="editable-row"
                          pagination={false}
                        />
                      </Form>
                    ),
                    rowExpandable: (record) => true,
                  }}
                />
              </Form>
            </>
          ),
          rowExpandable: (record) => true,
        }}
        dataSource={restuarants}
      />
      ,
      <RestaurantCreateModal
        addRestaurantFormModalState={addRestaurantFormModalState}
        toggleAddModelVisibility={toggleRestaurantFormModal}
        createRestaurantSuccess={createRestaurantSuccess}
        confirmationSuccess={confirmationSuccess}
        selectedRestaurantDetailsState={selectedRestaurantDetailsState}
      />
      {/* {addRestaurantFormModalState && (
        <RestaurantFormModal
          toggleRestaurantFormModal={toggleRestaurantFormModal}
          createRestaurantSuccess={createRestaurantSuccess}
          confirmationSuccess={confirmationSuccess}
          selectedRestaurantDetailsState={selectedRestaurantDetailsState}
        />
      )} */}
      {confirmationModalState && (
        <ConfirmationModal
          toggleConfirmationModal={toggleConfirmationModal}
          confirmationMessage={confirmationMessage}
          confirmationSuccess={confirmationSuccess}
        />
      )}
    </>
  );
};

export default Restaurants;

import React, { Component } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { Tabs, Button, Divider, Checkbox, Table, Switch, Modal, Form, Input, Radio, Space, Select } from 'antd';
import { DownOutlined, UpOutlined, DownloadOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { getAllDepartmentMaster } from '../../Services/DepartmentMasterService';
import { createRestaurantV2 } from '../../Services/RestaurantService';

// import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;
const tailLayout = {
  wrapperCol: {
    span: 24,
  },
};
const dynamicLayout = {
  wrapperCol: {
    span: 24,
  },
}
export default class RestaurantCreateModal extends Component {
  addRestFormRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      children: [<Option key={"Call Center"}> "Call Center"</Option >],
      page: 1
    }
  }

  componentDidMount = async () => {
    try {
      const { page } = this.state;
      // get all department master list 
      let res = await getAllDepartmentMaster(page);
      let { success, data } = res.data;

      // if res is fetched 
      if (res) {
        let childrens = [];
        let result = data.results;
        for (let i = 0; i < result.length; i++) {
          childrens.push(
            <Option key={result[i].id}> {result[i].departmentName}</Option >
          )
        }
        this.setState({ children: childrens });
        console.log('the chl ', childrens);
      }
    } catch (e) {
      console.error(e);
    }
  }

  addUserConfirm = async (values) => {
    try {
      await createRestaurantV2(values);
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const { addRestaurantFormModalState } = this.props;
    const { children } = this.state;
    return (
      <div>
        <Modal
          footer={null}
          title={`Add New Restaurant`}
          centered
          visible={addRestaurantFormModalState}
          cancelText="Close"
          width={800}
          destroyOnClose={true}
          onCancel={() => this.props.toggleAddModelVisibility()}
        >
          <Form
            name="basic"
            // labelCol={{
            //   span: 3,
            // }}
            wrapperCol={{
              span: 24,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={(val) => this.addUserConfirm(val)}
            onFinishFailed={() => this.props.toggleAddModelVisibility()}
            autoComplete="off"
            ref={this.addRestFormRef}
          >
            <Form.Item
              label="Name"
              name="restaurantName"
              initialValue=""
              rules={[
                {
                  message: 'Please enter restaurant name!',
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.List name="locations"
              {...dynamicLayout}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...dynamicLayout}
                        {...restField}
                        name={[name, 'locationName']}
                        fieldKey={[fieldKey, 'locationName']}
                        rules={[{ required: true, message: 'Location is missing' }]}
                      >
                        <Input placeholder="Location" />
                      </Form.Item>
                      <Form.Item
                        {...dynamicLayout}
                        {...restField}
                        name={[name, 'locationAddress']}
                        fieldKey={[fieldKey, 'locationAddress']}
                        rules={[{ required: true, message: 'Missing Location Address' }]}
                      >
                        <Input placeholder="Location Address" />
                      </Form.Item>
                      <Form.Item
                        {...dynamicLayout}
                        {...restField}
                        name={[name, 'posLink']}
                        fieldKey={[fieldKey, 'posLink']}
                        rules={[{ required: true, message: 'Missing POS Link' }]}
                      >
                        <Input placeholder="POS" />
                      </Form.Item>
                      <Form.Item
                        {...dynamicLayout}
                        {...restField}
                        name={[name, 'departmentMasterIds']}
                        fieldKey={[fieldKey, 'departmentMasterIds']}
                        rules={[{ required: true, message: 'Missing Department name' }]}
                      >
                        <Select
                          style={{ width: "14rem" }}
                          mode="multiple"
                          allowClear
                          // style={{ width: '100%' }}
                          placeholder="Departments"
                          defaultValue={[]}
                        // onChange={handleChange}
                        >
                          {children}
                        </Select>
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

import React from 'react';
import './Shifts.css';
import './shiftfont.css';

import { Row, Col, Container, Dropdown, Table } from 'react-bootstrap';
import {
  getShiftAction,
  bidShiftAction,
  unBidShiftAction,
} from './ShiftActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { DatePicker, Space } from 'antd';
import { Pagination, Empty } from 'antd';
import { StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';
import { AsyncPaginate } from 'react-select-async-paginate';
import { getAllRestaurants } from '../../Services/RestaurantService';
import { getAllLocations } from '../../Services/LocationsService';
import useDidMountEffect from '../../Helpers/UseDidMountEffect';
import { LEFT_ARROW, RIGHT_ARROW } from '../../Helpers/IconsHelper';

const size = 10;

const UserShifts = () => {
  const dispatch = useDispatch();

  const [data, setdata] = useState([]);
  const [date, setdate] = useState(moment());
  const [page, setpage] = useState(1);
  const [filter, setFilters] = useState({
    restaurantId: '',
    locationId: '',
  });

  useDidMountEffect(() => {
    getShifts(moment(date).format('YYYY/MM/DD'), 1);
  }, [date]);
  useDidMountEffect(() => {
    getShifts(moment(date).format('YYYY/MM/DD'), page);
  }, [page]);

  useEffect(() => {
    getShifts(moment().format('YYYY/MM/DD'), 1);
  }, []);

  const getShifts = (date, page) => {
    dispatch(
      getShiftAction(date, date, size, page, (data) => {
        setdata(data);
      }),
    );
  };

  const unbidShift = (id) => {
    dispatch(
      unBidShiftAction(id, (data) => {
        getShifts(moment(date).format('YYYY/MM/DD'), page);
      }),
    );
  };
  const bidShift = (id) => {
    dispatch(
      bidShiftAction(id, (data) => {
        getShifts(moment(date).format('YYYY/MM/DD'), page);
      }),
    );
  };
  const loadRestaurants = async (search, loadedOptions, { page }) => {
    let qParams = {
      page: page,
      search: search,
    };

    let data = await getAllRestaurants(qParams.page, qParams.search).then(
      (res) => {
        return {
          options:
            res.data.data.results &&
            res.data.data.results.map((item) => {
              return {
                key: item.id,
                value: item.id,
                label: item.restaurantName,
              };
            }),
          totalPage:
            parseInt(res.data.data.pageMeta.totalCount || 0) /
            parseInt(res.data.data.pageMeta.pageCount || 0),
        };
      },
    );

    return {
      options: data.options,
      hasMore: data.totalPage > page ? true : false,
      additional: {
        page: page + 1,
      },
    };
  };
  const loadLocations = async (search, loadedOptions, { page }) => {
    let data = await getAllLocations(filter?.restaurantId, page, search).then(
      (res) => {
        return {
          options:
            res.data.data.results &&
            res.data.data.results.map((item) => {
              return {
                key: item.id,
                value: item.id,
                label: item.locationName,
              };
            }),
          totalPage:
            parseInt(res.data.data.pageMeta.totalCount || 0) /
            parseInt(res.data.data.pageMeta.pageCount || 0),
        };
      },
    );

    return {
      options: data.options,
      hasMore: data.totalPage > page ? true : false,
      additional: {
        page: page + 1,
      },
    };
  };
  function rowStyleFormat(rowIdx) {
    return { backgroundColor: rowIdx % 2 === 0 ? '#fff' : '#f5f5f7' };
  }
  return (
    <Container fluid className="px-4 py-4">
      <Row>
        <Col md={4}>
          <h2 className="Meeting-heading" style={{ color: '#e06030' }}>
            Shift Pool
          </h2>
        </Col>
        <Col
          md={8}
          className="d-flex justify-content-end px-4  align-self-end mb-3"
        >
          <small className="pagination-indicator">
            {(page - 1) * size <= 0 ? 1 : (page - 1) * size} -{' '}
            {data?.results?.length * page} of {data?.pageMeta?.totalCount || 0}
          </small>
        </Col>
      </Row>

      <div className="filter-container my-1">
        <div style={{ fontSize: '1.5rem' }}>
          <img
            src={LEFT_ARROW}
            className="mr-2"
            style={{ height: 20, width: 20 }}
            data-toggle="tooltip"
            title="Next Week!"
            alt="<"
            onClick={() => {
              setdate(moment(date).subtract(1, 'd'));
            }}
          />
          <small className="pagination-indicator">
            {moment(date).format('YYYY/MM/DD')}
          </small>
          <img
            src={RIGHT_ARROW}
            className="ml-2"
            style={{ height: 20, width: 20 }}
            data-toggle="tooltip"
            title="Next Week!"
            alt="<"
            onClick={() => {
              setdate(moment(date).subtract(1, 'd'));
            }}
          />
        </div>
        <div className="d-flex">
          <div
            style={{
              fontWeight: '800',
              marginTop: '6px',
              paddingInline: '10px',
            }}
          >
            <small style={{ fontSize: 16, color: '#4c4c4c' }}>Filter By:</small>
          </div>

          <div className="department">
            <Dropdown>
              <div
                className="shadow"
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '25px',
                  width: '150px',
                }}
              >
                <DatePicker
                  bordered={false}
                  onChange={(date, dateString) => {
                    console.log(date, dateString);
                    setdate(date);
                  }}
                  className="date-picker"
                  value={date}
                  allowClear={false}
                  defaultValue={date}
                  // suffixIcon={null}
                />
              </div>
            </Dropdown>
          </div>
          {/* <div className="drp-select-group">
            <div className="drp-select-group">
              <AsyncPaginate
                loadOptions={loadRestaurants}
                additional={{
                  page: 1,
                }}
                placeholder="Restaurants"
                isClearable={true}
                isSearchable={true}
                classNamePrefix="select"
                onChange={(e) => {
                  console.log('change', e);
                  setFilters((prevState) => ({
                    ...prevState,
                    restaurantId: e?.key,
                  }));
                  //   setFilters({restaurantId})
                  //   this.selectOptionRestaurant(e);
                }}
              />
            </div>
          </div>
          <div className="drp-select-group">
            <AsyncPaginate
              loadOptions={loadLocations}
              additional={{
                page: 1,
              }}
              isDisabled={!filter?.restaurantId}
              placeholder="Locations"
              //   cacheUniqs={[contentType, clearCache]}
              isClearable={true}
              isSearchable={true}
              classNamePrefix="select"
              onChange={(e) => {
                setFilters((prevState) => ({
                  ...prevState,
                  locationId: e?.key,
                }));
              }}
            />
          </div> */}
        </div>
      </div>
      <Table className="shiftpool-table text-center" column={4} striped>
        <thead className="shift-table-header">
          <tr style={{ backgroundColor: 'transparent' }}>
            <th>Shift</th>
            <th>Location</th>
            <th>Department</th>
            {/* <th>Role</th> */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center shift-table-body">
          {data?.results?.map((shift, index) => (
            <tr
              key={shift?.id}
              className={index % 2 === 0 ? 'table-e-tr' : 'table-o-tr'}
            >
              <td className="py-2">
                {moment(shift?.from).format('hh:mm a')}-
                {moment(shift?.to).format('hh:mm a')}
              </td>
              <td className="py-2">
                {shift?.department?.location?.locationAddress}
              </td>
              <td className="py-2">{shift?.department?.departmentName}</td>
              {/* <td className="py-2">Call Center</td> */}
              <td className="py-2 d-flex justify-content-center">
                <label class="switch2 mr-3">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) bidShift(shift?.id);
                      else unbidShift(shift?.id);
                    }}
                    checked={shift?.isBid}
                    defaultChecked={shift?.isBid}
                  />
                  <div class="slider2 round2"></div>
                </label>

                {/* <div className="edit-bid">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pencil-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                  </svg>
                </div> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {data?.results?.length === 0 && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      <Pagination
        onChange={(page) => setpage(page)}
        total={data?.pageMeta?.totalCount || 0}
        pageSize={size}
        hideOnSinglePage={true}
      />
    </Container>
  );
};

export default UserShifts;

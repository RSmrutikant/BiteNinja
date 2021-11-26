import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Views, Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CustomToolbar from './CustomToolbar';
import EventDetails from './eventDetails';
import './calendar.css';
import { getAllRestaurants } from '../../Services/RestaurantService';
import { getAllLocations } from '../../Services/LocationsService';
import { getAllDepartments } from '../../Services/DepartmentService';
import {
    createCalendar,
    getCalendar,
    publishEvents,
} from '../../Services/CalendarService';
import { Dropdown, Button, Row, Col, Container } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import DatePickerHorizontal from '../../Components/DatePickerHorizontal/DatePickerHorizontal';
import { AsyncPaginate } from 'react-select-async-paginate';
import { showErrorToastMessage } from '../../Utils/ToastUtil';
import { SearchOutlined, CloudUploadOutlined } from '@ant-design/icons';

const CalendarView = ['day', 'week'];
const localizer = momentLocalizer(moment);
class EventCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            eventType: 'add',
            newIndex: 0,
            eventInfo: {},
            events: [],
            locations: [],
            restaurants: [],
            activeLocation: '',
            activeRestaurant: '',
            activeRestaurantLabel: '',
            activeLocationLabel: '',
            activeDepartmentLabel: '',
            locationLoading: false,
            restaurantLoading: false,
            isRestaurantSelected: false,
            isLocationSelected: false,
            isDepartmentSelected: true,
            isSearching: false,
            filterDepartment: '',
            activeDepartment: '',
            contentType: 3,
            clearCache: false,
            clearCacheDept: false
        }
        this.handleHide = this.handleHide.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        this.addEvent = this.addEvent.bind(this);
        this.updateEvent = this.updateEvent.bind(this);
        this.selectedDay = this.selectedDay.bind(this);
    }

    fetchAllLocations = async () => {
        try {
            const { activeRestaurant } = this.state;
            const res = await getAllLocations(activeRestaurant);
            const { data } = res;
            const { success } = data;
            const locations = data?.data;
            if (success) {
                console.log('location In', locations)
                this.setState({ locations: locations });
            }
        } catch (error) {
            console.error(error);
        }
    }

    fetchAllRestaurants = async (qParams) => {
        try {
            const res = await getAllRestaurants(qParams.page, qParams.search);
            const { data } = res;
            const { success } = data;
            const restaurants = data?.data;
            if (success) {
                this.setState({ restaurants: restaurants });
            }
        } catch (error) {
            console.error(error);
        }
    }

    componentWillMount = async () => {
    }

    handleHide() {
        this.setState({ showModal: false });
    }

    handleShow(slotInfo, eventType) {
        let currentIndex = this.state.events.length;
        if (eventType == 'add') this.setState(
            { showModal: true, eventType: eventType, eventInfo: slotInfo, newIndex: currentIndex }
        );
    }

    deleteEvent(id) {
        // this.props.dispatch({
        //     type: types.REMOVE_EVENT,
        //     payload: id
        // });
        this.setState({ showModal: false });
    }

    addEvent = async (obj) => {
        // this.props.dispatch({
        //     type: types.ADD_EVENT,
        //     payload: obj
        // });
        const {
            activeRestaurant,
            activeLocation,
            activeDepartment
        } = this.state;

        const days = [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat'
        ];
        let daysToSend = [];
        let dayKey = Object.keys(obj.days);
        if (!isEmpty(dayKey)) {
            daysToSend = dayKey.map((data) => {
                return days.indexOf(data);
            });
        }
        let payLoad = {
            fromDate: moment(obj.start).format('YYYY-MM-DD'),
            toDate: moment(obj.end).format('YYYY-MM-DD'),
            fromTime: moment(obj.start).format('HH:mm'),
            toTime: moment(obj.end).format('HH:mm'),
            tagColor: obj.hexColor,
            dayOfWeek: daysToSend
        };

        // check whether active location and active restaurant are set 
        if (!activeRestaurant || !activeLocation || !activeDepartment) {
            showErrorToastMessage('Restaurant or Location is not yet selected !');
            this.setState({ showModal: false });
        } else {
            await createCalendar(activeRestaurant, activeLocation, activeDepartment, payLoad);
            this.setState({ showModal: false });
            this.handleClick();
            // window.location.reload();
        }

    }

    deleteEvent(id) {
        // this.props.dispatch({
        //     type: types.REMOVE_EVENT,
        //     payload: id
        // });
        this.setState({ showModal: false });
    }

    // addEvent = async (obj) => {
    //     // this.props.dispatch({
    //     //     type: types.ADD_EVENT,
    //     //     payload: obj
    //     // });
    //     const { activeRestaurant, activeLocation, activeDepartment } = this.state;

    //     const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    //     let daysToSend = [];
    //     let dayKey = Object.keys(obj.days);
    //     if (!isEmpty(dayKey)) {
    //         daysToSend = dayKey.map((data) => {
    //             return days.indexOf(data);
    //         });
    //     }
    //     let payLoad = {
    //         fromDate: moment(obj.start).format('YYYY-MM-DD'),
    //         toDate: moment(obj.end).format('YYYY-MM-DD'),
    //         fromTime: moment(obj.start).format('HH:mm'),
    //         toTime: moment(obj.end).format('HH:mm'),
    //         dayOfWeek: daysToSend,
    //     };

    //     // check whether active location and active restaurant are set
    //     if (!activeRestaurant || !activeLocation || !activeDepartment) {
    //         showErrorToastMessage('Restaurant or Location is not yet selected !');
    //         this.setState({ showModal: false });
    //     } else {
    //         await createCalendar(
    //             activeRestaurant,
    //             activeLocation,
    //             activeDepartment,
    //             payLoad,
    //         );
    //         this.setState({ showModal: false });
    //         this.handleClick();
    //         // window.location.reload();
    //     }
    // };

    updateEvent(obj) {
        // this.props.dispatch({
        //     type: types.UPDATE_EVENT,
        //     payload: {
        //         id: obj.id,
        //         obj: obj
        //     }
        // });
        this.setState({ showModal: false });
    }

    eventStyle(event, start, end, isSelected) {
        var bgColor = event.tagColor ? event.tagColor : '#265985';
        var style = {
            backgroundColor: bgColor,
            'box-shadow': '0 3px 10px rgb(0 0 0 / 0.2)',
            opacity: 1,
            color: 'white',
            border: '1px solid gray',
            display: 'block',
            width: '25%',
            margin: '0px 10px 0px 10px',
        };
        return {
            style: style,
        };
    }

    handleDropdownClick(e) {
        console.log('here ', e);
    }

    publishEvents = async () => {
        const { activeRestaurant, activeLocation } = this.state;
        await publishEvents(activeRestaurant, activeLocation);
    };

    selectedDay = (val) => {
        console.log(val);
    };

    selectOptionLocation = (e) => {
        const { clearCacheDept } = this.state;
        if (e != null) {
            let locationId = e.key;
            this.setState({
                activeLocation: locationId,
                isLocationSelected: true,
                activeLocationLabel: e,
                clearCacheDept: !clearCacheDept
            });
        } else this.setState({
            activeLocation: '',
            filterDepartment: '',
            isLocationSelected: false,
            activeLocationLabel: e,
            activeDepartmentLabel: e,
            clearCacheDept: !clearCacheDept
        });
    };

    loadLocations = async (search, loadedOptions, { page }) => {
        const { activeRestaurant } = this.state;
        let qParams = {
            restaurantRef: activeRestaurant,
            page: page,
            search: search,
        };
        console.log('search', search);
        let data = await getAllLocations(
            qParams.restaurantRef,
            qParams.page,
            qParams.search,
        ).then((res) => {
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
        });

        return {
            options: data.options,
            hasMore: data.totalPage > page ? true : false,
            additional: {
                page: page + 1,
            },
        };
    };

    selectOptionRestaurant = (e) => {
        const { clearCache } = this.state;
        if (e != null) {
            let restaurantId = e.key;
            this.setState({
                activeRestaurant: restaurantId,
                isRestaurantSelected: true,
                activeRestaurantLabel: e,
                clearCache: !clearCache,
            });
        } else this.setState({
            activeRestaurant: '',
            activeRestaurantLabel: e,
            activeLocationLabel: e,
            activeDepartmentLabel: e,
            filterDepartment: '',
            isRestaurantSelected: false,
            isLocationSelected: false,
            clearCache: !clearCache,
        });
    };

    loadRestaurants = async (search, loadedOptions, { page }) => {
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

    selectOptionDepartmentsFilter = (e) => {
        if (e != null) {
            let departmentId = e.key;
            this.setState({
                filterDepartment: departmentId,
                activeDepartmentLabel: e,
                isDepartmentSelected: true,
            });
        } else this.setState({
            filterDepartment: '',
            isDepartmentSelected: false,
            activeDepartmentLabel: e,
        });
    };

    selectOptionDepartments = (e) => {
        if (e != null) {
            let departmentId = e.key;
            this.setState({
                activeDepartment: departmentId,
                isDepartmentSelected: true,
            });
        } else this.setState({
            activeDepartment: '',
            isDepartmentSelected: false,
        });
    };

    loadDepartments = async (search, loadedOptions, { page }) => {
        const { activeRestaurant, activeLocation } = this.state;
        let qParams = {
            restaurantRef: activeRestaurant,
            locationRef: activeLocation,
            page: page,
            search: search,
        };

        let data = await getAllDepartments(
            qParams.restaurantRef,
            qParams.locationRef,
            qParams.page,
            qParams.search,
        ).then((res) => {
            return {
                options:
                    res.data.data.results &&
                    res.data.data.results.map((item) => {
                        return {
                            key: item.id,
                            value: item.id,
                            label: item.departmentName,
                        };
                    }),
                totalPage:
                    parseInt(res.data.data.pageMeta.totalCount || 0) /
                    parseInt(res.data.data.pageMeta.pageCount || 0),
            };
        });

        return {
            options: data.options,
            hasMore: data.totalPage > page ? true : false,
            additional: {
                page: page + 1,
            },
        };
    };

    handleClick = async () => {
        this.setState({ isSearching: true });
        const { activeLocation, activeRestaurant, filterDepartment } = this.state;

        let fromDate = moment().format('YYYY-MM-DD');
        let toDate = moment().add('90', 'days').format('YYYY-MM-DD');
        // get the calendar events
        let res = await getCalendar(
            activeRestaurant,
            activeLocation,
            filterDepartment,
            fromDate,
            toDate,
        );
        const { data } = res;
        const { success } = data;
        const events = data?.data;
        if (success) {
            let eventsArray = [];
            for (let i = 0; i < events.length; i++) {
                eventsArray.push({
                    title: events[i].department.departmentName,
                    start: new Date(events[i].from),
                    end: new Date(events[i].to),
                    tagColor: events[i].tagColor
                });
            }
            this.setState({
                events: eventsArray,
                isSearching: false,
            });
        } else {
            showErrorToastMessage('Not able to Fetch Calendar !');
            this.setState({
                isSearching: false,
            });
        }
    };

    render() {
        const {
            restaurants,
            locations,
            isRestaurantSelected,
            isLocationSelected,
            activeRestaurant,
            activeLocation,
            isSearching,
            contentType,
            clearCache,
            activeRestaurantLabel,
            activeLocationLabel,
            activeDepartmentLabel,
            clearCacheDept
        } = this.state;
        return (
            <Container fluid className="px-4 py-4">
                <Row md={12} className="mb-4">
                    <Col md={4}>
                        <h2 className="Meeting-heading">Create Shift</h2>
                        {/* <select className="shift-entries-drpdwn" name="shift" id="shifts">
                            <option value="volvo">Create Shift</option>
                            <option value="saab">Available Shifts</option>
                            <option value="opel">Completed Shifts</option>
                        </select> */}
                    </Col>
                    {/* <Col>
                        <div className="row-reverse">
                            <span className="drp-btn-group">
                                <Dropdown onSelect={this.handleDropdownClick}>
                                    <Dropdown.Toggle variant="info" className="drp-btn">
                                        Month
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu></Dropdown.Menu>
                                </Dropdown>
                            </span>
                            <span className="drp-btn-group">
                                <Dropdown
                                    onSelect={function (evt) {
                                        console.log(evt);
                                    }}
                                >
                                    <Dropdown.Toggle variant="info" className="drp-btn">
                                        Year
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu></Dropdown.Menu>
                                </Dropdown>
                            </span>
                        </div>
                    </Col> */}
                </Row>
                {/* <Row>
                    <DatePickerHorizontal
                        getSelectedDay={this.selectedDay}
                        labelFormat={'MMMM'}
                        color={'black'}
                    />
                </Row> */}
                <EventDetails
                    showModal={this.state.showModal}
                    handleHide={this.handleHide}
                    eventType={this.state.eventType}
                    eventInfo={this.state.eventInfo}
                    clearCache={clearCache}
                    newIndex={this.state.newIndex}
                    isLocationSelected={isLocationSelected}
                    activeRestaurant={activeRestaurant}
                    activeLocation={activeLocation}
                    deleteEvent={this.deleteEvent}
                    addEvent={this.addEvent}
                    updateEvent={this.updateEvent}
                    selectDepartment={this.selectOptionDepartments}
                />

                <div className="row-reverse" style={{ "height": "5vh" }}>
                    <span className="drp-btn-group">
                        <CloudUploadOutlined
                            data-toggle="tooltip" title="Publish"
                            onClick={() => this.publishEvents()}
                        />
                        {/* <Button variant="success" onClick={() => this.publishEvents()}>
                            Publish
                        </Button> */}
                    </span>
                    <span className="drp-btn-group">
                        <SearchOutlined
                            data-toggle="tooltip" title="Search"
                            disabled={!isLocationSelected}
                            onClick={!isSearching ? this.handleClick : null}
                        />
                        {/* <Button
                            variant="primary"
                            disabled={!isLocationSelected}
                            onClick={!isSearching ? this.handleClick : null}
                        > */}
                        {/* {isSearching ? 'Loading…' : 'Search'} */}
                        {/* </Button> */}
                    </span>
                    <span className="drp-select-group">
                        <AsyncPaginate
                            styles={{
                                // Fixes the overlapping problem of the component
                                menu: (provided) => ({ ...provided, zIndex: 9999 }),
                            }}
                            value={activeDepartmentLabel}
                            loadOptions={this.loadDepartments}
                            additional={{
                                page: 1,
                            }}
                            placeholder="Departments"
                            cacheUniqs={[contentType, clearCacheDept]}
                            isDisabled={!isLocationSelected}
                            isClearable={true}
                            isSearchable={true}
                            classNamePrefix="select"
                            onChange={(e) => {
                                this.selectOptionDepartmentsFilter(e);
                            }}
                        />
                    </span>
                    <span className="drp-select-group">
                        <AsyncPaginate
                            value={activeLocationLabel}
                            menuContainerStyle={{ 'zIndex': 9999999999999 }}
                            loadOptions={this.loadLocations}
                            additional={{
                                page: 1,
                            }}
                            isDisabled={!isRestaurantSelected}
                            placeholder="Locations"
                            cacheUniqs={[contentType, clearCache]}
                            isClearable={true}
                            isSearchable={true}
                            classNamePrefix="select"
                            onChange={(e) => {
                                this.selectOptionLocation(e);
                            }}
                        />
                    </span>
                    <span className="drp-select-group">
                        <AsyncPaginate
                            loadOptions={this.loadRestaurants}
                            additional={{
                                page: 1,
                            }}
                            value={activeRestaurantLabel}
                            placeholder="Restaurants"
                            isClearable={true}
                            isSearchable={true}
                            classNamePrefix="select"
                            onChange={(e) => {
                                this.selectOptionRestaurant(e);
                            }}
                        />
                    </span>
                </div>
                <Calendar
                    selectable
                    localizer={localizer}
                    events={this.state.events}
                    defaultView={Views.WEEK}
                    step={60}
                    showMultiDayTimes
                    defaultDate={new Date(moment())}
                    onSelectEvent={(event) => this.handleShow(event, 'edit')}
                    onSelectSlot={(slotInfo) => this.handleShow(slotInfo, 'add')}
                    style={{ maxHeight: '75vh' }}
                    eventPropGetter={this.eventStyle}
                    components={{
                        toolbar: CustomToolbar(CalendarView, restaurants || [], () =>
                            this.handleDropdownClick(),
                        ),
                    }}
                />
            </Container >
        );
    }
}

function mapStateToProps(state) {
    var { events } = state;
    return {
        events,
    };
}

export default connect(mapStateToProps)(EventCalendar);

import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import './datetime.css';
import { AsyncPaginate } from "react-select-async-paginate";
import DateTimePicker from 'react-datetime-picker';
import { getAllDepartments } from "../../Services/DepartmentService";
const days = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
];
export default class EventDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: this.props.showModal,
            eventDetail: {
                id: this.props.eventType === 'add' ? this.props.newIndex : this.props.eventInfo.id,
                title: this.props.eventInfo && this.props.eventInfo.title ? this.props.eventInfo.title : null,
                start: this.props.eventInfo && this.props.eventInfo.start ? this.props.eventInfo.start : moment(),
                end: this.props.eventInfo && this.props.eventInfo.end ? this.props.eventInfo.end : moment,
                allDay: this.props.eventInfo.allDay ? true : false,
                hexColor: '#265985',
                notes: this.props.eventInfo.notes ? this.props.eventInfo.notes : '',
                days: {}
            }
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            showModal: nextProps.showModal,
            eventDetail: {
                id: nextProps.eventType === 'add' ? nextProps.newIndex : nextProps.eventInfo.id,
                title: nextProps.eventInfo && nextProps.eventInfo.title ? nextProps.eventInfo.title : '',
                start: new Date(nextProps.eventInfo && nextProps.eventInfo.start ? nextProps.eventInfo.start : moment()),
                end: new Date(nextProps.eventInfo && nextProps.eventInfo.end ? nextProps.eventInfo.end : moment()),
                allDay: nextProps.eventInfo.allDay ? true : false,
                hexColor: nextProps.eventInfo.hexColor ? nextProps.eventInfo.hexColor : '#265985',
                notes: nextProps.eventInfo.notes ? nextProps.eventInfo.notes : '',
                days: {}
            }
        });
    }

    changeHandler(e, ref) {
        var eventDetail = this.state.eventDetail;
        var val = '';
        if (ref !== "allDay") {
            if (ref === "start" || ref === "end") {
                val = new Date(moment(e));

            } else {
                val = e.target.value;
            }
        } else {
            var val = e.target.checked;
        }

        eventDetail[ref] = val;
        this.setState({ eventDetail });
    }

    handleOnChange(e) {
        const { eventDetail } = this.state;
        if (eventDetail.days) {
            if (eventDetail.days[e.target.value]) {
                eventDetail.days[e.target.value] = !eventDetail.days[e.target.value];
            } else eventDetail.days[e.target.value] = true;
        }
        this.setState({ eventDetail });
        console.log('this.state.events', eventDetail);

    }

    loadDepartments = async (search, loadedOptions, { page }) => {
        const { activeRestaurant, activeLocation } = this.props;
        let qParams = {
            restaurantRef: activeRestaurant,
            locationRef: activeLocation,
            page: page,
            search: search
        };

        let data = await getAllDepartments(qParams.restaurantRef, qParams.locationRef, qParams.page, qParams.search).then((res) => {
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

    render() {
        const { eventDetail } = this.state;
        return (
            <Modal show={this.state.showModal}
                onHide={this.props.handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">
                        Shift Summary
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        {/* <Row>
                            <Col md="4">
                                <label>Shift Name </label>
                            </Col>
                            <Col md="8">
                                <input type="text" className="form-control" placeholder="Enter the Shift Name" ref="title"
                                    value={this.state.eventDetail.title} onChange={(e) => this.changeHandler(e, "title")} />
                            </Col>
                        </Row>
                        <br /> */}
                        <Row>
                            <Col md="4">
                                <label> Department </label>
                            </Col>
                            <Col md="8">
                                <AsyncPaginate
                                    loadOptions={this.loadDepartments}
                                    additional={{
                                        page: 1,
                                    }}
                                    isDisabled={!this.props.isLocationSelected}
                                    cacheUniqs={[3, this.props.clearCache]}
                                    placeholder="Departments"
                                    isClearable={true}
                                    isSearchable={true}
                                    classNamePrefix="select"
                                    onChange={(e) => {
                                        this.props.selectDepartment(e);
                                    }}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="4">
                                <label> Start Date </label>
                            </Col>
                            <Col md="8">
                                {this.state.eventDetail.allDay ? <DateTimePicker value={this.state.eventDetail.start} format="dd-MM-y h:mm:ss a"
                                    timeFormat={false} onChange={(e) => this.changeHandler(e, "start")} /> :

                                    <DateTimePicker format="dd-MM-y h:mm:ss a" value={this.state.eventDetail.start} onChange={(e) => this.changeHandler(e, "start")} />
                                }
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md="4">
                                <label> End Date </label>
                            </Col>
                            <Col md="8">
                                {this.state.eventDetail.allDay ? <DateTimePicker value={this.state.eventDetail.end} format="dd-MM-y h:mm:ss a"
                                    timeFormat={false} onChange={(e) => this.changeHandler(e, "end")} /> :
                                    <DateTimePicker format="dd-MM-y h:mm:ss a" value={this.state.eventDetail.end} onChange={(e) => this.changeHandler(e, "end")} />}
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <label> Notes </label>
                            <textarea className="form-control" placeholder="Shift Notes" ref="notes" value={this.state.eventDetail.notes}
                                onChange={(e) => this.changeHandler(e, "notes")} />
                        </Row>
                        <br />
                        <Row>
                            <label> Days </label>
                            {days.map((data, idx) => {
                                let isChecked = eventDetail.days[data];
                                return <div className="day-wrap"><input type="checkbox" id={data} name={data} value={data} checked={isChecked} onChange={(e) => this.handleOnChange(e)} /><label className="day-wrap-label">{data}</label></div>;
                            })}
                        </Row>
                        <br />
                        <Row>
                            <label> Tag Color </label>
                            <input type="color" value={this.state.eventDetail.hexColor} onChange={(e) => this.changeHandler(e, "hexColor")}
                                style={{ marginRight: '20px', marginLeft: '5px' }} />
                        </Row>
                        <br />
                        {/* <Row>
                            <Col md="1">
                                <input type="checkBox" name="all_Day"
                                    value={this.state.eventDetail.id}
                                    checked={this.state.eventDetail.allDay}
                                    onChange={(e) => this.changeHandler(e, "allDay")} />
                            </Col>
                            <Col>
                                <label> All Day </label>
                            </Col>
                        </Row> */}
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Row>
                        <Col md="4">
                            {this.props.eventType === 'add' ? <Button variant="success" onClick={() => this.props.addEvent(this.state.eventDetail)}>Add</Button> :
                                <Button variant="warning" onClick={() => this.props.updateEvent(this.state.eventDetail)}>Update</Button>}
                            {this.props.eventType === 'add' ? null : <Button variant="danger" onClick={() => this.props.deleteEvent(this.state.eventDetail.id)}>Delete</Button>}
                        </Col>
                        <Col>
                            <Button variant="info" onClick={this.props.handleHide}>Close</Button>
                        </Col>
                    </Row>
                </Modal.Footer>

            </Modal >
        );
    }
}
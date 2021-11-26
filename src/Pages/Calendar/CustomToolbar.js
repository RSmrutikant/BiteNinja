import React from 'react';
import Toolbar from 'react-big-calendar/lib/Toolbar';
import {
  DoubleLeftOutlined,
  LeftOutlined,
  RightOutlined,
  DoubleRightOutlined
} from '@ant-design/icons'
import moment from 'moment';
import { Dropdown } from 'react-bootstrap';
import {
  DOUBLE_LEFT_ARROW,
  RIGHT_ARROW,
  DOUBLE_RIGHT_ARROW,
  LEFT_ARROW
} from '../../Helpers/IconsHelper';
const CustomToolbar = (CalendarView, restaurants, handleDropdownClick) => {
  return class CustomToolbar extends Toolbar {
    goToPrevMonth = () => {
      let mDate = this.props.date;
      let newDate = new Date(mDate);
      newDate.setMonth(mDate.getMonth() - 1)
      this.props.onNavigate('next', newDate);
    }

    goToNextMonth = () => {
      let mDate = this.props.date;
      let newDate = new Date(mDate);
      newDate.setMonth(mDate.getMonth() + 1)
      this.props.onNavigate('next', newDate);
    }

    handleDropDown = () => {
      console.log('Im called')
    }

    render() {
      console.log('The data her eus *---> ', DOUBLE_LEFT_ARROW);
      return (
        <>
          <div className='rbc-toolbar'>
            <span className="rbc-btn-group">
              <a onClick={() => this.goToPrevMonth()}>
                <img src={DOUBLE_LEFT_ARROW} className="rbc-toolbar-icons" data-toggle="tooltip" title="Previous Month!" alt="<<" />
                {/* <DoubleLeftOutlined data-toggle="tooltip" title="Previous Month!" /> */}
              </a>
              <a onClick={() => this.navigate('PREV')}>
                <img src={LEFT_ARROW} data-toggle="tooltip" title="Previous Week!" alt="<" />
                {/* <LeftOutlined data-toggle="tooltip" title="Previous Week!" /> */}
              </a>
              <a className="toolBtn" onClick={() => this.navigate('TODAY')} >Back to Today</a>
              <a onClick={() => this.navigate('NEXT')}>
                <img src={RIGHT_ARROW} className="rbc-toolbar-icons" data-toggle="tooltip" title="Next Week!" alt="<" />
                {/* <RightOutlined data-toggle="tooltip" title="Next Week!" /> */}
              </a>
              <a onClick={() => this.goToNextMonth()}>
                <img src={DOUBLE_RIGHT_ARROW} data-toggle="tooltip" title="Next Month!" alt="<" />
                {/* <DoubleRightOutlined data-toggle="tooltip" title="Next Month!" /> */}
              </a>
            </span>
            <span className="rbc-toolbar-label">Selected: {moment(this.props.date).format('YYYY')}, {this.props.label}</span>

            <span className="rbc-btn-group filter-btn">
              {CalendarView.map((data, idx) => {
                return <button className="bg-filter-off" onClick={() => this.props.onView(data)}><span className="label-filter-off">{data}</span></button>;
              })}
            </span>
          </div>
        </>
      );
    }

    navigate = action => {
      this.props.onNavigate(action)
    }
  }
}

export default CustomToolbar
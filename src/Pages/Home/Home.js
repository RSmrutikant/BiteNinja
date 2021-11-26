import './Home.css';
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


import {
    ELIPSE_PATH_1,
    ELIPSE_PATH_2,
    ELIPSE_PATH_3,
    ELIPSE_PATH_4,
    DAILY_GOAL,
    TODAY_EARN,
    WEEK_SHIFT
} from '../../Helpers/ImageHelper';

const Home = () => {
    const [dateState, setDateState] = useState(new Date())
    //Change Date Method 
    const changeDate = (e) => {
        setDateState(e)
    };
    const state = {

        series: [{
            name: 'Earning',
            data: [180, 120, 210, 190, 320, 240, 120]
        },
        ],
        options: {
            chart: {
                height: 250,
                type: 'area',
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                // colors: ['#FF7F00'],
            },
            optionsLine2: {
                chart: {
                    // id: 'tw',
                    group: 'social',
                    type: 'line',
                    height: 160,
                },
            },
            legend: {
                show: true,
                showForSingleSeries: false,
                showForNullSeries: true,
                showForZeroSeries: true,
                position: 'bottom',
                horizontalAlign: 'center',
                floating: false,
                fontSize: '14px',
                fontFamily: 'Helvetica, Arial',
                fontWeight: 400,
                formatter: undefined,
                inverseOrder: false,
                width: undefined,
                height: undefined,
                tooltipHoverFormatter: undefined,
                offsetX: 0,
                offsetY: 0,
                labels: {
                    colors: undefined,
                    useSeriesColors: false
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    gradientToColors: ['#00AC5D'],
                    shadeIntensity: 1,
                    type: 'horizontal',
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100, 100, 100]
                },
            },
            xaxis: { 
                categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                title: {
                    text: 'Day'
                },
            },
            yaxis: {
                title: {
                    text: 'Earning'
                },
            },
            markers: {
                size: 6
            },
            tooltip: {
                x: {
                    format: 'series.data'
                },
            },

        },


    };
    return (
        <>
        <div className="Home-Content">
            <div className="content2 content-box">
                <div className="today-earning">
                        <h3>Today's Earning</h3>
                        <h3 style={{paddingTop:'0.5rem', fontSize:'1.3rem'}}>25.350 <small style={{ backgroundColor: '#e06030',  borderRadius: '50px', padding: '4px 10px', fontWeight: '800', color: '#fff' }}>$</small></h3>
                        <div className="Todayearn-data">
                            <img src={TODAY_EARN} alt="" />
                        </div>
                </div>
            </div>
            <div className="content3 content-box">
                <div className="goal-achieved">
                        <h3>Daily Goal Achieved</h3>
                        <h3 style={{paddingTop:'0.5rem', fontSize:'1.3rem'}}>80 <small style={{ backgroundColor: '#e06030',  borderRadius: '50px', padding: '4px 8px', fontWeight: '800', color: '#fff' }}>%</small></h3>
                        <div className="goal-data">
                            <img src={DAILY_GOAL} alt="" />
                        </div>
                </div>
            </div>
            <div className="content4 content-box">
                <div className="weekly-earning">
                        <h3>Weekly Earning Report</h3>
                        <ReactApexChart options={state.options} series={state.series} type="line" height={300} />
                </div>
            </div>
            <div className="content5 content-box">
                <div className="weekly-report">
                        <h3>Weekly Shift Report</h3>
                        <div className="shift-data">
                            <img src={WEEK_SHIFT} alt="" />
                        </div>
                </div>
            </div>
            <div className="content6 content-box">
                <div className="upcoming-shifts">
                        <h3>Upcoming Shifts</h3>
                        <Calendar value={dateState}
                            onChange={changeDate} />
                </div>
            </div>
            <div className="content7 content-box">
                <h3 className="text-center">Stats</h3>
                <div className="stats">
                    <div className="value1 stat" style={{ backgroundImage: `url(${ELIPSE_PATH_1})`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
                        <h5>60%</h5>
                    </div>
                    <div className="value2 stat" style={{ backgroundImage: `url(${ELIPSE_PATH_2})`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
                        <h5>55%</h5>
                    </div>
                    <div className="value3 stat" style={{ backgroundImage: `url(${ELIPSE_PATH_3})`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
                        <h5>80%</h5>
                    </div>
                    <div className="value4 stat" style={{ backgroundImage: `url(${ELIPSE_PATH_4})`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
                        <h5>75%</h5>
                    </div>
                    <div className="value5 stat">
                        <h6>115k</h6>
                        <h6>85k</h6>
                    </div>
                    <div className="value6 stat">
                        <h6>60k</h6>
                        <h6>45k</h6>
                    </div>
                </div>
            </div>
            <div className="content8 content-box">
                <div className="table-nav d-flex">
                    <h3 className="mr-auto">Recommended Active Shifts</h3>
                    <h3 className="book-shift-btn mb-2"><a href="#/">Book Shifts</a></h3>

                </div>
                <div className="recommended-shifts">
                    <div className="table-wrapper">
                        <table className="shift-table table" >
                            <thead>
                                <tr>
                                    <th>Shift</th>
                                    <th>Role</th>
                                    <th>Location</th>
                                    <th>Department</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-2">July 19th, 2021, <br />4.00PM-7:30PM </td>
                                    <td className="py-2">Call Center</td>
                                    <td className="py-2">Baby Jack's Bartlett</td>
                                    <td className="py-2">Customer Service</td>
                                </tr>
                                <tr>
                                    <td className="py-2">July 19th, 2021, <br />4.00PM-7:30PM </td>
                                    <td className="py-2">Assistant Chef</td>
                                    <td className="py-2">TN Drive Thru</td>
                                    <td className="py-2">Cooking</td>
                                </tr>
                                <tr>
                                    <td className="py-2">July 19th, 2021, <br />4.00PM-7:30PM </td>
                                    <td className="py-2">Delivery Assistant</td>
                                    <td className="py-2">TN Drive Thru</td>
                                    <td className="py-2">Logistic</td>
                                </tr>
                                <tr>
                                    <td className="py-2">July 19th, 2021, <br />4.00PM-7:30PM </td>
                                    <td className="py-2">Call Center</td>
                                    <td className="py-2">Baby Jack's Bartlett</td>
                                    <td className="py-2">Customer Service</td>
                                </tr>
                                <tr>
                                    <td className="py-2">July 19th, 2021, <br />4.00PM-7:30PM </td>
                                    <td className="py-2">Assistant Chef</td>
                                    <td className="py-2">TN Drive Thru</td>
                                    <td className="py-2">Cooking</td>
                                </tr>
                                <tr>
                                    <td className="py-2">July 19th, 2021, <br />4.00PM-7:30PM </td>
                                    <td className="py-2">Delivery Assistant</td>
                                    <td className="py-2">TN Drive Thru</td>
                                    <td className="py-2">Logistic</td>
                                </tr>
                                <tr>
                                    <td className="py-2">July 19th, 2021, <br />4.00PM-7:30PM </td>
                                    <td className="py-2">Call Center</td>
                                    <td className="py-2">Baby Jack's Bartlett</td>
                                    <td className="py-2">Customer Service</td>
                                </tr>
                                <tr>
                                    <td className="py-2">July 19th, 2021, <br />4.00PM-7:30PM </td>
                                    <td className="py-2">Assistant Chef</td>
                                    <td className="py-2">TN Drive Thru</td>
                                    <td className="py-2">Cooking</td>
                                </tr>
                                <tr>
                                    <td className="py-2">July 19th, 2021, <br />4.00PM-7:30PM </td>
                                    <td className="py-2">Delivery Assistant</td>
                                    <td className="py-2">TN Drive Thru</td>
                                    <td className="py-2">Logistic</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
};

export default Home;
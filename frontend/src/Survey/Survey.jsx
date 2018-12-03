import React, { Component } from "react";
import moment from "moment";
import "react-day-picker/lib/style.css";
import { formatDate, parseDate } from "react-day-picker/moment";
import "rc-slider/assets/index.css";
import AuthService from '../AuthService/AuthService';
import Select from 'react-select';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Slider, Handles, Tracks, Ticks } from 'react-compound-slider';
import axios from "axios";

import "./Survey.css";
import ResultList from "../ResultList/ResultList";

import {AirportData} from "./_data/airports.js";
import {Track, Tick, Handle, SliderStyle, RailStyle} from "./_slider/slider-components";


/*
Author: Eunice Hew
Survey to generate travel results list
*/



class Survey extends Component {
    //Climate, start/end dates, price, food,  flightprice, tripcost, population, bars, events, attractions, distance

    static defaultProps = {
        numberOfMonths: 2,
    };

    constructor(props, context) {
        super(props, context);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.state = {
            // show: false,
            submit: false,
            from: undefined,
            to: undefined,
            selectedAirport: null,
            temperature: 20,
            density: 20,
            budget: 20,
            precipitation: 20,
            population: 20
        };

        this.submit = this.submit.bind(this);
        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        this.Auth = new AuthService();
    }

    handleDayClick(day) {
        const range = DateUtils.addDayToRange(day, this.state);
        this.setState(range);
    }

    handleResetClick() {
        this.setState(this.getInitialState());
    }

    handleSliderChange(name, value) {
        this.setState({
            [name]: value
        });
    }

    getInitialState() {
        return {
            from: undefined,
            to: undefined,
        };
    }

    handleAirportChange = (selectedAirport) => {
        this.setState({ selectedAirport });
        console.log(`Option selected:`, selectedAirport);
    };

    handleSubmit = (e) => {
        e.preventDefault();

        let validation = this.checkInput();
        if (validation) {
            //display error
            alert(validation.errMsg);
            return;
        }

        return this.sendRequest();
    };

    async sendRequest() {
        let url = "http://localhost:9008/v1/survey";

        let config = {
            headers: {
                "Authorization": this.Auth.getToken(),
                "Content-Type": "application/json"
            }
        };

        let payload = {
            airport: (this.state.selectedAirport.value) ? this.state.selectedAirport.value : this.state.selectedAirport,
            climate: this.state.temperature,
            population: this.state.population,
            precipitation: (100 - this.state.precipitation),
            density: this.state.density,
            expensive: this.state.budget,
            startDate: this.state.from,
            endDate: this.state.to,
        };

        console.log("payload: ");
        console.log(payload);

        try {
            let response = await axios.post(url, payload, config);
            console.log('****');
            console.log(response);
            if (response.data.message) alert(response.data.message);
        } catch(err) {
            console.log('####');
            console.log(err);
        }
    };

    checkInput = () => {
      let inputs = [
          {field:"selectedAirport", errMsg:"Please select an airport"},
          {field:"temperature", errMsg: "Please select your temperature preference"},
          {field:"population", errMsg: "Please select city size"},
          {field:"precipitation", errMsg: "Please select how much you dislike rain"},
          {field:"density", errMsg: "Please select whether you prefer a quiet or busy city"},
          {field:"budget", errMsg: "Please select your budget"},
          {field:"from", errMsg: "Please select travel dates"},
          {field:"to", errMsg: "Please select travel dates"},
          ];
      for (let input of inputs) {
          if (!this.state[input.field]) return input;
      }

      return null;
    };

    render() {

        const { from, to } = this.state;
        const {selectedAirport} = this.state;
        const modifiers = { start: from, end: to };

        let modal;
        if (this.state.submit) {
            modal = <ResultList />;
        }
        return (
            <div className="w-screen h-screen mb-32">
                <div className="bg-white p-8 text-center">
                    Travel Destination Awaits
                </div>

                <div className="w-1/2 mx-auto">
                    <div className="w-full text-center">
                        <h4 className="py-4">Which airport are you closest to?</h4>
                    </div>
                    <Select
                        value={selectedAirport}
                        onChange={this.handleAirportChange}
                        options={AirportData}
                    />
                </div>



                <div className="pt-8">
                    <div className="w-full text-center">
                        <h4 className="">Dates of Travel</h4>
                    </div>
                    <div className="w-full text-center">
                        <p>
                            {!from && !to && 'Please select the first day.'}
                            {from && !to && 'Please select the last day.'}
                            {from &&
                            to &&
                            `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
                            {from &&
                            to && (
                                <button className="link" onClick={this.handleResetClick}>
                                    Reset
                                </button>
                            )}
                        </p>
                        <DayPicker
                            className="Selectable mx-auto w-full"
                            numberOfMonths={this.props.numberOfMonths}
                            selectedDays={[from, { from, to }]}
                            modifiers={modifiers}
                            onDayClick={this.handleDayClick}
                        />
                    </div>
                </div>



                <div className="w-1/2 pt-8 mx-auto">
                    <div className="w-full text-center">
                        <h4 className="">What temperature do you like?</h4>
                    </div>
                    <Slider
                        rootStyle={SliderStyle}
                        domain={[0, 100]}
                        step={1}
                        mode={2}
                        values={[20]}
                        onChange={(values) => this.handleSliderChange("temperature", values[0])}
                    >
                        <div style={RailStyle} />
                        <Handles>
                            {({ handles, getHandleProps }) => (
                                <div className="slider-handles">
                                    {handles.map(handle => (
                                        <Handle
                                            key={handle.id}
                                            handle={handle}
                                            getHandleProps={getHandleProps}
                                        />
                                    ))}
                                </div>
                            )}
                        </Handles>
                        <Tracks right={false}>
                            {({ tracks, getTrackProps }) => (
                                <div className="slider-tracks">
                                    {tracks.map(({ id, source, target }) => (
                                        <Track
                                            key={id}
                                            source={source}
                                            target={target}
                                            getTrackProps={getTrackProps}
                                        />
                                    ))}
                                </div>
                            )}
                        </Tracks>
                        <Ticks values={[0, 25, 50, 75, 100]}>
                            {({ ticks }) => (
                                <div className="slider-ticks">
                                    {ticks.map(tick => (
                                        <Tick key={tick.id} tick={tick} count={ticks.length} />
                                    ))}
                                </div>
                            )}
                        </Ticks>
                    </Slider>
                </div>


                <div className="w-1/2 pt-8 mx-auto">
                    <div className="w-full text-center">
                        <h4 className="">Quiet or Busy?</h4>
                    </div>
                    <Slider
                        rootStyle={SliderStyle}
                        domain={[0, 100]}
                        step={1}
                        mode={2}
                        values={[20]}
                        onChange={(values) => this.handleSliderChange("density", values[0])}
                    >
                        <div style={RailStyle} />
                        <Handles>
                            {({ handles, getHandleProps }) => (
                                <div className="slider-handles">
                                    {handles.map(handle => (
                                        <Handle
                                            key={handle.id}
                                            handle={handle}
                                            getHandleProps={getHandleProps}
                                        />
                                    ))}
                                </div>
                            )}
                        </Handles>
                        <Tracks right={false}>
                            {({ tracks, getTrackProps }) => (
                                <div className="slider-tracks">
                                    {tracks.map(({ id, source, target }) => (
                                        <Track
                                            key={id}
                                            source={source}
                                            target={target}
                                            getTrackProps={getTrackProps}
                                        />
                                    ))}
                                </div>
                            )}
                        </Tracks>
                        <Ticks values={[0, 25, 50, 75, 100]}>
                            {({ ticks }) => (
                                <div className="slider-ticks">
                                    {ticks.map(tick => (
                                        <Tick key={tick.id} tick={tick} count={ticks.length} />
                                    ))}
                                </div>
                            )}
                        </Ticks>
                    </Slider>
                </div>

                <div className="w-1/2 pt-8 mx-auto">
                    <div className="w-full text-center">
                        <h4 className="">How's your budget?</h4>
                    </div>
                    <Slider
                        rootStyle={SliderStyle}
                        domain={[0, 100]}
                        step={1}
                        mode={2}
                        values={[20]}
                        onChange={(values) => this.handleSliderChange("budget", values[0])}
                    >
                        <div style={RailStyle} />
                        <Handles>
                            {({ handles, getHandleProps }) => (
                                <div className="slider-handles">
                                    {handles.map(handle => (
                                        <Handle
                                            key={handle.id}
                                            handle={handle}
                                            getHandleProps={getHandleProps}
                                        />
                                    ))}
                                </div>
                            )}
                        </Handles>
                        <Tracks right={false}>
                            {({ tracks, getTrackProps }) => (
                                <div className="slider-tracks">
                                    {tracks.map(({ id, source, target }) => (
                                        <Track
                                            key={id}
                                            source={source}
                                            target={target}
                                            getTrackProps={getTrackProps}
                                        />
                                    ))}
                                </div>
                            )}
                        </Tracks>
                        <Ticks values={[0, 25, 50, 75, 100]}>
                            {({ ticks }) => (
                                <div className="slider-ticks">
                                    {ticks.map(tick => (
                                        <Tick key={tick.id} tick={tick} count={ticks.length} />
                                    ))}
                                </div>
                            )}
                        </Ticks>
                    </Slider>
                </div>

                <div className="w-1/2 pt-8 mx-auto">
                    <div className="w-full text-center">
                        <h4 className="">Small city or big city?</h4>
                    </div>
                    <Slider
                        rootStyle={SliderStyle}
                        domain={[0, 100]}
                        step={1}
                        mode={2}
                        values={[20]}
                        onChange={(values) => this.handleSliderChange("population", values[0])}
                    >
                        <div style={RailStyle} />
                        <Handles>
                            {({ handles, getHandleProps }) => (
                                <div className="slider-handles">
                                    {handles.map(handle => (
                                        <Handle
                                            key={handle.id}
                                            handle={handle}
                                            getHandleProps={getHandleProps}
                                        />
                                    ))}
                                </div>
                            )}
                        </Handles>
                        <Tracks right={false}>
                            {({ tracks, getTrackProps }) => (
                                <div className="slider-tracks">
                                    {tracks.map(({ id, source, target }) => (
                                        <Track
                                            key={id}
                                            source={source}
                                            target={target}
                                            getTrackProps={getTrackProps}
                                        />
                                    ))}
                                </div>
                            )}
                        </Tracks>
                        <Ticks values={[0, 25, 50, 75, 100]}>
                            {({ ticks }) => (
                                <div className="slider-ticks">
                                    {ticks.map(tick => (
                                        <Tick key={tick.id} tick={tick} count={ticks.length} />
                                    ))}
                                </div>
                            )}
                        </Ticks>
                    </Slider>
                </div>

                <div className="w-1/2 pt-8 mx-auto">
                    <div className="w-full text-center">
                        <h4 className="">How much do you dislike rain?</h4>
                    </div>
                    <Slider
                        rootStyle={SliderStyle}
                        domain={[0, 100]}
                        step={1}
                        mode={2}
                        values={[20]}
                        onChange={(values) => this.handleSliderChange("precipitation", values[0])}
                    >
                        <div style={RailStyle} />
                        <Handles>
                            {({ handles, getHandleProps }) => (
                                <div className="slider-handles">
                                    {handles.map(handle => (
                                        <Handle
                                            key={handle.id}
                                            handle={handle}
                                            getHandleProps={getHandleProps}
                                        />
                                    ))}
                                </div>
                            )}
                        </Handles>
                        <Tracks right={false}>
                            {({ tracks, getTrackProps }) => (
                                <div className="slider-tracks">
                                    {tracks.map(({ id, source, target }) => (
                                        <Track
                                            key={id}
                                            source={source}
                                            target={target}
                                            getTrackProps={getTrackProps}
                                        />
                                    ))}
                                </div>
                            )}
                        </Tracks>
                        <Ticks values={[0, 25, 50, 75, 100]}>
                            {({ ticks }) => (
                                <div className="slider-ticks">
                                    {ticks.map(tick => (
                                        <Tick key={tick.id} tick={tick} count={ticks.length} />
                                    ))}
                                </div>
                            )}
                        </Ticks>
                    </Slider>
                </div>

                <div className="mx-auto w-1/2 text-center my-8">
                    <form onSubmit={this.handleSubmit} className="">
                        <button className="bg-blue text-white w-48 mx-auto p-4" type="submit">Submit</button>
                    </form>
                </div>

            </div>
        );
    }

    showFromMonth() {
        const { from, to } = this.state;
        if (!from) {
            return;
        }
        if (moment(to).diff(moment(from), "months") < 2) {
            this.to.getDayPicker().showMonth(from);
        }
    }
    handleFromChange(from) {
        // Change the from date and focus the "to" input field
        this.setState({ from, until: from.setMonth(from.getMonth() + 3) });
        console.log("from :::", from);
        console.log("until :::", this.state.until);
    }
    handleToChange(to) {
        console.log(to);
        this.setState({ to }, this.showFromMonth);
    }

    onClickSubmit(e) {
        this.setState({ submit: true });
        // this.setState({ show: true });
    }

    submit(e) {
        e.preventDefault();
        this.Auth.login(this.state.email, this.state.password)
            .then(res => {
                this.props.history.replace("/ResultList");
            })
            .catch(err => {
                console.log(err);
                this.setState({ hasError: true });
            });
    }
    componentWillMount = () => {

    };

    componentWillUnmount = () => {
        document.body.classList.remove("SurveyBg");
    };
}
export default Survey;

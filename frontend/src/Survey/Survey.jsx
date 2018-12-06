import React, { Component } from "react";
import "react-day-picker/lib/style.css";
import "rc-slider/assets/index.css";
import AuthService from "../AuthService/AuthService";
import ResultList from "../ResultList/ResultList";
import DayPicker, { DateUtils } from "react-day-picker";
import Select from "react-select";
import "./_datepicker/datepicker.css";
import axios from "axios";

import { AirportData } from "./_data/airports.js";
import {
  Track,
  Tick,
  Handle,
  SliderStyle,
  RailStyle
} from "./_slider/slider-components";
import { Slider, Handles, Tracks, Ticks } from "react-compound-slider";
import "./survey2.css";

class Survey extends Component {
  static defaultProps = {
    numberOfMonths: 2
  };

  constructor(props, context) {
    super(props, context);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.Auth = new AuthService();
    this.state = {
      submit: false,
      from: undefined,
      to: undefined,
      selectedAirport: null,
      temperature: 20,
      density: 20,
      budget: 20,
      precipitation: 20,
      population: 20,
      busy: 20,
      bgImages: {
        temperature: {
          first: "url(https://i.ibb.co/60Dj2dh/temp-1-cropped.jpg)",
          second: "url(https://i.ibb.co/9qjpKCw/temp-2-cropped.jpg)",
          third: "url(https://i.ibb.co/q7zYFDR/temp-3-cropped.jpg)",
          fourth: "url(https://i.ibb.co/gw2KCVT/temp-4-cropped.jpg)"
        },
        density: {
          first: "url(https://i.ibb.co/LdYSwPn/density-1-cropped.jpg)",
          second: "url(https://i.ibb.co/YNwKZJW/density-2-cropped.jpg)",
          third: "url(https://i.ibb.co/jk7002d/density-3-cropped.jpg)",
          fourth: "url(https://i.ibb.co/LrVF0v8/density-4-cropped.jpg)"
        },
        budget: {
          first: "url(https://i.ibb.co/pw4V53Q/budget-1-cropped.jpg)",
          second: "url(https://i.ibb.co/DLqHVj4/budget-2-cropped.jpg)",
          third: "url(https://i.ibb.co/QnYSD73/buget-3-cropped.jpg)",
          fourth: "url(https://i.ibb.co/C2LRGq5/budget-4-cropped.jpg)"
        },
        precipitation: {
          first: "url(https://i.ibb.co/801XDJT/rain-1-cropped.jpg)",
          second: "url(https://i.ibb.co/BKzvwNP/rain-2-cropped.jpg)",
          third: "url(https://i.ibb.co/hDH6Jfz/rain-3-cropped.jpg)",
          fourth: "url(https://i.ibb.co/F7JG5m7/rain-4-cropped.jpg)"
        },
        population: {
          first: "url(https://i.ibb.co/2c1hgrr/population-1-cropped.jpg)",
          second: "url(https://i.ibb.co/7ynN6gp/population-2-cropped.jpg)",
          third: "url(https://i.ibb.co/Y0n8ndf/population-3-cropped.jpg)",
          fourth: "url(https://i.ibb.co/1bGQcwh/population-4-cropped.jpg)"
        },
        busy: {
          first: "url(https://i.ibb.co/N3w0fGW/popular-1-cropped.jpg)",
          second: "url(https://i.ibb.co/k1hn88G/popular-2-cropped.jpg)",
          third: "url(https://i.ibb.co/CHKf8Z7/popular-3-cropped.jpg)",
          fourth: "url(https://i.ibb.co/HTjHD3X/popular-4-cropped.jpg)"
        }
      }
    };
  }

  render() {
    const { from, to } = this.state;
    const { selectedAirport } = this.state;
    const modifiers = { start: from, end: to };
    let submit;

    if (this.checkInput() == null) {
      submit = <ResultList ts={this.getPayload()} />;
    } else {
      let err = this.checkInput().errMsg;
      submit = (
        <div className="w-full text-center text-2xl text-red font-bold">
          {" "}
          {err} to continue{" "}
        </div>
      );
    }

    return (
      <div className="w-full px-12 sm:w-600x sm:px-0  mx-auto mb-32">
        <div className="bg-white pt-8 pb-2 text-center font-bold text-2xl">
          Your Dream Vacation Awaits
        </div>
        <p className="text-center mb-8">
          Fill out our survey to get travel trip recommendations.
        </p>

        <div className="w-full mx-auto">
          <div className="w-full text-center">
            <h4 className="py-4">Which airport are you closest to?</h4>
          </div>
          <Select
            value={selectedAirport}
            onChange={this.handleAirportChange}
            options={AirportData}
          />
        </div>

        <div className="py-8">
          <div className="w-full text-center">
            <h4 className="">Dates of Travel</h4>
          </div>
          <div className="w-full text-center outline-none">
            <p>
              {!from && !to && "Please select the first day."}
              {from && !to && "Please select the last day."}
              {from &&
                to &&
                `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{" "}
              {from && to && (
                <button className="link" onClick={this.handleResetClick}>
                  Reset
                </button>
              )}
            </p>
            <DayPicker
              className="Selectable mx-auto w-full"
              numberOfMonths={this.props.numberOfMonths}
              selectedDays={[from, { from, to }]}
              disabledDays={{ before: new Date() }}
              modifiers={modifiers}
              onDayClick={this.handleDayClick}
            />
          </div>
        </div>

        <div className="w-full mx-auto mb-10">
          <div
            className="w-full h-150px text-white text-center slider flex flex-col font-bold"
            style={{ backgroundImage: this.mapBg("temperature") }}
          >
            <div className="slider-inside">
              <h4 className="w-full">What temperature do you prefer?</h4>
              <h5 className="w-full">(cold to hot)</h5>
            </div>
          </div>
          <Slider
            rootStyle={SliderStyle}
            domain={[1, 100]}
            step={1}
            mode={2}
            values={[20]}
            onChange={values =>
              this.handleSliderChange("temperature", values[0])
            }
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

        <div className="mx-auto mb-10">
          <div
            className="w-full h-150px text-white text-center slider flex flex-col font-bold"
            style={{ backgroundImage: this.mapBg("budget") }}
          >
            <div className="slider-inside">
              <h4 className="w-full">How's your budget?</h4>
              <h5 className="w-full">(low to high)</h5>
            </div>
          </div>
          <Slider
            rootStyle={SliderStyle}
            domain={[1, 100]}
            step={1}
            mode={2}
            values={[20]}
            onChange={values => this.handleSliderChange("budget", values[0])}
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

        <div className="mx-auto mb-10">
          <div
            className="w-full h-150px text-white text-center slider flex flex-col font-bold"
            style={{ backgroundImage: this.mapBg("density") }}
          >
            <div className="slider-inside">
              <h4 className="w-full">Somewhere remote or bustling?</h4>
            </div>
          </div>
          <Slider
            rootStyle={SliderStyle}
            domain={[1, 100]}
            step={1}
            mode={2}
            values={[20]}
            onChange={values => this.handleSliderChange("density", values[0])}
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

        <div className="mx-auto mb-10">
          <div
            className="w-full h-150px text-white text-center slider flex flex-col font-bold"
            style={{ backgroundImage: this.mapBg("population") }}
          >
            <div className="slider-inside">
              <h4 className="text-2xl sm:text-3xl w-full">
                Would you like to visit a small city or large city?
              </h4>
              <h5 className="w-full">(low to high)</h5>
            </div>
          </div>
          <Slider
            rootStyle={SliderStyle}
            domain={[1, 100]}
            step={1}
            mode={2}
            values={[20]}
            onChange={values =>
              this.handleSliderChange("population", values[0])
            }
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

        <div className="mx-auto mb-8">
          <div
            className="w-full h-150px text-white text-center slider flex flex-col font-bold"
            style={{ backgroundImage: this.mapBg("precipitation") }}
          >
            <div className="slider-inside">
              <h4 className="w-full">How much do you dislike the rain?</h4>
              <h5 className="w-full">
                (enjoy rain to avoid rain at all costs)
              </h5>
            </div>
          </div>
          <Slider
            rootStyle={SliderStyle}
            domain={[1, 100]}
            step={1}
            mode={2}
            values={[20]}
            onChange={values =>
              this.handleSliderChange("precipitation", values[0])
            }
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

        <div className="mx-auto mb-12">
          <div
            className="w-full h-150px text-white text-center slider flex flex-col font-bold"
            style={{ backgroundImage: this.mapBg("busy") }}
          >
            <div className="slider-inside">
              <h4 className="w-full">City that is less familiar or popular?</h4>
              <h5 className="w-full">(less familiar to popular)</h5>
            </div>
          </div>
          <Slider
            rootStyle={SliderStyle}
            domain={[1, 100]}
            step={1}
            mode={2}
            values={[20]}
            onChange={values => this.handleSliderChange("busy", values[0])}
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

        {submit}
      </div>
    );
  }

  mapBg(propName) {
    if (this.state[propName] < 26) {
      return this.state.bgImages[propName].first;
    } else if (this.state[propName] < 51) {
      return this.state.bgImages[propName].second;
    } else if (this.state[propName] < 76) {
      return this.state.bgImages[propName].third;
    } else {
      return this.state.bgImages[propName].fourth;
    }
  }

  handleDayClick(day) {
    if (DateUtils.isPastDay(day)) return;
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }

  handleResetClick() {
    this.setState(this.getInitialTravelDateState());
  }

  handleSliderChange(name, value) {
    this.setState({
      [name]: value
    });
  }

  getInitialTravelDateState() {
    return {
      from: undefined,
      to: undefined
    };
  }

  handleAirportChange = selectedAirport => {
    this.setState({ selectedAirport });
    console.log(`Option selected:`, selectedAirport);
  };

  handleSubmit = e => {
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
    let url = "http://localhost:5000/v1/survey";

    let config = {
      headers: {
        Authorization: this.Auth.getToken(),
        "Content-Type": "application/json"
      }
    };

    let startDate = this.state.from;
    let startDateFormatted =
      startDate.getMonth() +
      1 +
      "-" +
      startDate.getDate() +
      "-" +
      startDate.getFullYear();
    let endDate = this.state.to;
    let endDateFormatted =
      endDate.getMonth() +
      1 +
      "-" +
      endDate.getDate() +
      "-" +
      endDate.getFullYear();

    let payload = {
      airport: this.state.selectedAirport.value
        ? this.state.selectedAirport.value
        : this.state.selectedAirport,
      climate: this.state.temperature,
      population: this.state.population,
      precipitation: 100 - this.state.precipitation,
      busy: this.state.busy,
      density: this.state.density,
      expensive: this.state.budget,
      startDate: startDateFormatted,
      endDate: endDateFormatted
    };

    console.log(payload);

    try {
      let response = await axios.post(url, payload, config);
      console.log("****");
      console.log(response);
      if (response.data.message) alert(response.data.message);
    } catch (err) {
      console.log("####");
      console.log(err);
    }
  }

  getPayload = () => {
    let startDate = this.state.from;
    let startDateFormatted =
      startDate.getMonth() +
      1 +
      "-" +
      startDate.getDate() +
      "-" +
      startDate.getFullYear();
    let endDate = this.state.to;
    let endDateFormatted =
      endDate.getMonth() +
      1 +
      "-" +
      endDate.getDate() +
      "-" +
      endDate.getFullYear();

    return {
      airport: this.state.selectedAirport.value
        ? this.state.selectedAirport.value
        : this.state.selectedAirport,
      climate: this.state.temperature,
      population: this.state.population,
      precipitation: 100 - this.state.precipitation,
      busy: this.state.busy,
      density: this.state.density,
      expensive: this.state.budget,
      startDate: startDateFormatted,
      endDate: endDateFormatted
    };
  };

  checkInput = () => {
    let inputs = [
      { field: "selectedAirport", errMsg: "Please select an airport" },
      {
        field: "temperature",
        errMsg: "Please select your temperature preference"
      },
      { field: "population", errMsg: "Please select city size" },
      {
        field: "precipitation",
        errMsg: "Please select how much you dislike rain"
      },
      {
        field: "density",
        errMsg: "Please select whether you prefer a quiet or busy city"
      },
      { field: "budget", errMsg: "Please select your budget" },
      { field: "from", errMsg: "Please select travel dates" },
      { field: "to", errMsg: "Please select travel dates" }
    ];
    for (let input of inputs) {
      if (!this.state[input.field]) return input;
    }

    return null;
  };
}
export default Survey;

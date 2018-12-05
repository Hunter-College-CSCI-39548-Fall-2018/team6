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
          first:
            "url(https://previews.123rf.com/images/freeprod/freeprod1802/freeprod180200119/95725229-cold-winter-day-in-a-city-paris-france.jpg)",
          second:
            "url(https://www.rd.com/wp-content/uploads/2017/07/00_hike_Best-Hikes-Across-America—and-the-Best-Times-to-Go_421563208_aaronj9_FT.jpg)",
          third:
            "url(https://s25088.pcdn.co/wp-content/uploads/2014/07/Spring-banner-1.jpg)",
          fourth:
            "url(https://www.treebo.com/blog/wp-content/uploads/2017/12/Beaches-in-India_1.jpg)"
        },
        density: {
          first:
            "url(https://www.vistaprint.com/Sales/Utility/Img.caspx?s=%2Fvp%2Fimages%2Fvp-site%2Fconfigure-page%2Fbanners%2Fl-h%2F016-blank-001-2x.png&w=620&h=620&langid=1&q=85&c=0&hc=0042a76d&ie6=0)",
          second:
            "url(http://www.illuminera.com/Public/Home/img/joinUs_banner.jpg)",
          third:
            "url(http://www.peregrine.com.au/wp-content/uploads/sites/4/2017/05/Corporate-Careers-Banner-v3.1-e1496297812294.jpg)",
          fourth:
            "url(https://c8.alamy.com/comp/G1A0ED/crowd-of-people-banner-men-women-and-children-different-ethnic-groups-G1A0ED.jpg)"
        },
        budget: {
          first:
            "url(https://blog.edgenuity.com/wp-content/uploads/2016/01/piggy-bank-banner.png)",
          second: "url(http://sergalex.eu/uploads/banner4.jpg)",
          third:
            "url(http://tribecabeautyspa.com/wp-content/uploads/2016/04/main_banner_1.jpg)",
          fourth:
            "url(http://www.dulleslimoservice.us/images/All-%20Event_Limo_Service.png)"
        },
        precipitation: {
          first:
            "url(https://png.pngtree.com/thumb_back/fw800/back_pic/03/78/32/1757c1362c471f7.jpg)",
          second:
            "url(https://aboutforterie.com/wp-content/uploads/2018/09/rain-umbrella.jpg)",
          third:
            "url(http://www.f-covers.com/cover/abstract-rain-facebook-cover-timeline-banner-for-fb.jpg)",
          fourth:
            "url(https://thumbs.dreamstime.com/t/sunny-field-trees-sun-banner-4737982.jpg)"
        },
        population: {
          first:
            "url(https://static1.squarespace.com/static/58747545bf629a02f8a99a04/t/589e038bf7e0ab9817f02116/1486750604894/house-banner.jpg?format=2500w)",
          second:
            "url(https://image.shutterstock.com/image-vector/set-stock-vector-illustration-buildings-260nw-487356691.jpg)",
          third:
            "url(http://www.bu.edu/summer/common/images/st-home/home-banner.jpg)",
          fourth:
            "url(https://upload.wikimedia.org/wikipedia/commons/6/67/NYC_Top_of_the_Rock_Pano_banner.jpg)"
        },
        busy: {
          first:
            "url(http://www.enterpriseonline.sg/wp-content/uploads/2017/05/1408395530850.jpg)",
          second:
            "url(http://vnexpressnews.net/wp-content/uploads/2014/12/uWY7RMaQ.jpg)",
          third:
            "url(http://chinesetouristagency.com/wp-content/uploads/2013/05/chinese-tourists.jpg)",
          fourth:
            "url(https://cdn.shopify.com/s/files/1/0322/6285/articles/London-Heathrow-08L-airportraits_1400x.progressive.jpg?v=1478281632)"
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
      <div className="w-full sm:w-3/4 lg:w-1/2 px-12 mx-auto mb-32">
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
            className="w-full h-48 text-white text-center slider flex flex-col font-bold"
            style={{ backgroundImage: this.mapBg("temperature") }}
          >
            <div className="slider-inside">
              <h4 className="w-full">What temperature (F) do you prefer?</h4>
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
            className="w-full h-48 text-white text-center slider flex flex-col font-bold"
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
            className="w-full h-48 text-white text-center slider flex flex-col font-bold"
            style={{ backgroundImage: this.mapBg("density") }}
          >
            <div className="slider-inside">
              <h4 className="w-full">How bustling would you like it to be?</h4>
              <h5 className="w-full">(not crowded to bustling)</h5>
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
            className="w-full h-48 text-white text-center slider flex flex-col font-bold"
            style={{ backgroundImage: this.mapBg("population") }}
          >
            <div className="slider-inside">
              <h4 className="text-2xl sm:text-3xl w-full">
                Would you like to visit a small town or large city?
              </h4>
              <h5 className="w-full">(small to large)</h5>
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
            className="w-full h-48 text-white text-center slider flex flex-col font-bold"
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
            className="w-full h-48 text-white text-center slider flex flex-col font-bold"
            style={{ backgroundImage: this.mapBg("busy") }}
          >
            <div className="slider-inside">
              <h4 className="w-full">City that is less traveled or popular?</h4>
              <h5 className="w-full">(less traveled to popular)</h5>
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

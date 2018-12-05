import React, { Component } from "react";
import "./ResultList.css";
import { ListGroupItem, Media } from "react-bootstrap";
import Result from "../Result/Result";
// import { Redirect } from "react-router-dom";
import axios from "axios";

class RenderResult extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      results: this.props.jsonResults,
      ext: {
        flight_cost: 500,
        city_name: "Jersey City",
        state_name: "New Jersey",
        airport_name: "Newark Liberty International Airport",
        airport_code: "EWR",
        // city_img: "city_pic.url",
        population: 1000000,
        cost_index: 3,
        high: 90,
        low: 50,
        // out of 4
        busy: 3,
        density: 5,
        rank: 1,
        // in inches
        annual_precipitation: 14,
        // annual passengers
        annual_passengers: 6000000,
        yelp_restaurants: [
          {
            image_url:
              "https://s3-media4.fl.yelpcdn.com/bphoto/qr7eSU6CFwRGZ7Rc-QEoTQ/o.jpg",
            page_url:
              "https://www.yelp.com/biz/katzs-delicatessen-new-york?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            review_count: 10225,
            review_score: 4,
            name: "Katzs Delicatessen"
          },
          {
            image_url:
              "https://s3-media4.fl.yelpcdn.com/bphoto/qr7eSU6CFwRGZ7Rc-QEoTQ/o.jpg",
            page_url:
              "https://www.yelp.com/biz/katzs-delicatessen-new-york?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            review_count: 11,
            review_score: 3,
            name: "#2Katzs Delicatessen"
          }
        ],
        yelp_tours: [
          {
            image_url:
              "https://s3-media4.fl.yelpcdn.com/bphoto/qr7eSU6CFwRGZ7Rc-QEoTQ/o.jpg",
            page_url:
              "https://www.yelp.com/biz/katzs-delicatessen-new-york?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            review_count: 10225,
            review_score: 4,
            name: "Katzs Delicatessen"
          }
        ],
        yelp_bars: [
          {
            image_url:
              "https://s3-media4.fl.yelpcdn.com/bphoto/qr7eSU6CFwRGZ7Rc-QEoTQ/o.jpg",
            page_url:
              "https://www.yelp.com/biz/katzs-delicatessen-new-york?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            review_count: 10225,
            review_score: 4,
            name: "Katzs Delicatessen"
          }
        ],
        yelp_landmarks: [
          {
            image_url:
              "https://s3-media4.fl.yelpcdn.com/bphoto/qr7eSU6CFwRGZ7Rc-QEoTQ/o.jpg",
            page_url:
              "https://www.yelp.com/biz/katzs-delicatessen-new-york?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            review_count: 10225,
            review_score: 4,
            name: "Katzs Delicatessen"
          }
        ],
        yelp_hotels: [
          {
            image_url:
              "https://s3-media4.fl.yelpcdn.com/bphoto/qr7eSU6CFwRGZ7Rc-QEoTQ/o.jpg",
            page_url:
              "https://www.yelp.com/biz/katzs-delicatessen-new-york?adjust_creative=BpXhmQxwiLhi-ASFk8Yztw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BpXhmQxwiLhi-ASFk8Yztw",
            review_count: 10225,
            review_score: 4,
            name: "Katzs Delicatessen"
          }
        ]
      },
      redirect: false
    };
    this.getExtendedResults = this.getExtendedResults.bind(this);
    this.loadResult = this.loadResult.bind(this);
  }
  render() {
    return <div>{this.forLoopResults()}</div>;
  }
  forLoopResults() {
    const resultList = [<h3 key="h">List of destinations </h3>];
    if (this.state.redirect) {
      return <Result extResults={this.state.ext} />;
    }
    for (let i = 0; i < this.state.results.length; i++) {
      resultList.push(
        <ListGroupItem
          className="Result"
          key={i}
          onClick={this.loadResult.bind(this, i)}
        >
          <Media>
            <Media.Left align="middle">
              <img
                src="https://picsum.photos/200"
                // src={this.state.results[i].city_img}
                // src=v1/city_img/{this.state.results[i].city_name}
                alt="Pikachu"
                className="ResultImg"
              />
            </Media.Left>
            <Media.Body>
              <Media.Heading>
                {this.state.results[i].city_name},{" "}
                {this.state.results[i].state_name}
              </Media.Heading>
              <p>
                {/* Score: {this.state.results[i].score} <br /> */}
                State: {this.state.results[i].state_name} <br />
                City: {this.state.results[i].city_name} <br />
                Population: {this.state.results[i].population} <br />
                How busy it is: {this.state.results[i].busy} <br />
                High temperature (F): {this.state.results[i].high} <br />
                Low temperature (F): {this.state.results[i].low} <br />
              </p>
            </Media.Body>
          </Media>
        </ListGroupItem>
      );
    }
    return resultList;
  }

  // Link by city name not id
  getExtendedResults(city_name) {
    // console.log("Are we getting this id::: ", city_name);
    return axios
      .get("http://localhost:5000/v1/survey/" + city_name, {
        // ext: this.state.city_name
      })
      .then(function(response) {
        console.log(response);
        // this.setState({ ext: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  loadResult(id) {
    this.getExtendedResults(this.state.results[id].city_name);
    console.log("Loading result");
    this.setState({
      redirect: true
    });
    // return <Redirect to="/result" extResults={this.state.ext} />;
  }

  componentWillMount = () => {
    document.body.classList.add("SurveyBg");
  };

  componentWillUnmount = () => {
    // document.body.classList.remove("SurveyBg");
  };
}

export default RenderResult;

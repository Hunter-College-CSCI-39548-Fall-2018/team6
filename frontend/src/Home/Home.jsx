import React, { Component } from "react";
import "./Home.css";
import { Carousel } from "react-bootstrap";

/*
Author: Eunice Hew
Home page with caroussl
*/

class Result extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      result: this.props.extResults
    };
  }
  render() {
    return (
      <Carousel>
        <Carousel.Item>
          <center>
            <img
              width={1200}
              height={600}
              align="center"
              alt="900x500"
              className="carouselPic"
              src="https://cdn.newsapi.com.au/image/v1/53cf3216af89accadaa89d355625a1ae?width=1024"
            />
          </center>
          <Carousel.Caption>
            <h2
              style={{
                fontFamily: "FreeMono, monospace",
                color: "black",
                background: "white",
                opacity: ".7"
              }}
            >
              Travel App
            </h2>
            <p
              style={{
                fontFamily: "Apple Chancery, cursive",
                fontSize: "40px",
                color: "gray",
                background: "white",
                opacity: ".7"
              }}
            >
              Travel where your heart desires.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <center>
            <img
              width={1200}
              height={600}
              alt="900x500"
              className="carouselPic"
              src="http://gobatumi.com/files/plan-your-trip/travel-agencies/Paradise-travel.jpg"
            />
          </center>
          <Carousel.Caption>
            <h2
              style={{
                fontFamily: "FreeMono, monospace",
                color: "black",
                background: "white",
                opacity: ".7"
              }}
            >
              Travel App
            </h2>
            <p
              style={{
                fontFamily: "Apple Chancery, cursive",
                fontSize: "40px",
                color: "gray",
                background: "white",
                opacity: ".7"
              }}
            >
              Find your best match.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <center>
            <img
              width={1200}
              height={600}
              alt="900x500"
              className="carouselPic"
              src="https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2018/07/05/105312566-1530803740357gettyimages-815863456.1910x1000.jpeg"
            />
          </center>
          <Carousel.Caption>
            <h2
              style={{
                fontFamily: "FreeMono, monospace",
                color: "black",
                background: "white",
                opacity: ".7"
              }}
            >
              Travel App
            </h2>
            <p
              style={{
                fontFamily: "Apple Chancery, cursive",
                fontSize: "40px",
                color: "gray",
                background: "white",
                opacity: ".7"
              }}
            >
              Your little slice of paradise.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }

  componentWillMount = () => {
    document.body.classList.add("SurveyBg");
  };

  componentWillUnmount = () => {
    document.body.classList.remove("SurveyBg");
  };
}
export default Result;

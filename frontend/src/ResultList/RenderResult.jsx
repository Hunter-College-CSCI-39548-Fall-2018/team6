import React, { Component } from "react";
import "./ResultList.css";
import { ListGroupItem, Media } from "react-bootstrap";
import Result from "../Result/Result";
// import { Redirect } from "react-router-dom";
import axios from "axios";

/*
Author: Eunice Hew
Results modul generated from survey
*/

class RenderResult extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      results: this.props.jsonResults,
      extId: "",
      ext: {
        imageUrl: "https://picsum.photos/200/300/?random",
        id: "1",
        state: "NY",
        city: "Elm",
        population: "pop 10000",
        price: "$$",
        climate: "Warm",
        attractions: "No attractions",
        events: "No events",
        resturants: "No food",
        bars: "No bars"
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
    const resultList = [<h3>List of destinations </h3>];
    if (this.state.redirect) {
      return <Result extResults={this.state.ext} />;
    }
    for (let i = 0; i < this.state.results.length; i++) {
      resultList.push(
        <ListGroupItem
          className="Result"
          key={this.state.results[i].id}
          onClick={this.loadResult.bind(this, i)}
        >
          <Media>
            <Media.Left align="middle">
              <img src={this.state.results[i].imageUrl} alt="Pikachu" />
            </Media.Left>
            <Media.Body>
              <Media.Heading>
                {this.state.results[i].city}, {this.state.results[i].state}
              </Media.Heading>
              <p>
                Result #: {this.state.results[i].id} <br />
                State: {this.state.results[i].state} <br />
                City: {this.state.results[i].city} <br />
                Population: {this.state.results[i].population} <br />
                Price: {this.state.results[i].price} <br />
                Climate: {this.state.results[i].climate} <br />
              </p>
            </Media.Body>
          </Media>
        </ListGroupItem>
      );
    }
    return resultList;
  }

  getExtendedResults(id) {
    console.log("Are we getting this id::: ", id);
    return axios
      .post("/getExtendedResults", {
        id
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
    this.getExtendedResults(id);
    console.log("We in here babe");
    this.setState({
      ext: {
        ...this.state.ext,
        id: this.state.results[id].id,
        state: this.state.results[id].state,
        city: this.state.results[id].city,
        population: "pop 10000"
      },
      redirect: true
    });
    // return <Redirect to="/Result" extResults={this.state.ext} />;
  }

  componentWillMount = () => {
    document.body.classList.add("SurveyBg");
  };

  componentWillUnmount = () => {
    // document.body.classList.remove("SurveyBg");
  };
}

export default RenderResult;

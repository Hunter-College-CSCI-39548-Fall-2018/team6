import React from "react";
import Axios from "axios";

class ResultList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      items: [],
      isLoaded: false,
      city: undefined,
      state: undefined
    };
  }
  componentDidMount() {
    Axios.get(
      "https://raw.githubusercontent.com/adrian-stru/travel-filters/master/DATA/json/attractions.json?token=ARfVeQkcPKWc6HCyHfODTXWdxAkqGqebks5cCgdfwA%3D%3D"
    )
      .then(response =>
        response.data.results.map(item => ({
          city: "{item.city}",
          state: "{item.state}"
          //image:
        }))
      )
      .then(item => {
        this.setState({
          isLoading: false
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }
  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div>Loading..</div>;
    } else {
      return (
        <div>
          <div className="Back-button">
            <form onClickSubmit={this.handleSubmit}>
              {/*.bind(this) */}
              <button type="submit">Survey</button>
            </form>
          </div>
          <React.Fragment>
            <h1>State</h1>
            <div>
              <ol>
                {/* get the asked city Name */}
                {items.map(item => (
                  <li key={item.state}>City: {item.city}</li>
                ))}
                {/* get city picture */}
              </ol>
            </div>
            <div className="ResultList-button" />
          </React.Fragment>
        </div>
      );
    }
  }
  onClickSubmit(e) {
    this.setState({ submit: true });
  }
}
export default ResultList;

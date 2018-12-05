import React from "react";
import "./ResultList.css";

class ResultList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      items: [],
      isLoaded: false
    };
    this.goBack = this.goBack.bind(this);
  }
  goBack() {
    this.props.history.goBack();
  }
  handleBack = () => {
    this.props.history.push("/Survey");
  };
  componentDidMount() {
    fetch(
      "https://raw.githubusercontent.com/adrian-stru/travel-filters/master/DATA/json/attractions.json?token=ARfVeQkcPKWc6HCyHfODTXWdxAkqGqebks5cCgdfwA%3D%3D"
    ) //url of api
      .then(res => res.json()) //convert result into json
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json //getting data from api into state items
        });
      });
  }
  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div>loading..</div>;
    } else {
      return (
        <div className="main">
          <div className="back-button">
            <button onClick={this.handleBack} bsStyle="success">
              &lt;Back
            </button>
            {/*
            <input
              className="button"
              type="result"
              value="Back"
              onClick={e => this.onClickSubmit(e)}
            />
            {/*.bind(this) 
             <button onClick={BrowserHistory.goBack}>Go Back</button>
              <button type="submit"> Back</button> </form> */}
          </div>
          <div className="cityInfo">
            <ol>
              {/* get the asked city Name */}
              {items.map(item => (
                <li key={item.state}>City: {item.city}</li>
              ))}
              {/* get city picture */}
            </ol>
          </div>
        </div>
      );
    }
  }
  onClickSubmit(e) {
    this.setState({ submit: true });
  }
}

export default ResultList;

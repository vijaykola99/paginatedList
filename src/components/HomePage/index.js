import { Component } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import ReactPopUp from "../ReactPopUp";
import "./index.css";

const apiConstants = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

class HomePage extends Component {
  state = { apiStatus: apiConstants.initial, searchInput: "", apiData: [] };

  componentDidMount() {
    this.getDataWithApiCAll();
  }

  retryApiCall = () => {
    this.getDataWithApiCAll();
  };

  getDataWithApiCAll = async () => {
    this.setState({ apiStatus: apiConstants.loading });
    const url = "https://tempapi.proj.me/api/dTBZRXHoN";
    const options = {
      method: "GET",
    };

    const response = await fetch(url, options);
    if (response.ok === true) {
      const data = await response.json();
      //in Backend uses snake case notation but in best practice  frontend uses camel case notation.
      const updatedData = data.map((eachItem) => ({
        id: eachItem._id,
        firstLogin: eachItem.firstLogin,
        owner: eachItem.owner,
        record: eachItem.record,
        type: eachItem.type,
        credentials: eachItem.credentials,
        communicationData: eachItem.communicationData,
        tenantSpecs: eachItem.tenantSpecs,
        userData: eachItem.userData,
      }));
      this.setState({ apiData: updatedData, apiStatus: apiConstants.success });
    } else {
      this.setState({ apiStatus: apiConstants.failure });
    }
  };

  onSearchName = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  renderSuccessView = () => {
    const { searchInput, apiData } = this.state;
    const searchData = apiData.filter((eachUsersData) =>
      eachUsersData.userData.name
        .toLowerCase()
        .includes(searchInput.toLowerCase())
    );
    return (
      <ul>
        {searchData.map((eachItem) => (
          <ReactPopUp data={eachItem} key={eachItem.id} />
        ))}
      </ul>
    );
  };

  renderLoadingView = () => (
    <div className="render-containers">
      <ClipLoader
        loading={true}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );

  renderFailureView = () => (
    <div className="render-containers">
      <button
        type="button"
        onClick={this.retryApiCall}
        className="retry-button"
      >
        Retry
      </button>
    </div>
  );

  renderPagesLists = () => {
    const { apiStatus } = this.state;
    //rendering ui, based on api status
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessView();
      case apiConstants.failure:
        return this.renderFailureView();
      case apiConstants.loading:
        return this.renderLoadingView();
      default:
        return null;
    }
  };

  render() {
    const { searchInput } = this.state;
    return (
      <div className="app-container">
        <input
          value={searchInput}
          className="input"
          placeholder="Search Name"
          type="search"
          onChange={this.onSearchName}
        />
        {this.renderPagesLists()}
      </div>
    );
  }
}
export default HomePage;

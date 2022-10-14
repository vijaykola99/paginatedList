import Popup from "reactjs-popup";

import "reactjs-popup/dist/index.css";

import "./index.css";

//extract only date and initial letter of name using slice method for better view of user details
const ReactPopUp = (props) => {
  const { data } = props;
  const { userData } = data;
  return (
    <div className="popup-container">
      <Popup
        modal
        trigger={
          <li type="button" className="trigger-button">
            <p className="name-initial">
              {userData.name.slice(0, 1).toUpperCase()}
            </p>
            <div>
              <p className="name">{`Name: ${userData.name}`}</p>
              <p className="name">PhoneNo: {userData.phoneNumber}</p>

              <p className="name">
                Created Date : {data.record.createdOn.slice(0, 10)}
              </p>
            </div>
          </li>
        }
      >
        {(close) => (
          <>
            <div className="modal-container">
              <p className="user-details-title">{`User Name : ${data.userData.name}`}</p>
              <p className="user-details-title">ID: {data.id}</p>
              <p className="user-details-title">{`FirstLogin : ${
                data.firstLogin === "" ? "NO DATA FOUND" : data.firstLogin
              }`}</p>
              <p className="user-details-title">{`Active : ${data.record.active}`}</p>
              <p className="user-details-title">{`Base Salary : ${data.userData.baseSalary}`}</p>
              <p className="user-details-title">{`Currency Type : ${
                data.userData.currency === ""
                  ? "No Data Found"
                  : data.userData.currency
              }`}</p>
              <p className="user-details-title">{`PhoneNumber : ${data.userData.phoneNumber}`}</p>
            </div>
            <button
              type="button"
              className="close-button"
              onClick={() => close()}
            >
              Close
            </button>
          </>
        )}
      </Popup>
    </div>
  );
};
export default ReactPopUp;

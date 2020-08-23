import React, { Component } from "react";
import TitlePage from "../../components/TitlePage";
import { connect } from "react-redux";
import "./index.scss";

class Profile extends Component {
  render() {
    const { myInfo: data = {} } = this.props;
    const {
      avatar = "",
      firstName = "",
      lastName = "",
      userName = "",
      email = "",
    } = data;
    const arrInfo = [
      { key: "Email:", value: email },
      { key: "First Name:", value: firstName },
      { key: "LastName", value: lastName },
      { key: "User Name:", value: userName },
    ];
    return (
      <div className="containerProfile">
        <TitlePage title={`${userName} | Profile`} />
        <div className="viewMyInfo">
          <img className="avatarProfile" src={avatar} alt="img-avatar" />
          {arrInfo.map((item) => (
            <div key={item.key} className="viewTextInfo">
              <span className="viewTextInfo__key">{item.key}</span>
              <span className="viewTextInfo__value">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ user: { myInfo = {} } = {} }) => ({
  myInfo,
});

// const mapDispatchToProps = (dispatch) => ({
//   getMyInfo: () => dispatch({ type: "GET_MY_INFO" }),
// });

export default connect(mapStateToProps, null)(Profile);

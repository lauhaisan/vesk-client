import React, { Component, Fragment } from "react";
import TitlePage from "../../components/TitlePage";
import { WALLET } from "../../constant";
import { connect } from "react-redux";
import ButtonLoading from "../../components/ButtonLoading";
import "./index.scss";

class Profile extends Component {
  componentDidMount() {
    const { getWallet } = this.props;
    getWallet();
  }
  handleCreateWallet = () => {
    const { createWallet } = this.props;
    createWallet({ money: 10 });
  };
  render() {
    const {
      myInfo: data = {},
      loading,
      myWallet: { money = 0 } = {},
      messageErrorWallet,
    } = this.props;
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
        <div className="viewWallet">
          <div className="viewWallet__title">Wallet</div>
          {messageErrorWallet === "not found" ? (
            <ButtonLoading
              onClick={this.handleCreateWallet}
              disabled={loading}
              loading={loading ? "yes" : undefined}
              text="Create"
              style={{
                width: "140px",
                height: "38px",
                fontSize: "13px",
                marginTop: "1rem",
              }}
            />
          ) : (
            <Fragment>
              <div style={{ display: "flex", marginTop: "1rem" }}>
                <div className="viewWallet__subTitle">Current Point:</div>
                <div style={{ marginLeft: "20px", fontWeight: "600" }}>
                  {money}
                </div>
              </div>
              <div className="divider" />
              <div className="viewWallet__subTitle">History</div>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({
  user: { myInfo = {} } = {},
  wallet: { loading, myWallet, messageErrorWallet } = {},
}) => ({
  myInfo,
  loading,
  myWallet,
  messageErrorWallet,
});

const mapDispatchToProps = (dispatch) => ({
  getWallet: () => dispatch({ type: WALLET.GET_WALLET }),
  createWallet: (data) =>
    dispatch({ type: WALLET.CREATE_WALLET, data: { data } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

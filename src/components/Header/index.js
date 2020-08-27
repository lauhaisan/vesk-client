import React, { Component, Fragment } from "react";
import {
  Header,
  HeaderContainer,
  HeaderGlobalBar,
} from "carbon-components-react/lib/components/UIShell";
import {
  UserProfile20,
  Logout20,
  ChevronSortDown20,
  Menu20,
} from "@carbon/icons-react";
import { connect } from "react-redux";
import numeral from "numeral";
import { setToken } from "../../utils/token";
import "./index.scss";

class ComponentHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogout = () => {
    const {
      history,
      //  logout
    } = this.props;
    setToken(undefined);
    history.push("/");
  };

  render() {
    const {
      history,
      handleMenu,
      myInfo: data = {},
      myWallet: { money = 0 } = {},
    } = this.props;
    const rightMenuSignIn = (
      <Fragment>
        <div className="point">
          {/* <span className="point__text">Current Point: </span> */}

          <i
            className="fas fa-coins"
            style={{ marginRight: "0.5rem", color: "#FFCF40" }}
          ></i>
          <span className="point__number">
            {money && numeral(money).format("0,0")}
          </span>
        </div>
        <div className="rightMenu" onClick={this.showDropDownMenu}>
          <img
            className="rightMenu__avatar"
            src={data.avatar || require("../../images/testAvatar.jpg")}
            alt="img-avatar"
          />
          <p className="rightMenu__textName">{data.userName}</p>
          <ChevronSortDown20 className="icon" />
        </div>
        <div className="dropDownMenu">
          <div
            className="dropDownMenu__item"
            onClick={() => history.push("/profile")}
          >
            <UserProfile20 />
            <p className="dropDownMenu__item--text">Profile</p>
          </div>
          <div className="dropDownMenu__item" onClick={this.handleLogout}>
            <Logout20 />
            <p className="dropDownMenu__item--text">Logout</p>
          </div>
        </div>
      </Fragment>
    );

    return (
      <div className="rootHeader" style={{ height: "auto" }}>
        <HeaderContainer
          render={({ isSideNavExpanded, onClickSideNavExpand }) => (
            <>
              <Header aria-label="IBM Platform Name">
                <div className="header__menu" onClick={handleMenu}>
                  <Menu20 />
                </div>
                <HeaderGlobalBar>{rightMenuSignIn}</HeaderGlobalBar>
              </Header>
            </>
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = ({
  user: { myInfo = {} } = {},
  wallet: { myWallet = {} } = {},
}) => ({
  myInfo,
  myWallet,
});

export default connect(mapStateToProps, null)(ComponentHeader);

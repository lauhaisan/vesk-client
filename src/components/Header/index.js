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
import { TextInput } from "carbon-components-react";
import { connect } from "react-redux";
import numeral from "numeral";
import { Link } from "react-router-dom";
import { setToken, getToken } from "../../utils/token";
import "./index.scss";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      q: "",
    };
  }

  onChangeSearch = (value) => {
    this.setState({ q: value });
  };

  handleSearch = () => {
    const { history } = this.props;
    const { q } = this.state;
    if (q) {
      history.push("/result-search", q);
    }
  };

  render() {
    const { q = "" } = this.state;
    return (
      <div className="viewSearch">
        <TextInput
          key="inputSearchHeader"
          id="inputSearchHeader"
          light={true}
          labelText=""
          onChange={(e) => this.onChangeSearch(e.target.value)}
          placeholder="Search"
          type="text"
          value={q}
        />
        <div className="viewSearch__viewSearch" onClick={this.handleSearch}>
          <i className="fas fa-search iconSearch"></i>
        </div>
      </div>
    );
  }
}

class ComponentHeader extends Component {
  handleLogout = () => {
    setToken(undefined);
    window.location.reload();
  };

  render() {
    const {
      history,
      handleMenu,
      myInfo: data = {},
      myWallet: { money = 0 } = {},
    } = this.props;
    const { firstName = "", lastName = "", avatar = "" } = data;

    const { token } = getToken();

    const rightMenuSignIn = (
      <Fragment>
        <div className="point">
          <i
            className="fas fa-coins"
            style={{ marginRight: "0.5rem", color: "#FFCF40" }}
          ></i>
          <span className="point__number">
            {money && numeral(money).format("0.[00]")}
          </span>
        </div>
        <div className="rightMenu">
          <img
            className="rightMenu__avatar"
            src={avatar || require("../../images/testAvatar.jpg")}
            alt="img-avatar"
          />
          <p className="rightMenu__textName">{`${firstName} ${lastName}`}</p>
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

    const rightMenuNotSignIn = (
      <Fragment>
        <div className="menuNotSignIn">
          <Link to="/signin" className="link">
            <span className="menuNotSignIn__text">Sign In</span>
          </Link>
          <span className="menuNotSignIn__icon">|</span>
          <Link to="/signup" className="link">
            <span className="menuNotSignIn__text">Sign Up</span>
          </Link>
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
                <Search history={history} />
                <HeaderGlobalBar>
                  <div style={{ display: "flex" }}>
                    {token ? rightMenuSignIn : rightMenuNotSignIn}
                  </div>
                </HeaderGlobalBar>
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

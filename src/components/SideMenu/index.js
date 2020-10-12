import React, { PureComponent, Fragment } from "react";
import { NavLink } from "react-router-dom";
import windowSize from "react-window-size";
import { getToken } from "../../utils/token";
import "./index.scss";

class SideMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openHistory: false,
    };
  }

  componentDidMount() {
    if (window.location.pathname.includes("history")) {
      this.setState({
        openHistory: true,
      });
    }
  }

  handleClickHistory = () => {
    const { openHistory } = this.state;
    this.setState({
      openHistory: !openHistory,
    });
  };

  render() {
    const { openMenu, windowWidth, handleMenuMobile = () => {} } = this.props;
    const { openHistory } = this.state;
    const isMobile = windowWidth < 768;
    let classNameMenu;
    if (isMobile) {
      classNameMenu = "sideBarOpen";
    } else {
      openMenu
        ? (classNameMenu = "sideBarOpen")
        : (classNameMenu = "sideBarClose");
    }

    const checkMenuMobileOpen = isMobile && openMenu ? "none" : "block";
    const iconChevron = "fas fa-chevron-down";
    const { token } = getToken();

    return (
      <div className={classNameMenu} style={{ display: checkMenuMobileOpen }}>
        <div className={`${classNameMenu}__menu`}>
          <NavLink
            exact
            onClick={isMobile && handleMenuMobile}
            activeClassName={`${classNameMenu}__menu__itemMenu--active`}
            to="/"
            className={`${classNameMenu}__menu__itemMenu`}
          >
            <i className="fas fa-home itemMenu__icon"></i>
            <span className="itemMenu__text">Home</span>
          </NavLink>
          <NavLink
            exact
            onClick={isMobile && handleMenuMobile}
            activeClassName={`${classNameMenu}__menu__itemMenu--active`}
            to="/top-rated"
            className={`${classNameMenu}__menu__itemMenu`}
          >
            <i className="fas fa-fire itemMenu__icon"></i>
            <span className="itemMenu__text">Top Rated</span>
          </NavLink>
          <NavLink
            exact
            onClick={isMobile && handleMenuMobile}
            activeClassName={`${classNameMenu}__menu__itemMenu--active`}
            to="/most-popular"
            className={`${classNameMenu}__menu__itemMenu`}
          >
            <i className="fas fa-poll itemMenu__icon"></i>
            <span className="itemMenu__text">Most Popular</span>
          </NavLink>
          {token && (
            <Fragment>
              <div className="menuParent" onClick={this.handleClickHistory}>
                <div className="menuParent--iconText">
                  <i className="fas fa-history menuParent__icon"></i>
                  <span className="menuParent__text">History</span>
                </div>
                <i className={`${iconChevron} menuParent__iconChevron`}></i>
              </div>
              {openHistory && (
                <Fragment>
                  <NavLink
                    exact
                    onClick={isMobile && handleMenuMobile}
                    activeClassName={`${classNameMenu}__menu__itemMenu--active`}
                    to="/history-point"
                    className={`${classNameMenu}__menu__itemMenu `}
                  >
                    <i className="fas fa-coins itemMenu__icon isSubMenu"></i>
                    <span className="itemMenu__text">Point</span>
                  </NavLink>
                  <NavLink
                    exact
                    onClick={isMobile && handleMenuMobile}
                    activeClassName={`${classNameMenu}__menu__itemMenu--active`}
                    to="/history-exchange"
                    className={`${classNameMenu}__menu__itemMenu `}
                  >
                    <i className="fas fa-exchange-alt itemMenu__icon isSubMenu"></i>
                    <span className="itemMenu__text">Exchange</span>
                  </NavLink>
                </Fragment>
              )}
              <NavLink
                activeClassName={`${classNameMenu}__menu__itemMenu--active`}
                onClick={isMobile && handleMenuMobile}
                to="/manage-video"
                className={`${classNameMenu}__menu__itemMenu`}
              >
                <i className="fas fa-tasks itemMenu__icon"></i>
                <span className="itemMenu__text">Manage Video</span>
              </NavLink>
            </Fragment>
          )}
          <NavLink
            activeClassName={`${classNameMenu}__menu__itemMenu--active`}
            onClick={isMobile && handleMenuMobile}
            to="/create-website"
            className={`${classNameMenu}__menu__itemMenu`}
          >
            <i className="far fa-window-maximize itemMenu__icon"></i>
            <span className="itemMenu__text">Create Website</span>
          </NavLink>
          <NavLink
            activeClassName={`${classNameMenu}__menu__itemMenu--active`}
            onClick={isMobile && handleMenuMobile}
            to="/contact"
            className={`${classNameMenu}__menu__itemMenu`}
          >
            <i className="fas fa-address-book itemMenu__icon"></i>
            <span className="itemMenu__text">Contact</span>
          </NavLink>
        </div>
      </div>
    );
  }
}
export default windowSize(SideMenu);

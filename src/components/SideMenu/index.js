import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import windowSize from "react-window-size";
import "./index.scss";

class SideMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openUser: false,
      openAds: false,
      openSocialMedia: false,
    };
  }

  componentDidMount() {}

  render() {
    const { openMenu, windowWidth } = this.props;
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

    return (
      <div className={classNameMenu} style={{ display: checkMenuMobileOpen }}>
        <div className={`${classNameMenu}__menu`}>
          <NavLink
            exact
            activeClassName={`${classNameMenu}__menu__itemMenu--active`}
            to="/"
            className={`${classNameMenu}__menu__itemMenu`}
          >
            <i className="fas fa-home itemMenu__icon"></i>
            <span className="itemMenu__text">Home</span>
          </NavLink>
          <NavLink
            exact
            activeClassName={`${classNameMenu}__menu__itemMenu--active`}
            to="/top-rated"
            className={`${classNameMenu}__menu__itemMenu`}
          >
            <i className="fas fa-fire itemMenu__icon"></i>
            <span className="itemMenu__text">Top Rated</span>
          </NavLink>
          <NavLink
            exact
            activeClassName={`${classNameMenu}__menu__itemMenu--active`}
            to="/most-popular"
            className={`${classNameMenu}__menu__itemMenu`}
          >
            <i className="fas fa-poll itemMenu__icon"></i>
            <span className="itemMenu__text">Most Popular</span>
          </NavLink>
          <NavLink
            activeClassName={`${classNameMenu}__menu__itemMenu--active`}
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

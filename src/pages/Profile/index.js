import React, { Component } from "react";
import {
  Form
  // FormGroup,
  // TextInput,
  // DatePicker,
  // DatePickerInput
} from "carbon-components-react";
import TitlePage from "../../components/TitlePage";
// import ButtonLoading from "../../components/ButtonLoading";
import { connect } from "react-redux";
import "./index.scss";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false
    };
  }

  handleEdit = () => {
    this.setState({
      isEdit: true
    });
  };

  render() {
    const { myInfo: data = {} } = this.props;
    console.log(this.props);
    const {
      avatar = "",
      address = "",
      birthDate = "",
      city = "",
      email = "",
      firstName = "",
      lastName = "",
      gender,
      phone,
      region,
      userName = ""
    } = data;
    // const { isEdit } = this.state;

    return (
      <div className="containerProfile">
        <TitlePage title={`${userName} | Profile`} />
        <div className="viewMyInfo">
          <div className="viewAvatar">
            <img
              className="avatarProfile"
              src={avatar || require("../../images/testAvatar.jpg")}
              alt="img-avatar"
            />
          </div>

          <Form className="formData">
            <div className="formData__row__profile">
              <img
                className="imgReward"
                src={require("../../images/award.png")}
                alt="img-avatar"
              />
            </div>
            <div className="formData__row__profile">
              {/* <div className="card">
                <div className="title">Video</div>
                <div className="icon">
                  <img
                    className="avatarProfile"
                    src={require("../../images/eye-close-up.svg")}
                    alt="img-avatar"
                  />
                </div>
                <div className="features">
                  <ul>
                    <li>
                      <span>12</span> views
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-2">
                <div className="title">Follow</div>
                <div className="icon">
                  <img
                    src={require("../../images/people.png")}
                    alt="img-avatar"
                  />
                </div>
                <div className="features">
                  <ul>
                    <li>
                      <span>622</span> people
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card">
                <div className="title">Like</div>
                <div className="icon">
                  <img
                    className="avatarProfile"
                    src={require("../../images/like-outline.png")}
                    alt="img-avatar"
                  />
                </div>
                <div className="features">
                  <ul>
                    <li>
                      <span>152</span> times
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
            <div className="info">
              <div className="header">Thông tin cá nhân</div>
              <div className="header-extra">
                Thông tin cơ bản, như tên và hình ảnh của bạn, đang được sử dụng
                dịch vụ trên Vesk
              </div>
              <div className="box-info">
                <div className="padding-left">
                  <div className="detail">Hồ sơ</div>
                  <div className="detail-extra">
                    Một số thông tin có thể hiển thị cho những người khác đang
                    sử dụng dịch vụ của Vesk.
                    {/* <a href="">Tìm hiểu thêm</a> */}
                  </div>
                  <div className="row-info">
                    <span class="row-info-left">
                      ẢNH
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span class="row-info-right">
                      Một bức ảnh giúp cá nhân hóa tài khoản của bạn
                    </span>
                    <span>
                      <img
                        className="avatar-detail"
                        src={avatar || require("../../images/testAvatar.jpg")}
                        alt="img-avatar"
                      />
                    </span>
                  </div>
                  <div className="row-info">
                    <span class="row-info-left">TÀI KHOẢN</span>
                    <span class="row-info-right"> {userName || ""} </span>
                    <span>
                      <img
                        className="row-info-row"
                        src={require("../../images/arrow-right.png")}
                        alt="img-avatar"
                      />
                    </span>
                  </div>
                  <div className="row-info">
                    <span class="row-info-left">
                      TÊN
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span class="row-info-right"> {firstName || ""} </span>
                    <span>
                      <img
                        className="row-info-row"
                        src={require("../../images/arrow-right.png")}
                        alt="img-avatar"
                      />
                    </span>
                  </div>
                  <div className="row-info">
                    <span class="row-info-left">
                      HỌ
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span class="row-info-right"> {lastName || ""} </span>
                    <span>
                      <img
                        className="row-info-row"
                        src={require("../../images/arrow-right.png")}
                        alt="img-avatar"
                      />
                    </span>
                  </div>
                  <div className="row-info">
                    <span class="row-info-left">NGÀY SINH</span>
                    <span class="row-info-right">
                      {" "}
                      {birthDate || "22/04/1994"}{" "}
                    </span>
                    <span>
                      <img
                        className="row-info-row"
                        src={require("../../images/arrow-right.png")}
                        alt="img-avatar"
                      />
                    </span>
                  </div>
                  <div className="row-info">
                    <span class="row-info-left">GIỚI TÍNH &nbsp;&nbsp;</span>
                    <span class="row-info-right"> {gender || "N/A"} </span>
                    <span>
                      <img
                        className="row-info-row"
                        src={require("../../images/arrow-right.png")}
                        alt="img-avatar"
                      />
                    </span>
                  </div>
                  <div className="row-info">
                    <span class="row-info-left">MẬT KHẢU</span>
                    <span class="row-info-right">************* </span>
                    <span>
                      <img
                        className="row-info-row"
                        src={require("../../images/arrow-right.png")}
                        alt="img-avatar"
                      />
                    </span>
                  </div>

                  <div className="detail detail-2">Liên Hệ</div>
                  <div className="row-info">
                    <span class="row-info-left">
                      KHU VỰC&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span class="row-info-right">{region || "N/A"}</span>
                    <span>
                      <img
                        className="row-info-row"
                        src={require("../../images/arrow-right.png")}
                        alt="img-avatar"
                      />
                    </span>
                  </div>
                  <div className="row-info">
                    <span class="row-info-left">
                      {" "}
                      ĐIỆN THOẠI&nbsp;&nbsp;&nbsp;
                    </span>
                    <span class="row-info-right"> {phone || "N/A"} </span>
                    <span>
                      <img
                        className="row-info-row"
                        src={require("../../images/arrow-right.png")}
                        alt="img-avatar"
                      />
                    </span>
                  </div>
                  <div className="row-info">
                    <span class="row-info-left">
                      EMAIL
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span class="row-info-right"> {email || ""} </span>
                    <span>
                      <img
                        className="row-info-row"
                        src={require("../../images/arrow-right.png")}
                        alt="img-avatar"
                      />
                    </span>
                  </div>

                  <div className="row-info">
                    <span class="row-info-left">
                      THÀNH PHỐ &nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span class="row-info-right">{city || "N/A"} </span>
                    <span>
                      <img
                        className="row-info-row"
                        src={require("../../images/arrow-right.png")}
                        alt="img-avatar"
                      />
                    </span>
                  </div>
                  <div className="row-info">
                    <span class="row-info-left">
                      ĐỊA CHỈ
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span class="row-info-right">{address || "N/A"} </span>
                    <span>
                      <img
                        className="row-info-row"
                        src={require("../../images/arrow-right.png")}
                        alt="img-avatar"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="formData__row__profile">
              <FormGroup legendText="">
                <TextInput
                  readOnly={!isEdit}
                  className="formData__row__input"
                  id="inputEmail"
                  labelText="Email"
                  onChange={event =>
                    this.onChangeFormData("email", event.target.value)
                  }
                  required
                  placeholder="Email"
                  type="text"
                  value={email || ""}
                />
              </FormGroup>
              <FormGroup legendText="">
                <DatePicker
                  dateFormat="d/m/Y"
                  datePickerType="single"
                  onChange={e => this.onChangeDatePicker(e)}
                >
                  <DatePickerInput
                    disabled={!isEdit}
                    id="date-picker-calendar-id"
                    placeholder="Birthday"
                    labelText="Birthday"
                    type="text"
                    value={birthDate || ""}
                  />
                </DatePicker>
              </FormGroup>
            </div>
            <div className="formData__row__profile">
              <FormGroup legendText="">
                <TextInput
                  readOnly={!isEdit}
                  className="formData__row__input"
                  id="inputFirstName"
                  labelText="First Name"
                  onChange={event =>
                    this.onChangeFormData("firstName", event.target.value)
                  }
                  required
                  placeholder="First Name"
                  type="text"
                  value={firstName || ""}
                />
              </FormGroup>
              <FormGroup legendText="">
                <TextInput
                  readOnly={!isEdit}
                  className="formData__row__input"
                  id="inputLastName"
                  labelText="Last Name"
                  onChange={event =>
                    this.onChangeFormData("lastName", event.target.value)
                  }
                  required
                  placeholder="Last Name"
                  type="text"
                  value={lastName || ""}
                />
              </FormGroup>
            </div>
            <div className="formData__row__profile">
              <FormGroup legendText="">
                <TextInput
                  readOnly={!isEdit}
                  className="formData__row__input"
                  id="inputUserName"
                  labelText="User Name"
                  onChange={event =>
                    this.onChangeFormData("userName", event.target.value)
                  }
                  required
                  placeholder="User Name"
                  type="text"
                  value={userName || ""}
                />
              </FormGroup>
              <FormGroup legendText="">
                <TextInput
                  readOnly={!isEdit}
                  className="formData__row__input"
                  id="inputGender"
                  labelText="Gender"
                  onChange={event =>
                    this.onChangeFormData("gender", event.target.value)
                  }
                  required
                  placeholder="Gender"
                  type="text"
                  value={gender || ""}
                />
              </FormGroup>
            </div>
            <div className="formData__row__profile">
              <FormGroup legendText="">
                <TextInput
                  readOnly={!isEdit}
                  className="formData__row__input"
                  id="inputRegion"
                  labelText="Region"
                  onChange={event =>
                    this.onChangeFormData("region", event.target.value)
                  }
                  required
                  placeholder="Region"
                  type="text"
                  value={region || ""}
                />
              </FormGroup>
              <FormGroup legendText="">
                <TextInput
                  readOnly={!isEdit}
                  className="formData__row__input"
                  id="inputCity"
                  labelText="City"
                  onChange={event =>
                    this.onChangeFormData("city", event.target.value)
                  }
                  required
                  placeholder="City"
                  type="text"
                  value={city || ""}
                />
              </FormGroup>
            </div>
            <div className="formData__row__profile">
              <FormGroup legendText="">
                <TextInput
                  readOnly={!isEdit}
                  className="formData__row__input"
                  id="inputAddress"
                  labelText="Address"
                  onChange={event =>
                    this.onChangeFormData("address", event.target.value)
                  }
                  required
                  placeholder="Address"
                  type="text"
                  value={address || ""}
                />
              </FormGroup>
              <FormGroup legendText="">
                <TextInput
                  readOnly={!isEdit}
                  className="formData__row__input"
                  id="inputPhone"
                  labelText="Phone"
                  onChange={event =>
                    this.onChangeFormData("phone", event.target.value)
                  }
                  required
                  placeholder="Phone"
                  type="text"
                  value={phone || ""}
                />
              </FormGroup>
            </div> */}
          </Form>
          {/* <div className="viewButtonProfile">
            <ButtonLoading
              onClick={this.handleEdit}
              text="Edit"
              style={{
                width: "140px",
                height: "38px",
                fontSize: "13px"
              }}
            />
          </div> */}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ user: { myInfo = {} } = {} }) => ({
  myInfo
});

const mapDispatchToProps = dispatch => ({
  // getWallet: () => dispatch({ type: WALLET.GET_WALLET }),
  // createWallet: data => dispatch({ type: WALLET.CREATE_WALLET, data: { data } })
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

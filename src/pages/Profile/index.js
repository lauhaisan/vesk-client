import React, { Component, Fragment } from "react";
import {
  Form,
  FormGroup,
  TextInput,
  DatePicker,
  DatePickerInput
  // FileUploader
} from "carbon-components-react";
import { Settings32 } from "@carbon/icons-react";
import moment from "moment";
import TitlePage from "../../components/TitlePage";
import ButtonLoading from "../../components/ButtonLoading";
import Notification from "../../components/Notification";
import CustomModal from "../../components/CustomModal";
import { connect } from "react-redux";
import { getToken } from "../../utils/token";
import "./index.scss";
import { UPLOAD, LIST_USER, USER } from "../../constant";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      fileUpload: null
    };
  }

  static getDerivedStateFromProps(props) {
    if ("myInfo" in props) {
      return { myInfo: props.myInfo };
    }
    return null;
  }

  componentWillUnmount() {
    const { updateListUserReducer } = this.props;
    updateListUserReducer({
      editUserSuccessfully: "",
      messageError: ""
    });
  }

  onChangeDatePicker = e => {
    const value = e.target ? e.target.value : e[0];
    const valueDate = moment(value).format("DD/MM/YYYY");
    let { myInfo } = this.state;
    myInfo.birthDate = valueDate;
    this.setState({
      myInfo
    });
  };

  onChangeFormData = (key, value) => {
    let { myInfo } = this.state;
    myInfo[key] = value;
    this.setState({
      myInfo
    });
  };

  openModalEdit = () => {
    this.setState({
      isEdit: true
    });
  };

  hideModal = () => {
    const { getMyInfo } = this.props;
    const { data: { userId = "" } = {} } = getToken();
    this.setState({
      isEdit: false
    });
    getMyInfo(userId);
  };

  handleFileChanged = e => {
    const { fileUpload } = this.state;
    const { uploadImage } = this.props;
    console.log("onChange");
    this.setState(
      {
        fileUpload: e.target.files[0]
      },
      () => {
        console.log("handleUpload");
        let formData = new FormData();
        formData.append("file", fileUpload);
        console.log("formData", formData);
        uploadImage({ file: formData });
      }
    );
  };

  handleSaveProfile = () => {
    const { myInfo = {} } = this.state;
    const { editUser } = this.props;
    editUser(myInfo, this.hideModal);
  };

  render() {
    const { loadingEditUser, editUserSuccessfully, messageError } = this.props;
    const { isEdit, myInfo } = this.state;

    const {
      avatar = "",
      address = "",
      birthDate = "",
      city = "",
      email = "",
      firstName = "",
      lastName = "",
      gender = "",
      phone = "",
      region = "",
      userName = ""
    } = myInfo;
    const renderContentModal = (
      <div style={{ height: "auto", width: "100%" }}>
        <Form className="formData">
          <div className="formData__avt">
            <img
              className="formData__avt--img"
              src={require("../../images/testAvatar.jpg")}
              alt="img-avatar"
            />
            {/* <div className="customButtonUpload">
              <FileUploader
                accept={[".jpg", ".png"]}
                buttonKind="primary"
                buttonLabel={<i className="fas fa-edit iconEdit"></i>}
                labelTitle=""
                onChange={e => this.handleFileChanged(e)}
              />
            </div> */}
          </div>
          <div className="formData__row">
            <FormGroup legendText="">
              <TextInput
                id="inputEmail"
                disabled={true}
                labelText="Email"
                onChange={event =>
                  this.onChangeFormData("email", event.target.value)
                }
                required
                light={true}
                placeholder="Email"
                type="text"
                value={email}
              />
            </FormGroup>
            <FormGroup legendText="">
              <DatePicker
                dateFormat="d/m/Y"
                datePickerType="single"
                onChange={e => this.onChangeDatePicker(e)}
              >
                <DatePickerInput
                  id="date-picker-calendar-id"
                  placeholder="Birthday"
                  labelText="Birthday"
                  type="text"
                  value={birthDate}
                />
              </DatePicker>
            </FormGroup>
          </div>
          <div className="formData__row">
            <FormGroup legendText="">
              <TextInput
                className="formData__row__input"
                id="inputFirstName"
                labelText="First Name"
                onChange={event =>
                  this.onChangeFormData("firstName", event.target.value)
                }
                required
                light={true}
                placeholder="First Name"
                type="text"
                value={firstName}
              />
            </FormGroup>
            <FormGroup legendText="">
              <TextInput
                className="formData__row__input"
                id="inputLastName"
                labelText="Last Name"
                onChange={event =>
                  this.onChangeFormData("lastName", event.target.value)
                }
                required
                light={true}
                placeholder="Last Name"
                type="text"
                value={lastName}
              />
            </FormGroup>
          </div>
          <div className="formData__row">
            <FormGroup legendText="">
              <TextInput
                disabled={true}
                className="formData__row__input"
                id="inputUserName"
                labelText="User Name"
                onChange={event =>
                  this.onChangeFormData("userName", event.target.value)
                }
                required
                light={true}
                placeholder="User Name"
                type="text"
                value={userName}
              />
            </FormGroup>
            <FormGroup legendText="">
              <TextInput
                className="formData__row__input"
                id="inputGender"
                labelText="Gender"
                onChange={event =>
                  this.onChangeFormData("gender", event.target.value)
                }
                required
                light={true}
                placeholder="Gender"
                type="text"
                value={gender}
              />
            </FormGroup>
          </div>
          <div className="formData__row">
            <FormGroup legendText="">
              <TextInput
                className="formData__row__input"
                id="inputRegion"
                labelText="Region"
                onChange={event =>
                  this.onChangeFormData("region", event.target.value)
                }
                required
                light={true}
                placeholder="Region"
                type="text"
                value={region}
              />
            </FormGroup>
            <FormGroup legendText="">
              <TextInput
                className="formData__row__input"
                id="inputCity"
                labelText="City"
                onChange={event =>
                  this.onChangeFormData("city", event.target.value)
                }
                required
                light={true}
                placeholder="City"
                type="text"
                value={city}
              />
            </FormGroup>
          </div>
          <div className="formData__row">
            <FormGroup legendText="">
              <TextInput
                className="formData__row__input"
                id="inputAddress"
                labelText="Address"
                onChange={event =>
                  this.onChangeFormData("address", event.target.value)
                }
                required
                light={true}
                placeholder="Address"
                type="text"
                value={address}
              />
            </FormGroup>
            <FormGroup legendText="">
              <TextInput
                className="formData__row__input"
                id="inputPhone"
                labelText="Phone"
                onChange={event =>
                  this.onChangeFormData("phone", event.target.value)
                }
                required
                light={true}
                placeholder="Phone"
                type="text"
                value={phone}
              />
            </FormGroup>
          </div>
        </Form>
      </div>
    );

    return (
      <Fragment>
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

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img
                className="imgReward"
                src={require("../../images/award.png")}
                alt="img-avatar"
              />
              <ButtonLoading
                text="Edit"
                renderIcon={Settings32}
                onClick={this.openModalEdit}
                style={{ marginTop: "1rem" }}
              />
            </div>

            <div className="formData__row__profile"></div>
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
                    <span className="row-info-left">
                      ẢNH
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span className="row-info-right">
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
                    <span className="row-info-left">TÀI KHOẢN</span>
                    <span className="row-info-right"> {userName || ""} </span>
                    <span>
                      <img
                        className="row-info-row"
                        src={require("../../images/arrow-right.png")}
                        alt="img-avatar"
                      />
                    </span>
                  </div>
                  <div className="row-info">
                    <span className="row-info-left">
                      TÊN
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span className="row-info-right"> {firstName || ""} </span>
                    <span>
                      <img
                        className="row-info-row"
                        src={require("../../images/arrow-right.png")}
                        alt="img-avatar"
                      />
                    </span>
                  </div>
                  <div className="row-info">
                    <span className="row-info-left">
                      HỌ
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span className="row-info-right"> {lastName || ""} </span>
                    <span>
                      <img
                        className="row-info-row"
                        src={require("../../images/arrow-right.png")}
                        alt="img-avatar"
                      />
                    </span>
                  </div>
                  <div className="row-info">
                    <span className="row-info-left">NGÀY SINH</span>
                    <span className="row-info-right">
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
                    <span className="row-info-left">
                      GIỚI TÍNH &nbsp;&nbsp;
                    </span>
                    <span className="row-info-right"> {gender || "N/A"} </span>
                    <span>
                      <img
                        className="row-info-row"
                        src={require("../../images/arrow-right.png")}
                        alt="img-avatar"
                      />
                    </span>
                  </div>
                  <div className="row-info">
                    <span className="row-info-left">MẬT KHẢU</span>
                    <span className="row-info-right">************* </span>
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
                    <span className="row-info-left">
                      KHU VỰC&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span className="row-info-right">{region || "N/A"}</span>
                    <span>
                      <img
                        className="row-info-row"
                        src={require("../../images/arrow-right.png")}
                        alt="img-avatar"
                      />
                    </span>
                  </div>
                  <div className="row-info">
                    <span className="row-info-left">
                      ĐIỆN THOẠI&nbsp;&nbsp;&nbsp;
                    </span>
                    <span className="row-info-right"> {phone || "N/A"} </span>
                    <span>
                      <img
                        className="row-info-row"
                        src={require("../../images/arrow-right.png")}
                        alt="img-avatar"
                      />
                    </span>
                  </div>
                  <div className="row-info">
                    <span className="row-info-left">
                      EMAIL
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span className="row-info-right"> {email || ""} </span>
                    <span>
                      <img
                        className="row-info-row"
                        src={require("../../images/arrow-right.png")}
                        alt="img-avatar"
                      />
                    </span>
                  </div>

                  <div className="row-info">
                    <span className="row-info-left">
                      THÀNH PHỐ &nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span className="row-info-right">{city || "N/A"} </span>
                    <span>
                      <img
                        className="row-info-row"
                        src={require("../../images/arrow-right.png")}
                        alt="img-avatar"
                      />
                    </span>
                  </div>
                  <div className="row-info">
                    <span className="row-info-left">
                      ĐỊA CHỈ
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span className="row-info-right">{address || "N/A"} </span>
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
          </div>
        </div>
        <CustomModal
          open={isEdit}
          loading={loadingEditUser}
          contentModal={renderContentModal}
          hideModal={this.hideModal}
          textSubmit="Save"
          onSubmit={this.handleSaveProfile}
          title="Edit Profile"
        />
        {!editUserSuccessfully && messageError !== "" && (
          <Notification
            status="error"
            message={messageError}
            title="Edit Profile Failed"
          />
        )}
        {editUserSuccessfully && (
          <Notification status="success" title="Edit Profile Successfully" />
        )}
      </Fragment>
    );
  }
}
const mapStateToProps = ({
  user: { myInfo = {} } = {},
  listUser: { loadingEditUser, editUserSuccessfully, messageError } = {}
}) => ({
  myInfo,
  loadingEditUser,
  editUserSuccessfully,
  messageError
});

const mapDispatchToProps = dispatch => ({
  editUser: (data, functionHideModal) =>
    dispatch({ type: LIST_USER.EDIT_USER, data: { data, functionHideModal } }),
  uploadImage: data => dispatch({ type: UPLOAD.UPLOAD_IMAGE, data: { data } }),
  getMyInfo: data => dispatch({ type: USER.GET_MY_INFO, data: { data } }),
  updateListUserReducer: data =>
    dispatch({ type: LIST_USER.UPDATE_LIST_USER_REDUCER, data })
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

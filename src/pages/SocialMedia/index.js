import React, { Fragment } from "react";
import TitlePage from "../../components/TitlePage";
import TableCommon from "../../components/TableCommon";
import CustomModal from "../../components/CustomModal";
import ButtonLoading from "../../components/ButtonLoading";
import Notification from "../../components/Notification";
import { AddFilled32 } from "@carbon/icons-react";
import { Redirect } from "react-router-dom";
import Filter from "./component/Filter";
import {
  Form,
  FormGroup,
  TextInput,
  NumberInput,
  FileUploader,
  Loading,
  Accordion,
  AccordionItem,
} from "carbon-components-react";
import { SOCIAL_MEDIA, UPLOAD } from "../../constant";
import { connect } from "react-redux";
import { getToken } from "../../utils/token";
import "./index.scss";

class SocialMedia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      titleModal: "",
      isReview: false,
      fileUpload: null,
      addPoint: 0,
    };
  }

  static getDerivedStateFromProps(props) {
    if ("itemMediaSocial" in props) {
      return { itemMediaSocial: props.itemMediaSocial };
    }
    return null;
  }

  componentDidMount() {
    this.handleGetListSocialMedia();
  }

  componentWillUnmount() {
    const { updateStateReducer } = this.props;
    updateStateReducer({
      itemMediaSocial: {},
      actionSuccessfully: "",
      messageError: "",
    });
  }

  handleGetListSocialMedia = () => {
    const { getListSocialMediaByAuthor } = this.props;
    const { data: { userId: id = "" } = {} } = getToken();
    getListSocialMediaByAuthor({ id });
  };

  _resetFilter = () => {
    this.handleGetListSocialMedia();
  };

  _search = (value) => {
    const { searchSocialMedia } = this.props;
    searchSocialMedia(value);
  };

  openModalAddNewAdvertising = () => {
    this.setState({
      titleModal: "Add New Social Media",
      openModal: true,
    });
  };

  handeGetById = (id) => {
    const { getById } = this.props;
    getById(id);
  };

  _actionReview = (item) => {
    this.handeGetById(item.id);
    this.setState({
      openModal: true,
      titleModal: "Review Media Social",
      isReview: true,
    });
  };

  onChangeFormData = (key, value) => {
    let { itemMediaSocial } = this.state;
    itemMediaSocial[key] = value;
    this.setState({
      itemMediaSocial,
    });
  };

  _hideModal = () => {
    const { updateStateReducer, updateUploadReducer } = this.props;
    this.setState({
      openModal: false,
      isReview: false,
      addPoint: 0,
    });
    updateStateReducer({
      itemMediaSocial: {},
    });
    updateUploadReducer({
      link: "",
      messageUpload: "",
      linkContract: "",
    });
  };

  _handleSubmit = (event) => {
    event.preventDefault();
    const { editSocialMedia, addNewSocialMedia, linkThumbnail } = this.props;
    const { itemMediaSocial = {}, titleModal } = this.state;
    const arrayKey = ["pointForUserView", "timeForRecvCoin"];
    arrayKey.forEach((element) => {
      if (!itemMediaSocial[element]) {
        itemMediaSocial[element] = 1;
      }
    });
    const payload = {
      ...itemMediaSocial,
      thumbnail: linkThumbnail || itemMediaSocial.thumbnail,
      point: itemMediaSocial.point || 100,
      start: "2020",
      end: "2020",
    };
    if (titleModal === "Add New Social Media") {
      addNewSocialMedia(payload, this._hideModal);
    } else {
      editSocialMedia(payload, this._hideModal);
    }
  };

  _handleDelete = () => {
    const { itemMediaSocial } = this.state;
    const { deleteSocialMedia } = this.props;
    deleteSocialMedia(itemMediaSocial, this._hideModal);
  };

  _actionDelete = (item) => {
    this.handeGetById(item.id);
    this.setState({
      openModal: true,
      titleModal: "Delete Social Media",
    });
  };

  _actionAddPoint = (item) => {
    this.handeGetById(item.id);
    this.setState({
      openModal: true,
      titleModal: "Add Point",
    });
  };

  _actionEdit = (item) => {
    this.handeGetById(item.id);
    this.setState({
      openModal: true,
      titleModal: "Edit Social Media",
    });
  };

  handleFileChanged = (e, isContract) => {
    this.setState(
      {
        fileUpload: e.target.files[0],
      },
      () => {
        this.handleUploadToServer(isContract);
      }
    );
  };

  handleUploadToServer = (isContract) => {
    const { fileUpload } = this.state;
    const { uploadImage } = this.props;
    const formData = new FormData();
    formData.append("file", fileUpload);
    uploadImage({ file: formData, isContract });
  };

  handleSaveAddPoint = () => {
    const { addPoint, itemMediaSocial: { id } = {} } = this.state;
    const { addPointVideo } = this.props;
    const payload = { id, point: addPoint };
    addPointVideo(payload, this._hideModal);
  };

  onChangeAddPoint = (value) => {
    this.setState({
      addPoint: value,
    });
  };

  render() {
    const {
      openModal,
      titleModal,
      isReview,
      itemMediaSocial = {},
      addPoint,
    } = this.state;
    const {
      loading,
      listByAuthor = [],
      loadingGetById,
      messageError,
      loadingAction,
      actionSuccessfully,
      loadingUpload,
      linkThumbnail,
      messageUpload,
    } = this.props;
    const { token } = getToken();
    if (!token) {
      return <Redirect to="/" />;
    }
    const imgThumbnail = linkThumbnail || itemMediaSocial.thumbnail;
    const contentModal = (
      <div style={{ height: "auto", width: "100%" }}>
        {loadingGetById ? (
          <div className="modalLoading">
            <Loading withOverlay={false} />
          </div>
        ) : (
          <Form className="formData">
            <div className="formData__row">
              <FormGroup legendText="">
                <TextInput
                  id="inputName"
                  labelText="Name"
                  onChange={(event) =>
                    this.onChangeFormData("name", event.target.value)
                  }
                  required
                  readOnly={isReview}
                  light={true}
                  placeholder="Name"
                  type="text"
                  value={itemMediaSocial.name || ""}
                />
              </FormGroup>
              {/* <FormGroup legendText="">
                <TextInput
                  id="inputStatus"
                  labelText="Status"
                  onChange={(event) =>
                    this.onChangeFormData("status", event.target.value)
                  }
                  required
                  readOnly={isReview}
                  light={true}
                  placeholder="Status"
                  type="text"
                  value={itemMediaSocial.status || ""}
                />
              </FormGroup> */}

              <FormGroup legendText="">
                <NumberInput
                  readOnly={isReview || titleModal === "Edit Social Media"}
                  id="point"
                  onChange={(event) =>
                    this.onChangeFormData(
                      "point",
                      event.imaginaryTarget.valueAsNumber
                    )
                  }
                  label="Point"
                  min={titleModal === "Add New Social Media" ? 100 : 0}
                  step={1}
                  value={itemMediaSocial.point || 100}
                />
              </FormGroup>
            </div>

            <div className="formData__row">
              <FormGroup legendText="">
                <NumberInput
                  readOnly={isReview || titleModal === "Edit Social Media"}
                  invalid={
                    itemMediaSocial.pointForUserView >
                    (itemMediaSocial.point || 100)
                  }
                  invalidText="Point For User View must be less than Point"
                  id="pointForUser"
                  onChange={(event) =>
                    this.onChangeFormData(
                      "pointForUserView",
                      event.imaginaryTarget.valueAsNumber
                    )
                  }
                  label="Point For User View"
                  min={1}
                  step={1}
                  value={itemMediaSocial.pointForUserView || 0}
                />
              </FormGroup>
              <FormGroup legendText="">
                <NumberInput
                  readOnly={isReview}
                  id="timeForRecvCoin"
                  onChange={(event) =>
                    this.onChangeFormData(
                      "timeForRecvCoin",
                      event.imaginaryTarget.valueAsNumber
                    )
                  }
                  label="Time For Recv Coin (minute)"
                  min={1}
                  step={1}
                  value={itemMediaSocial.timeForRecvCoin || 0}
                />
              </FormGroup>
            </div>
            <FormGroup legendText="">
              <TextInput
                id="inputDescription"
                labelText="Description"
                onChange={(event) =>
                  this.onChangeFormData("description", event.target.value)
                }
                required
                readOnly={isReview}
                light={true}
                placeholder="Description"
                type="text"
                value={itemMediaSocial.description || ""}
              />
            </FormGroup>
            <FormGroup legendText="">
              <TextInput
                id="inputLinkTarget"
                labelText="Link Target"
                onChange={(event) =>
                  this.onChangeFormData("linkTarget", event.target.value)
                }
                required
                readOnly={isReview}
                light={true}
                placeholder="Link Target"
                type="text"
                value={itemMediaSocial.linkTarget || ""}
              />
            </FormGroup>
            <FormGroup legendText="">
              <TextInput
                id="inputVideoURL"
                labelText="Video URL"
                onChange={(event) =>
                  this.onChangeFormData("videoUrl", event.target.value)
                }
                required
                readOnly={isReview}
                light={true}
                placeholder="Video URL"
                type="text"
                value={itemMediaSocial.videoUrl || ""}
              />
            </FormGroup>
            {(titleModal === "Edit Social Media" ||
              titleModal === "Add New Social Media") && (
              <div className="buttonUpload">
                <FileUploader
                  accept={[".jpg", ".png"]}
                  buttonKind="primary"
                  buttonLabel="Upload Thumbnail"
                  labelTitle=""
                  onChange={(e) => this.handleFileChanged(e, true)}
                />
              </div>
            )}
            <div className="viewContract">
              {loadingUpload ? (
                <Loading small description="" withOverlay={false} />
              ) : (
                imgThumbnail && (
                  <Fragment>
                    <div className="titleContract">Image Thumbnail</div>
                    <img
                      className="viewContract__img"
                      src={imgThumbnail}
                      alt="img-contract"
                    />
                  </Fragment>
                )
              )}
            </div>
          </Form>
        )}
      </div>
    );

    const contentDeleteModal = (
      <div style={{ height: "auto", width: "100%" }}>
        {loadingGetById
          ? "Loading..."
          : `Are you sure delete ${itemMediaSocial.name}?`}
      </div>
    );

    const contentAddPointModal = (
      <div style={{ height: "auto", width: "100%" }}>
        {loadingGetById ? (
          "Loading..."
        ) : (
          <Form>
            <p style={{ marginBottom: "15px" }}>
              Add point to {itemMediaSocial.name}?
            </p>
            <FormGroup legendText="">
              <NumberInput
                id="addPoint"
                onChange={(event) =>
                  this.onChangeAddPoint(event.imaginaryTarget.valueAsNumber)
                }
                label=""
                min={0}
                step={1}
                value={addPoint || 0}
              />
            </FormGroup>
          </Form>
        )}
      </div>
    );

    const renderContentModal =
      titleModal === "Delete Social Media" ? contentDeleteModal : contentModal;

    const headerData = [
      {
        header: "Name",
        key: "name",
      },
      {
        header: "Point",
        key: "point",
      },
      {
        header: "Point For User View",
        key: "pointForUserView",
      },
      {
        header: "Time For Recv Coin",
        key: "timeForRecvCoin",
      },
      {
        header: "Status",
        key: "status",
      },
      { header: "Action", key: "action" },
    ];

    const renderOnSubmit =
      titleModal !== "Delete Social Media"
        ? this._handleSubmit
        : this._handleDelete;

    const defaultPoint = itemMediaSocial.point || 100;
    const check =
      titleModal === "Add New Social Media" &&
      itemMediaSocial.pointForUserView > defaultPoint;

    return (
      <Fragment>
        <TitlePage title="Social Media" />
        <div className="containerUserPage">
          <ButtonLoading
            text="Add"
            onClick={this.openModalAddNewAdvertising}
            renderIcon={AddFilled32}
          />
          <Accordion className="viewFilter">
            <AccordionItem
              open
              title={
                <div className="viewFilter__title">
                  Filter
                  <i className="fas fa-filter viewFilter__title--icon"></i>
                </div>
              }
            >
              <Filter resetFilter={this._resetFilter} search={this._search} />
            </AccordionItem>
          </Accordion>
          <TableCommon
            title="List Social Media"
            rowData={listByAuthor}
            headerData={headerData}
            loading={loading}
            actionReview={this._actionReview}
            actionEdit={this._actionEdit}
            actionDelete={this._actionDelete}
            actionAddPoint={this._actionAddPoint}
          />
        </div>
        <CustomModal
          isReview={
            isReview || check || (titleModal === "Add Point" && addPoint === 0)
          }
          open={openModal}
          loading={loadingAction}
          contentModal={
            titleModal === "Add Point"
              ? contentAddPointModal
              : renderContentModal
          }
          hideModal={this._hideModal}
          textSubmit={titleModal === "Delete Social Media" ? "Delete" : "Save"}
          onSubmit={
            titleModal === "Add Point"
              ? this.handleSaveAddPoint
              : renderOnSubmit
          }
          title={titleModal}
        />

        {!actionSuccessfully && messageError !== "" && (
          <Notification
            status="error"
            message={messageError}
            title={`${titleModal} Failed`}
          />
        )}
        {actionSuccessfully && (
          <Notification status="success" title={`${titleModal} Successfully`} />
        )}
        {messageUpload === "Upload Image Failed" && (
          <Notification
            status="error"
            message={messageUpload}
            title="Upload Image Failed"
          />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  socialMedia: {
    loading,
    listByAuthor,
    paging,
    loadingGetById,
    itemMediaSocial,
    messageError,
    loadingAction,
    actionSuccessfully,
  } = {},
  upload: { loading: loadingUpload, messageUpload, link: linkThumbnail } = {},
}) => ({
  loading,
  listByAuthor,
  paging,
  loadingGetById,
  itemMediaSocial,
  messageError,
  loadingAction,
  actionSuccessfully,
  loadingUpload,
  messageUpload,
  linkThumbnail,
});

const mapDispatchToProps = (dispatch) => ({
  uploadImage: (data) =>
    dispatch({ type: UPLOAD.UPLOAD_IMAGE, data: { data } }),
  getListSocialMediaByAuthor: (data) =>
    dispatch({ type: SOCIAL_MEDIA.GET_LIST_BY_AUTHOR, data: { data } }),
  getById: (id) => dispatch({ type: SOCIAL_MEDIA.GET_BY_ID, data: { id } }),
  editSocialMedia: (data, functionHideModal) =>
    dispatch({
      type: SOCIAL_MEDIA.EDIT_SOCIAL_MEDIA,
      data: { data, functionHideModal },
    }),
  updateStateReducer: (data) =>
    dispatch({ type: SOCIAL_MEDIA.UPDATE_SOCIAL_MEDIA_REDUCER, data }),
  deleteSocialMedia: (data, functionHideModal) =>
    dispatch({
      type: SOCIAL_MEDIA.DELETE_SOCIAL_MEDIA,
      data: { data, functionHideModal },
    }),
  addNewSocialMedia: (data, functionHideModal) =>
    dispatch({
      type: SOCIAL_MEDIA.ADD_NEW,
      data: { data, functionHideModal },
    }),
  searchSocialMedia: (data) =>
    dispatch({
      type: SOCIAL_MEDIA.SEARCH_LIST_BY_AUTHOR,
      data: { data },
    }),
  updateUploadReducer: (data) =>
    dispatch({ type: UPLOAD.UPDATE_STATE_UPLOAD_REDUCER, data }),
  addPointVideo: (data, functionHideModal) =>
    dispatch({
      type: SOCIAL_MEDIA.ADD_POINT_VIDEO,
      data: { data, functionHideModal },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SocialMedia);

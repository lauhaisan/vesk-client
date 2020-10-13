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
  FileUploader,
  Loading,
  Accordion,
  AccordionItem,
  Select,
  SelectItem,
} from "carbon-components-react";
import { SOCIAL_MEDIA, UPLOAD, ADVERTISING } from "../../constant";
import { connect } from "react-redux";
import { getToken } from "../../utils/token";
import "./index.scss";

const listPosition = [
  { name: "Home", value: "HOME" },
  { name: "Top Rate", value: "TOP_RATED" },
  { name: "Most Popular", value: "MOST_POPULAR" },
  { name: "Fix Bottom", value: "FIX_BOTTOM" },
];

class Advertising extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      titleModal: "",
      isReview: false,
      fileUpload: null,
      addPoint: 0,
      itemAds: {},
    };
  }

  // static getDerivedStateFromProps(props) {
  //   if ("itemMediaSocial" in props) {
  //     return { itemMediaSocial: props.itemMediaSocial };
  //   }
  //   return null;
  // }

  componentDidMount() {
    const { getListAdsByAuthor } = this.props;
    // getListAdsByAuthor();
  }

  // componentWillUnmount() {
  //   const { updateStateReducer } = this.props;
  //   updateStateReducer({
  //     itemMediaSocial: {},
  //     actionSuccessfully: "",
  //     messageError: "",
  //   });
  // }

  _resetFilter = () => {
    const { getListAdsByAuthor } = this.props;
    // getListAdsByAuthor();
  };

  _search = (value) => {
    // const { searchSocialMedia } = this.props;
    // searchSocialMedia(value);
    console.log("value search", value);
  };

  openModalAddNewAdvertising = () => {
    this.setState({
      titleModal: "Add New Advertising",
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
      titleModal: "Review Advertising",
      isReview: true,
    });
  };

  onChangeFormData = (key, value) => {
    const { itemAds } = this.state;
    itemAds[key] = value;
    this.setState({
      itemAds,
    });
  };

  _hideModal = () => {
    const { updateUploadReducer } = this.props;
    this.setState({
      openModal: false,
      isReview: false,
      itemAds: {},
    });
    updateUploadReducer({
      link: "",
      messageUpload: "",
      linkContract: "",
    });
  };

  _handleSubmit = (event) => {
    event.preventDefault();
    const { linkImagesAds = "" } = this.props;
    const { itemAds = {}, titleModal } = this.state;
    const payload = {
      ...itemAds,
      imageUrl: linkImagesAds || itemAds.imageUrl,
      position: itemAds.position || "HOME",
      order: 0,
    };
    if (titleModal === "Add New Advertising") {
      // addNewSocialMedia(payload, this._hideModal);
      console.log("Add new ads", payload);
    } else {
      // editSocialMedia(payload, this._hideModal);
      console.log("Edit ads", payload);
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
      titleModal: "Delete Advertising",
    });
  };

  _actionEdit = (item) => {
    this.handeGetById(item.id);
    this.setState({
      openModal: true,
      titleModal: "Edit Advertising",
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

  render() {
    const { openModal, titleModal, isReview, itemAds = {} } = this.state;
    const {
      loadingGetById,
      // messageError,
      loadingAction,
      // actionSuccessfully,
      loadingUpload,
      linkImagesAds,
      messageUpload,
      loading,
      listAdsByAuthor = [],
    } = this.props;
    const { token } = getToken();
    if (!token) {
      return <Redirect to="/" />;
    }
    const imgAds = linkImagesAds || itemAds.imageUrl;
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
                  value={itemAds.name || ""}
                />
              </FormGroup>
              <FormGroup legendText="">
                <Select
                  readOnly={isReview}
                  style={{ width: "11rem" }}
                  defaultValue="placeholder-item"
                  id="select-1"
                  invalidText="A valid value is required"
                  labelText="Select Position"
                  onChange={(event) =>
                    this.onChangeFormData("position", event.target.value)
                  }
                >
                  {listPosition.map((item) => {
                    const { name = "", value = "" } = item;
                    return <SelectItem text={name} value={value} />;
                  })}
                </Select>
              </FormGroup>
            </div>

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
                value={itemAds.linkTarget || ""}
              />
            </FormGroup>
            {(titleModal === "Edit Advertising" ||
              titleModal === "Add New Advertising") && (
              <div className="buttonUpload">
                <FileUploader
                  accept={[".jpg", ".png"]}
                  buttonKind="primary"
                  buttonLabel="Upload Image"
                  labelTitle=""
                  onChange={(e) => this.handleFileChanged(e, true)}
                />
              </div>
            )}
            <div className="viewContract">
              {loadingUpload ? (
                <Loading small description="" withOverlay={false} />
              ) : (
                imgAds && (
                  <Fragment>
                    <div className="titleContract">Image Avertising</div>
                    <img
                      className="viewContract__img"
                      src={imgAds}
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
        {loadingGetById ? "Loading..." : `Are you sure delete ?`}
      </div>
    );

    const renderContentModal =
      titleModal === "Delete Advertising" ? contentDeleteModal : contentModal;

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
      titleModal !== "Delete Advertising"
        ? this._handleSubmit
        : this._handleDelete;

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
            title="List Advertising"
            rowData={listAdsByAuthor}
            headerData={headerData}
            loading={loading}
            actionReview={this._actionReview}
            actionEdit={this._actionEdit}
            actionDelete={this._actionDelete}
          />
        </div>
        <CustomModal
          isReview={isReview}
          open={openModal}
          loading={loadingAction}
          contentModal={renderContentModal}
          hideModal={this._hideModal}
          textSubmit={titleModal === "Delete Advertising" ? "Delete" : "Save"}
          onSubmit={renderOnSubmit}
          title={titleModal}
        />

        {/* {!actionSuccessfully && messageError !== "" && (
          <Notification
            status="error"
            message={messageError}
            title={`${titleModal} Failed`}
          />
        )}
        {actionSuccessfully && (
          <Notification status="success" title={`${titleModal} Successfully`} />
        )} */}
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
  upload: { loading: loadingUpload, messageUpload, link: linkImagesAds } = {},
  advertising: { loading, listAdsByAuthor = [] } = {},
}) => ({
  loadingUpload,
  messageUpload,
  linkImagesAds,
  //Ads:
  loading,
  listAdsByAuthor,
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
  getListAdsByAuthor: () => dispatch({ type: ADVERTISING.GET_ADS_BY_AUTHOR }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Advertising);

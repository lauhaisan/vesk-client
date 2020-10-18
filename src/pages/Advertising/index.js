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
import { UPLOAD, ADVERTISING } from "../../constant";
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
      chargePoint: 450,
      itemAds: {},
      isModeSearch: false,
      keywordSearch: "",
      currentPage: 1,
    };
  }

  static getDerivedStateFromProps(props) {
    if ("itemAds" in props) {
      return { itemAds: props.itemAds };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { total } = this.props;
    const { total: prevTotal } = prevProps;
    const { currentPage, isModeSearch } = this.state;
    const { isModeSearch: prevIsModeSearch } = prevState;
    if (isModeSearch !== prevIsModeSearch) {
      this.setState({ currentPage: 1 });
    }
    if (total !== prevTotal) {
      const totalPage = Math.ceil(total / 10);
      const page = totalPage < currentPage ? currentPage - 1 : currentPage;
      this.setState({
        currentPage: page === 0 ? 1 : page,
      });
    }
  }

  componentDidMount() {
    this.handleGetListAds(1);
  }

  componentWillUnmount() {
    const { updateAdsReducer } = this.props;
    updateAdsReducer({
      itemAds: {},
      actionAdsSuccessfully: "",
      messageError: "",
    });
  }

  handleGetListAds = (page) => {
    const { getListAdsByAuthor } = this.props;
    const { isModeSearch, keywordSearch } = this.state;
    this.setState({ currentPage: page });
    const name = isModeSearch ? keywordSearch : "";
    getListAdsByAuthor({ name, page, limit: 10 });
  };

  _resetFilter = () => {
    this.setState(
      {
        isModeSearch: false,
        keywordSearch: "",
        currentPage: 1,
      },
      () => {
        this.handleGetListAds(1);
      }
    );
  };

  _search = ({ name }) => {
    this.setState(
      { keywordSearch: name, isModeSearch: true, currentPage: 1 },
      () => {
        this.handleGetListAds(1);
      }
    );
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
    if (key === "position") {
      this.renderPointByPosition(value);
    }
  };

  renderPointByPosition = (value) => {
    switch (value) {
      case "HOME":
        this.setChargePoint(450);
        break;
      case "TOP_RATED":
        this.setChargePoint(350);
        break;
      case "MOST_POPULAR":
        this.setChargePoint(450);
        break;
      case "FIX_BOTTOM":
        this.setChargePoint(1200);
        break;
      default:
        this.setChargePoint(450);
    }
  };

  setChargePoint = (chargePoint) => {
    this.setState({
      chargePoint,
    });
  };

  _hideModal = () => {
    const { updateUploadReducer, updateAdsReducer } = this.props;
    this.setState({
      openModal: false,
      isReview: false,
    });
    updateUploadReducer({
      link: "",
      messageUpload: "",
      linkContract: "",
    });
    updateAdsReducer({
      itemAds: {},
    });
  };

  _handleSubmit = (event) => {
    event.preventDefault();
    const {
      linkImagesAds = "",
      addNewAdvertising = () => {},
      editAds = () => {},
    } = this.props;
    const {
      itemAds = {},
      titleModal,
      chargePoint: point,
      currentPage,
    } = this.state;
    const payload = {
      ...itemAds,
      point: titleModal === "Add New Advertising" ? point : itemAds.point,
      imageUrl: linkImagesAds || itemAds.imageUrl,
      position: itemAds.position || "HOME",
      order: 0,
    };
    if (titleModal === "Add New Advertising") {
      addNewAdvertising(payload, this._hideModal, currentPage);
    } else {
      editAds(payload, this._hideModal, currentPage);
    }
  };

  _handleDelete = () => {
    const { itemAds, currentPage } = this.state;
    const { deleteAds = () => {} } = this.props;
    deleteAds(itemAds, this._hideModal, currentPage);
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
    const {
      openModal,
      titleModal,
      isReview,
      itemAds = {},
      chargePoint,
      isModeSearch,
    } = this.state;
    const {
      loadingGetAdsById: loadingGetById,
      loadingUpload,
      linkImagesAds,
      messageUpload,
      loading,
      listAdsByAuthor = [],
      actionAdsSuccessfully,
      loadingActionAds,
      messageError,
      total,
    } = this.props;
    const { token } = getToken();
    if (!token) {
      return <Redirect to="/" />;
    }
    const imgAds = linkImagesAds || itemAds.imageUrl;
    const { name, linkTarget } = itemAds;
    const checkDisableBtn = !name || !linkTarget || !imgAds;
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
                  disabled={titleModal !== "Add New Advertising"}
                  style={{ width: "11rem" }}
                  id="select-1"
                  invalidText="A valid value is required"
                  labelText="Select Position"
                  onChange={(event) =>
                    this.onChangeFormData("position", event.target.value)
                  }
                  value={itemAds.position || "HOME"}
                >
                  {listPosition.map((item) => {
                    const { name = "", value = "" } = item;
                    return <SelectItem text={name} value={value} />;
                  })}
                </Select>
              </FormGroup>
            </div>
            {titleModal === "Add New Advertising" && (
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#0f62fe",
                  fontWeight: "600",
                }}
              >
                Charge Point: {chargePoint}
              </div>
            )}
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
        {loadingGetById ? "Loading..." : `Are you sure delete ${itemAds.name}?`}
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
        header: "Link Target",
        key: "linkTarget",
      },
      {
        header: "Position",
        key: "position",
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
              <Filter
                resetFilter={isModeSearch ? this._resetFilter : () => {}}
                search={this._search}
              />
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
            handlePagination={this.handleGetListAds}
            resetFirstPage={isModeSearch}
            total={total}
          />
        </div>
        <CustomModal
          isReview={isReview || checkDisableBtn}
          open={openModal}
          loading={loadingActionAds}
          contentModal={renderContentModal}
          hideModal={this._hideModal}
          textSubmit={titleModal === "Delete Advertising" ? "Delete" : "Save"}
          onSubmit={renderOnSubmit}
          title={titleModal}
        />

        {!actionAdsSuccessfully && messageError !== "" && (
          <Notification
            status="error"
            message={messageError}
            title={`${titleModal} Failed`}
          />
        )}
        {actionAdsSuccessfully && (
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
  upload: { loading: loadingUpload, messageUpload, link: linkImagesAds } = {},
  advertising: {
    loading,
    listAdsByAuthor = [],
    actionAdsSuccessfully,
    loadingActionAds,
    messageError,
    itemAds = {},
    loadingGetAdsById,
    pagingListAdsByAuthor: { total } = {},
  } = {},
}) => ({
  loadingUpload,
  messageUpload,
  linkImagesAds,
  //Ads:
  loading,
  listAdsByAuthor,
  actionAdsSuccessfully,
  loadingActionAds,
  messageError,
  itemAds,
  loadingGetAdsById,
  total,
});

const mapDispatchToProps = (dispatch) => ({
  uploadImage: (data) =>
    dispatch({ type: UPLOAD.UPLOAD_IMAGE, data: { data } }),
  updateUploadReducer: (data) =>
    dispatch({ type: UPLOAD.UPDATE_STATE_UPLOAD_REDUCER, data }),
  getListAdsByAuthor: (data) =>
    dispatch({ type: ADVERTISING.GET_ADS_BY_AUTHOR, data }),
  addNewAdvertising: (data, functionHideModal, currentPage) =>
    dispatch({
      type: ADVERTISING.ADD_NEW_ADS,
      data: { data, functionHideModal, currentPage },
    }),
  getById: (id) => dispatch({ type: ADVERTISING.GET_ADS_BY_ID, data: { id } }),
  updateAdsReducer: (data) =>
    dispatch({ type: ADVERTISING.SET_STATE_ADS_REDUCER, data }),
  editAds: (data, functionHideModal, currentPage) =>
    dispatch({
      type: ADVERTISING.EDIT_ADS,
      data: { data, functionHideModal, currentPage },
    }),
  deleteAds: (data, functionHideModal, currentPage) =>
    dispatch({
      type: ADVERTISING.DELETE_ADS,
      data: { data, functionHideModal, currentPage },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Advertising);

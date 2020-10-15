import React, { Component } from "react";
import {
  Form,
  FormGroup,
  TextInput,
  NumberInput,
  FileUploader,
} from "carbon-components-react";
import numeral from "numeral";
import Spin from "../../../../components/Spin";
import { connect } from "react-redux";
import { UPLOAD, WALLET } from "../../../../constant";
import ButtonLoading from "../../../../components/ButtonLoading";
import ButtonOutline from "../../../../components/ButtonOutline";
import "./index.scss";

class NewExchange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coin: 0,
      point: 0,
      message: "",
      fileUpload: null,
    };
  }

  componentDidMount() {
    const { getExchangeRate } = this.props;
    getExchangeRate();
  }

  onChangeFormExchange = (key, value) => {
    const { rate } = this.props;
    const formatRate = numeral(rate).format("0.[00]");
    this.setState({
      [key]: value,
    });
    if (key === "coin") {
      this.setState({
        point: numeral(formatRate * value).format("0.[00]"),
      });
    }
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

  handleCancel = () => {
    const { updateUploadReducer } = this.props;
    this.setState({
      coin: 0,
      point: 0,
      message: "",
      fileUpload: null,
    });
    updateUploadReducer({
      link: "",
    });
  };

  handleSave = () => {
    const { coin, point, message } = this.state;
    const { link, createExchange } = this.props;
    const payload = { coin, point, message, contract: link };
    createExchange(payload, this.handleCancel);
  };

  render() {
    const { coin = "", point = "", message = "" } = this.state;
    const { loadingUpload, link, rate, loadingCreate } = this.props;
    const formatRate = numeral(rate).format("0.[00]");
    const linkQR =
      "https://statics.veskhub.co/98c69eb1-0931-11eb-bd57-5600023ed650.jpeg";
    return (
      <div className="containerAddExchange">
        <div className="containerAddExchange__viewTop">
          <img
            className="containerAddExchange__viewTop__img"
            src={linkQR}
            alt="QRcode"
          />
          <div className="containerAddExchange__viewTop__text">
            <p className="addExchangeText" style={{ margin: "20px 0 25px" }}>
              KATrhdQ5tw4uVdWKYr4sQB45edEkkSHL4w
            </p>
            <p className="addExchangeText">
              Create a CXC Transfer order into our Wallet address and take a
              screenshot. Then send the voucher (screenshot) to us. The
              inspection process will last 24 hours - 36 hours. Please check
              your account later. Thanks for using our service.
            </p>
            <p className="addExchangeText" style={{ margin: "20px 0 25px" }}>
              Note: Rates will change according to the rates currently in the
              system.
            </p>
          </div>
        </div>
        <div className="exchangeRateCreateExchange">
          Exchange Rate: {formatRate} (Coin*Exchange Rate = Point)
        </div>
        <Form className="formDataAdd">
          <div className="formDataAdd__row">
            <FormGroup legendText="">
              <NumberInput
                id="inputCoint"
                onChange={(event) =>
                  this.onChangeFormExchange(
                    "coin",
                    event.imaginaryTarget.valueAsNumber
                  )
                }
                label="Coin"
                min={0}
                step={1}
                value={coin || 0}
              />
            </FormGroup>
            <div className="viewExchangeRate"> x {formatRate} =</div>
            <FormGroup legendText="">
              <NumberInput
                id="inputPoint"
                readOnly={true}
                label="Point"
                min={0}
                step={1}
                value={point || 0}
              />
            </FormGroup>
          </div>
          <FormGroup legendText="">
            <TextInput
              className="formDataAdd__row__input"
              id="inputMessage"
              labelText="Message"
              onChange={(event) =>
                this.onChangeFormExchange("message", event.target.value)
              }
              required
              light={true}
              placeholder="Message"
              type="text"
              value={message}
            />
          </FormGroup>
          <div className="buttonUpload">
            <FileUploader
              accept={[".jpg", ".png"]}
              buttonKind="primary"
              buttonLabel="Upload Contract"
              labelTitle=""
              onChange={(e) => this.handleFileChanged(e, true)}
            />
          </div>

          <div className="viewContract">
            {loadingUpload ? (
              <Spin />
            ) : (
              link && (
                <img
                  className="viewContract__img"
                  src={link}
                  alt="img-contract"
                />
              )
            )}
          </div>
        </Form>
        <div className="viewBtn" style={{ marginTop: "20px" }}>
          <ButtonOutline text="Cancel" onClick={this.handleCancel} />
          <ButtonLoading
            disabled={!link}
            text="Save"
            onClick={this.handleSave}
            loading={loadingCreate}
            style={{ marginLeft: "1rem", height: "42px" }}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({
  upload: { loading: loadingUpload, messageUpload, link } = {},
  wallet: { exchangeRate: { rate = 0 } = {}, loadingCreate } = {},
}) => ({
  loadingUpload,
  messageUpload,
  link,
  rate,
  loadingCreate,
});

const mapDispatchToProps = (dispatch) => ({
  updateUploadReducer: (data) =>
    dispatch({ type: UPLOAD.UPDATE_STATE_UPLOAD_REDUCER, data }),
  uploadImage: (data) =>
    dispatch({ type: UPLOAD.UPLOAD_IMAGE, data: { data } }),
  getExchangeRate: () => dispatch({ type: WALLET.GET_EXCHANGE_RATE }),
  createExchange: (data, functionCancel) =>
    dispatch({
      type: WALLET.CREATE_EXCHANGE,
      data: { data, functionCancel },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewExchange);

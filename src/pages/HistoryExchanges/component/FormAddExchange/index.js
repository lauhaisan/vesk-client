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
    const { link } = this.props;
    const payload = { coin, point, message, contract: link };
    console.log("Payload", payload);
  };

  render() {
    const { coin = "", point = "", message = "" } = this.state;
    const { loadingUpload, link, rate } = this.props;
    const formatRate = numeral(rate).format("0.[00]");
    return (
      <div className="containerAddExchange">
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
            style={{ marginLeft: "1rem" }}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({
  upload: { loading: loadingUpload, messageUpload, link } = {},
  wallet: { exchangeRate: { rate = 0 } = {} } = {},
}) => ({
  loadingUpload,
  messageUpload,
  link,
  rate,
});

const mapDispatchToProps = (dispatch) => ({
  updateUploadReducer: (data) =>
    dispatch({ type: UPLOAD.UPDATE_STATE_UPLOAD_REDUCER, data }),
  uploadImage: (data) =>
    dispatch({ type: UPLOAD.UPLOAD_IMAGE, data: { data } }),
  getExchangeRate: () => dispatch({ type: WALLET.GET_EXCHANGE_RATE }),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewExchange);

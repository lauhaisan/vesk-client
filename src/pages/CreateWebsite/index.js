import React, { Component, Fragment } from "react";
import { Form, FormGroup, TextInput, TextArea } from "carbon-components-react";
import TitlePage from "../../components/TitlePage";
import Notification from "../../components/Notification";
import { connect } from "react-redux";
import ButtonLoading from "../../components/ButtonLoading";
import { CREATE_WEBSITE } from "../../constant";
import "./index.scss";

class CreateWebsite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validationEmail: "",
      messageValidationEmail: "",
      validationPhone: "",
      messageValidationPhone: "",
      validationDemand: "",
      messageValidationDemand: "",
      validationContent: "",
      messageValidationContent: "",
      email: "",
      phone: "",
      demand: "",
      content: "",
    };
  }

  componentWillUnmount() {
    const { updateStoreCreateWebSite } = this.props;
    updateStoreCreateWebSite({ messageError: "", actionSuccessfully: "" });
  }

  resetForm = () => {
    this.setState({
      email: "",
      phone: "",
      demand: "",
      content: "",
    });
  };

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    const { email, phone, content, demand } = this.state;
    const { sendFormCreateWebSite } = this.props;
    event.preventDefault();
    let check = false;
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phoneRegex = /^[0-9]/;
    if (emailRegex.test(email) === false) {
      this.setState({
        validationEmail: true,
        messageValidationEmail: !email
          ? "Email is required"
          : "Email is not valid",
      });
      check = true;
    } else {
      this.setState({
        validationEmail: false,
        messageValidationEmail: "",
      });
    }
    if (phoneRegex.test(phone) === false) {
      this.setState({
        validationPhone: true,
        messageValidationPhone: !phone
          ? "Phone is required"
          : "Phone is not valid",
      });
      check = true;
    } else {
      this.setState({
        validationPhone: false,
        messageValidationPhone: "",
      });
    }
    if (!demand) {
      this.setState({
        validationDemand: true,
        messageValidationDemand: "Demand is required",
      });
      check = true;
    } else {
      this.setState({
        validationDemand: false,
        messageValidationDemand: "",
      });
    }
    if (!content) {
      this.setState({
        validationContent: true,
        messageValidationContent: "Content is required",
      });
      check = true;
    } else {
      this.setState({
        validationContent: false,
        messageValidationContent: "",
      });
    }
    if (!check) {
      const payload = { email, phone, content, demand };
      sendFormCreateWebSite(payload, this.resetForm);
    }
  };

  render() {
    const { loading, actionSuccessfully, messageError } = this.props;
    const {
      validationEmail = "",
      messageValidationEmail = "",
      email = "",
      validationPhone = "",
      messageValidationPhone = "",
      phone = "",
      demand = "",
      content = "",
      validationDemand = "",
      messageValidationDemand = "",
      validationContent = "",
      messageValidationContent = "",
    } = this.state;
    return (
      <Fragment>
        <TitlePage title="Create Website" />
        <div className="containerCreateWebsite">
          <div className="containerCreateWebsite__form">
            <h2 className="heading-secondary">CREATE WEBSITE</h2>
            <Form onSubmit={this.handleSubmit} className="formGroup">
              <FormGroup legendText="">
                <TextInput
                  disabled={false}
                  invalid={validationEmail}
                  id="inputEmail"
                  invalidText={messageValidationEmail}
                  labelText="Email"
                  required
                  light={true}
                  onChange={(event) =>
                    this.handleChange("email", event.target.value)
                  }
                  placeholder="Email"
                  type="text"
                  value={email}
                />
              </FormGroup>
              <FormGroup legendText="">
                <TextInput
                  disabled={false}
                  invalid={validationPhone}
                  id="inputPhone"
                  invalidText={messageValidationPhone}
                  labelText="Phone"
                  required
                  light={true}
                  onChange={(event) =>
                    this.handleChange("phone", event.target.value)
                  }
                  placeholder="Phone"
                  type="text"
                  value={phone}
                />
              </FormGroup>
              <FormGroup legendText="">
                <TextArea
                  id="inputDemand"
                  labelText="Demand"
                  invalid={validationDemand}
                  invalidText={messageValidationDemand}
                  value={demand}
                  onChange={(event) =>
                    this.handleChange("demand", event.target.value)
                  }
                  placeholder="Demand"
                  rows={0}
                />
              </FormGroup>
              <FormGroup legendText="">
                <TextArea
                  id="inputContent"
                  labelText="Content"
                  invalid={validationContent}
                  invalidText={messageValidationContent}
                  value={content}
                  onChange={(event) =>
                    this.handleChange("content", event.target.value)
                  }
                  placeholder="Content"
                  rows={0}
                />
              </FormGroup>

              <ButtonLoading
                onClick={this.handleSubmit}
                disabled={loading}
                loading={loading ? "yes" : undefined}
                type="submit"
                text="Send"
                style={{
                  margin: "20px 0",
                  width: "140px",
                  height: "47px",
                }}
              />
            </Form>
          </div>
        </div>
        {actionSuccessfully && (
          <Notification
            status="success"
            title="Successfully"
            message="Your information has successfully added"
          />
        )}
        {messageError && (
          <Notification
            status="error"
            message={messageError}
            title="Process Failed"
          />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  createWebSite: { loading, messageError, actionSuccessfully } = {},
}) => ({ loading, messageError, actionSuccessfully });

const mapDispatchToProps = (dispatch) => ({
  sendFormCreateWebSite: (data, resetForm) =>
    dispatch({
      type: CREATE_WEBSITE.CREATE_WEBSITE,
      data: { data, resetForm },
    }),
  updateStoreCreateWebSite: (data) =>
    dispatch({ type: CREATE_WEBSITE.UPDATE_CREATE_WEBSITE_REDUCER, data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateWebsite);

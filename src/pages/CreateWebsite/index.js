import React, { Component, Fragment } from "react";
import { Form, FormGroup, TextInput, TextArea } from "carbon-components-react";
import TitlePage from "../../components/TitlePage";
import ButtonLoading from "../../components/ButtonLoading";
import "./index.scss";

class CreateWebsite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validationEmail: "",
      messageValidationEmail: "",
      email: "",
      phone: "",
      demand: "",
      content: "",
    };
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    const { email, phone, content, demand } = this.state;
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
    if (!check) {
      const payload = { email, phone, content, demand };
      console.log("payload", payload);
    }
  };

  render() {
    const {
      validationEmail = "",
      messageValidationEmail = "",
      email = "",
      validationPhone = "",
      messageValidationPhone = "",
      phone = "",
      demand = "",
      content = "",
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
                  value={demand}
                  onChange={(event) =>
                    this.handleChange("demand", event.target.value)
                  }
                  placeholder="Demand"
                />
              </FormGroup>
              <FormGroup legendText="">
                <TextArea
                  id="inputContent"
                  labelText="Content"
                  value={content}
                  onChange={(event) =>
                    this.handleChange("content", event.target.value)
                  }
                  placeholder="Content"
                />
              </FormGroup>

              <ButtonLoading
                onClick={this.handleSubmit}
                // disabled={loading}
                // loading={loading ? "yes" : undefined}
                type="submit"
                text="Send"
                // renderIcon={Login32}
                style={{
                  margin: "20px 0",
                  width: "140px",
                  height: "47px",
                }}
              />
            </Form>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default CreateWebsite;

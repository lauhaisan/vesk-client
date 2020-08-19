import React, { Component } from "react";
import { Form, FormGroup, TextInput } from "carbon-components-react";
import { Search32 } from "@carbon/icons-react";
import ButtonLoading from "../../../../components/ButtonLoading";
import ButtonOutline from "../../../../components/ButtonOutline";
import "./index.scss";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      linkTarget: ""
    };
  }

  onChangeFormData = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  handleSearch = event => {
    event.preventDefault();
    const { search } = this.props;
    const { name, linkTarget } = this.state;
    const value = { name, linkTarget };
    search(value);
  };

  handleReset = () => {
    const { resetFilter } = this.props;
    this.setState({
      name: "",
      linkTarget: ""
    });
    resetFilter();
  };

  render() {
    const { name, linkTarget } = this.state;
    return (
      <div className="containerFilter">
        <Form className="bx--row">
          <FormGroup legendText="" className="bx--col-md-2 bx--col-sm-4">
            <TextInput
              className="itemForm"
              disabled={false}
              id="inputSearchName"
              labelText="Name"
              required
              light={true}
              onChange={event =>
                this.onChangeFormData("name", event.target.value)
              }
              placeholder="Name"
              type="text"
              value={name}
            />
          </FormGroup>
          <FormGroup legendText="" className="bx--col-md-2 bx--col-sm-4">
            <TextInput
              className="itemForm"
              disabled={false}
              id="inputSearchLinkTarget"
              labelText="Link Target"
              required
              light={true}
              onChange={event =>
                this.onChangeFormData("linkTarget", event.target.value)
              }
              placeholder="Link Target"
              type="text"
              value={linkTarget}
            />
          </FormGroup>
        </Form>

        <div className="viewBtn">
          <ButtonOutline text="Reset Filter" onClick={this.handleReset} />
          <ButtonLoading
            disabled={!name && !linkTarget}
            text="Search"
            renderIcon={Search32}
            onClick={this.handleSearch}
            style={{ marginLeft: "1rem" }}
          />
        </div>
      </div>
    );
  }
}

export default Filter;

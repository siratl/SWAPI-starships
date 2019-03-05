import React, { Component } from 'react';
import axios from 'axios';

import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Upload extends Component {
  state = {
    name: '',
    imageUrl: '',
  };

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    const url = 'http://localhost:4000/api/upload/:id';
    axios
      .put(url, this.state)
      .then(res => {
        this.props.history.push('/');
      })
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div className="upload">
        <Form className="upload-form" onSubmit={this.handleSubmit}>
          <h2>Upload</h2>
          <FormGroup row>
            <Label for="name" sm={2}>
              Name
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
                name="name"
                id="name"
                placeholder="name"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="imageUrl" sm={2}>
              imageUrl
            </Label>
            <Col sm={10}>
              <Input
                type="url"
                value={this.state.imageUrl}
                onChange={this.handleChange}
                name="imageUrl"
                id="imageUrl"
                placeholder="imageUrl"
              />
            </Col>
          </FormGroup>
          <FormGroup
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
            check
            row
          >
            <Button type="submit">Upload</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default Upload;

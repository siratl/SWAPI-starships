import React, { Component } from 'react';
import axios from 'axios';

import { Card, CardBody, CardTitle, CardText, CardImg } from 'reactstrap';

class Starships extends Component {
  state = {
    starships: [],
    next: '',
  };

  componentDidMount = () => {
    const url = 'https://swapi.co/api/starships';
    const token = localStorage.getItem('jwt');
    const reqOptions = {
      headers: {
        authorization: token,
      },
    };
    axios
      .get(url, reqOptions)
      .then(res => {
        this.setState({ starships: res.data.results, next: res.data.next });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="home">
        <h2>Starships</h2>
        <section className="cardsList">
          {this.state.starships.map(ship => {
            return (
              <Card className="card" key={ship.name}>
                <CardImg
                  top
                  width="100%"
                  src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=220"
                  alt="Card image cap"
                />
                <CardBody className="cardBody">
                  <CardTitle className="cardTitle">
                    <h5>{ship.name}</h5>
                  </CardTitle>
                  <CardText className="cardText">
                    This is a wider card with supporting text below .
                  </CardText>
                  <CardText>
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </CardText>
                </CardBody>
              </Card>
            );
          })}
        </section>
      </div>
    );
  }
}

export default Starships;

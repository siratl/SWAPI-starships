import React, { Component } from 'react';
import axios from 'axios';

import { Card, CardBody, CardTitle, CardText, CardImg } from 'reactstrap';

class Starships extends Component {
  state = {
    starships: [],
  };

  componentDidMount = () => {
    const url = 'http://localhost:4000/api/starships';
    const token = localStorage.getItem('jwt');
    const reqOptions = {
      headers: {
        authorization: token,
      },
    };
    axios
      .get(url, reqOptions)
      .then(res => {
        console.log(res.data);
        this.setState({ starships: res.data });
      })

      .catch(err => console.log(err));
  };

  render() {
    const url =
      'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=220';
    return (
      <div className="home">
        <h2>Starships</h2>
        <section className="cardsList">
          {this.state.starships.map(ship => {
            return (
              <Card className="card" key={ship.name}>
                <CardImg
                  className="cardImage"
                  top
                  width="100%"
                  src={ship.imageUrl === 'no data' ? url : ship.imageUrl}
                  alt="Card image cap"
                />
                <CardBody className="cardBody">
                  <CardTitle className="cardTitle">
                    <h5>{ship.name}</h5>
                  </CardTitle>
                  <CardText className="cardText">{ship.model}</CardText>
                  <CardText className="cardText">
                    {ship.starship_class}
                  </CardText>
                  <CardText>
                    <small className="dateText">Last updated 3 mins ago</small>
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

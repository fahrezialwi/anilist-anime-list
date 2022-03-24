import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import CardAnime from './components/CardAnime';
import axios from 'axios';

function App() {
  const [animes, setAnimes] = useState([]);
  
  let query = `
    query {
      top: Page(page: 1, perPage: 10) {
        media(sort: SCORE_DESC, type: ANIME, isAdult: false) {
          id
          title {
            userPreferred
          }
          coverImage {
            medium
          }
          season
          seasonYear
          status
        }
      }
    }
  
  `;

  useEffect(() => {
    axios.post('https://graphql.anilist.co', {
      query: query,
    }).then((res) => {
      setAnimes(res.data.data.top.media);
    })
  }, [query])

  const renderAnime = () => {
    return animes.map((el, index) => {
      return (
        <CardAnime anime={el} key={index}/>
      )
    })
  }

  if (animes.length > 0) {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col md="12">
              <h1 className="header-title">Welcome to Animelist</h1>
            </Col>
          </Row>
  
          <Row>
            <Col>
              <h2 className="mt-5 mb-4">
                Top 10 Anime
              </h2>
            </Col>
          </Row>
          <Row>
            {renderAnime()}
          </Row>
        </Container>
      </div>
    )
  } else {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col md="12">
              <h1 className="header-title">Welcome to Animelist</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              Loading... Please wait
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default App;

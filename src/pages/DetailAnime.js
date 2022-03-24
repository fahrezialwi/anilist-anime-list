import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useParams } from "react-router-dom";
import axios from 'axios';

function App() {
  let params = useParams();
  const [anime, setAnime] = useState(null);
  
  let query = `
    query ($id: Int) {
      Media(id: $id, sort: SCORE_DESC, type: ANIME, isAdult: false) {
        id
        title {
          userPreferred
        }
        coverImage {
          large
        }
        bannerImage
        season
        seasonYear
        description
        status
        genres
        averageScore
        popularity
      }    
    }
  `;

  useEffect(() => {
    axios.post('https://graphql.anilist.co', {
      query: query,
      variables: {
        id: params.id,
      }
    }).then((res) => {
      setAnime(res.data.data.Media);
    })
  }, [query, params.id])

  if (anime !== null) {
    return (
      <div className="detail-anime">
        <Container>
          <Row>
            <Col className="mt-5">
              <div className="anime-image">
                <img src={anime.coverImage.large} alt={anime.title.userPreferred}/>
              </div>
            </Col>
          </Row>
  
          <Row>
            <Col className="mt-5 mb-3">
              <h1>
                {anime.title.userPreferred}
              </h1>
            </Col>
          </Row>

          <Row>
            <Col>
              {anime.season} {anime.seasonYear}
            </Col>
          </Row>

          <Row>
            <Col>
              {anime.status}
            </Col>
          </Row>

          <Row>
            <Col className="mt-2 mb-3">
              {anime.genres.join(', ')}
            </Col>
          </Row>

          <Row>
            <Col className="mb-5">
              <div dangerouslySetInnerHTML={{__html: anime.description}}></div>
            </Col>
          </Row>
          
          <Row>
            <Col>
              Average Score
              <h2>{anime.averageScore}</h2>
            </Col>
          </Row>
        </Container>
      </div>
    )
  } else {
    return (
      <div className="detail-anime">
        <Container>
          <Row>
            <Col className="mt-5 text-center">
              Loading... Please wait
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default App;

import React from 'react';
import { Col, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { useNavigate } from "react-router-dom";

function CardAnime ({anime}) {

  let navigate = useNavigate();

  return (
    <Col md="3" sm="6">
      <Card
        className="my-2 anime-card"
        onClick={() => navigate(`/anime/${anime.id}`)}
      >
        <CardBody className="d-flex flex-column">
          <div className="anime-image">
            <img src={anime.coverImage.medium} alt={anime.title.userPreferred}/>
          </div>
          <CardTitle tag="h4" className="mt-3 anime-title">
            {anime.title.userPreferred}
          </CardTitle>
          <CardSubtitle>
            {anime.season} {anime.seasonYear}
          </CardSubtitle>
          <CardText>
            {anime.status}
          </CardText>
        </CardBody>
      </Card>
    </Col>
  )
}

export default CardAnime;
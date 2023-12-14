/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { BigBadge } from "./styles";
import { Row, Col, Card, Image, Button, Spinner } from "react-bootstrap";
import PageLayout from "../../components/layout/page-layout";
import Select from "react-select";
import useCatBreeds from "../../hooks/use-catbreeds";
import useCatImages from "../../hooks/use-catimages";
import { CatBreed } from "../../components/types/cat-breed";
import { CatThumb } from "../../components/types/cat-thumb";

export default function HomePage() {
  const options = useCatBreeds();
  const [page, setPage] = useState(1);
  const [selectedBreed, setSelectedBreed] = useState<CatBreed | null>(null);
  const { cats, loading, error, hasMore } = useCatImages(
    selectedBreed?.value || "",
    page
  );

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleBreedChange = (selectedOption: CatBreed | null) => {
    setSelectedBreed(selectedOption);
    setPage(1);
  };

  return (
    <PageLayout>
      <Row className="mb-4">
        <Col xs={12} md={8}>
          <BigBadge bg="info">Cat Browser</BigBadge>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col xs={12} md={8}>
          <h2>Breed:</h2>
          <Select options={options.breeds} onChange={handleBreedChange} />
        </Col>
      </Row>
      <Row>
        {error ? (
          <div>Error: {error} </div>
        ) : cats.length ? (
          (cats as CatThumb[]).map((cat) => (
            <Col xs={12} md={4} key={cat.id} className="mb-4">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  as={Image}
                  fluid
                  src={cat.url}
                  style={{
                    objectFit: "cover",
                  }}
                />
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                  <Card.Title>
                    {selectedBreed?.label} :{cat.id}
                  </Card.Title>
                  <Button variant="primary">View Details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : !loading ? (
          <p>No Cats available</p>
        ) : (
          ""
        )}
      </Row>
      <Row className="justify-content-center mb-4">
        {loading ? (
          <Spinner animation="border" />
        ) : cats.length && hasMore ? (
          <Button variant="success" onClick={handleLoadMore}>
            Load More
          </Button>
        ) : (
          ""
        )}
      </Row>
    </PageLayout>
  );
}

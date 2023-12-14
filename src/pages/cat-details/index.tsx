import React from "react";
import { useParams } from "react-router-dom";
import { useCatContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import PageLayout from "../../components/layout/page-layout";

export default function CatDetailsPage() {
  const { id } = useParams();
  const { cats } = useCatContext();
  const navigate = useNavigate();

  const cat = cats.find((cat) => cat.id === id);

  return (
    <PageLayout>
      <Row className="mb-4 justify-content-center">
        <Col xs={12} md={12} className="mb-12">
          <Button
            variant="primary"
            onClick={() => navigate(-1)}
            style={{
              marginLeft: "0",
              marginBottom: "20px",
              width: "100px",
            }}
          >
            Back
          </Button>
          {cat ? (
            <Card className="h-100 mx-auto">
              <Card.Img
                variant="top"
                as={Image}
                fluid
                src={cat.url}
                style={{
                  objectFit: "cover",
                  height: "40rem",
                }}
              />
              <Card.Body className="d-flex flex-column justify-content-center align-items-center v-30">
                <h5 className="mb-3 text-primary">
                  Breed: {cat.breeds[0].name}
                </h5>
                <p className="mb-2">
                  <strong>Origin:</strong> {cat.breeds[0].origin}
                </p>
                <p className="mb-2">
                  <strong>Temperament:</strong> {cat.breeds[0].temperament}
                </p>
                <p className="mb-2">
                  <strong>Description:</strong> {cat.breeds[0].description}
                </p>
              </Card.Body>
            </Card>
          ) : (
            <h1>Cat not found</h1>
          )}
        </Col>
      </Row>
    </PageLayout>
  );
}

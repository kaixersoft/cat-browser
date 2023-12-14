// SkeletonCard.js
import React from "react";
import { Card, Button } from "react-bootstrap";

const SkeletonCard = () => (
  <Card className="h-100">
    <Card.Img
      variant="top"
      style={{ backgroundColor: "#ccc", height: "200px" }}
    />
    <Card.Body>
      <Card.Title> </Card.Title>
      <Button variant="primary" disabled style={{ visibility: "hidden" }}>
        View Details
      </Button>
    </Card.Body>
  </Card>
);

export default SkeletonCard;

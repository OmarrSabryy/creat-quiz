import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
  const quizes = useSelector((state) => state.quizes);
  return (
    <section className="pad-x flex-colCenter w-100">
      <h1 className="mt-4 text-capitalize text-secondary">quiz maker</h1>
      <Container className="d-flex justify-content-end align-items-center w-100 mt-4">
        <Link to="/new-quiz">
          <Button className="text-capitalize" variant="primary">
            create new quiz
          </Button>
        </Link>
      </Container>
      <Container>
        <h2 className=" mt-3 text-muted">Quizes</h2>
      </Container>
      <Container className="border bg-white rounded-3 p-3 shadow-sm">
        {quizes.map((quiz) => (
          <Container
            key={quiz.id}
            className="bg-light mb-3 rounded-2 p-2 shadow-sm"
          >
            <Row className="h6">
              <Col>{quiz.title}</Col>
              <Col xs={6}>Description: {quiz.description}</Col>
              <Col>Score: {quiz.score}</Col>
            </Row>
            <div className="d-flex justify-content-between align-items-center">
              <a href={quiz.url}>{quiz.url}</a>
              <Link to={`/update-quiz/${quiz.id}`}>
                <Button>update</Button>
              </Link>
            </div>
          </Container>
        ))}
      </Container>
    </section>
  );
};

export default HomePage;

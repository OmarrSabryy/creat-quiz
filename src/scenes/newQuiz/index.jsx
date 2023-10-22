import React from "react";
import { Container } from "react-bootstrap";
import { QuizForm } from "../../components/forms";

const NewQuiz = () => {
  return (
    <section className="pad-x flex-colCenter w-100">
      <Container>
        <h1 className="text-capitalize mt-4">create new quiz</h1>
        <QuizForm />
      </Container>
    </section>
  );
};

export default NewQuiz;

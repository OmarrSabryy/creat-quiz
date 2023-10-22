import React from "react";
import { Container } from "react-bootstrap";
import { QuizForm } from "../../components/forms";
import { useParams } from "react-router-dom";

const UpdateQuiz = () => {
  const { quizId } = useParams();
  console.log(quizId);

  return (
    <section className="pad-x flex-colCenter w-100">
      <Container>
        <h1 className="text-capitalize mt-4">Update Quiz</h1>
        <QuizForm type="update" quizId={quizId} />
      </Container>
    </section>
  );
};

export default UpdateQuiz;

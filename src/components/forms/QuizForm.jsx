import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import { Button, Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import QuestionForm from "./QuestionForm";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addNewQuiz, updateQuizes } from "../../state";
import { Link } from "react-router-dom";

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().required(),
  finalScore: Yup.string().required(),
  url: Yup.string().required(),
});

const QuizForm = ({ type, quizId }) => {
  const [show, setShow] = useState(false);
  const [questionToUpdate, setQuestionToUpdate] = useState(false);
  const [questions, setQuestions] = useState([]);
  const dispatch = useDispatch();
  const quizes = useSelector((state) => state.quizes);
  const quiz = type === "update" && quizes.find((quiz) => quiz.id === +quizId);
  const initialValues = {
    title: type === "update" ? quiz?.title : "",
    description: type === "update" ? quiz?.description : "",
    finalScore: type === "update" ? quiz?.score : "",
    url: type === "update" ? quiz?.url : "",
  };

  const formSubmitHandler = (values, onSubmitProps) => {
    if (type === "update") {
      let updatedQuiz = {
        ...quiz,
        title: values.title,
        description: values.description,
        score: values.finalScore,
        questions_answers: questions,
        modified: new Date().toLocaleString(),
      };
      dispatch(updateQuizes({ quiz: updatedQuiz }));
    } else {
      let newQuiz = {};
      newQuiz = {
        createdAt: new Date().toLocaleString(),
        description: values.description,
        id: quizes.length + 1,
        modified: null,
        questions_answers: questions.map((question, i) => {
          return {
            answer_id: null,
            answers: question.answers.map((answer, i) => {
              return {
                id: i + 1,
                is_true: answer.is_true,
                text: answer.text,
              };
            }),
            feedback_false: question.feedback_false,
            feedback_true: question.feedback_true,
            id: i + 1,
            text: question.question,
          };
        }),
        score: values.finalScore,
        title: values.title,
        url: values.url,
      };
      dispatch(addNewQuiz({ quiz: newQuiz }));
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const questionSubmitHandler = (question) => {
    if (type === "update") {
      console.log(question, questions);
      let newQuestion = {
        answer_id: null,
        answers: question.answers.map((answer, i) => {
          return {
            id: i + 1,
            is_true: answer.is_true,
            text: answer.text,
          };
        }),
        feedback_false: question.feedback_false,
        feedback_true: question.feedback_true,
        id: questions.length + 1,
        text: question.question,
      };
      let updatedQuestions = [...questions];
      updatedQuestions.push(newQuestion);
      setQuestions(updatedQuestions);
    } else {
      let newQuestions = [...questions];
      newQuestions.push(question);
      setQuestions(newQuestions);
    }
  };

  const questionUpdateHandler = (question) => {
    console.log(question);
    let updatedQuestions = questions.map((q) => {
      if (q.id === question.id) return question;
      return q;
    });
    setQuestions(updatedQuestions);
  };

  useEffect(() => {
    if (type === "update") setQuestions(quiz.questions_answers);
  }, [type, quiz.questions_answers]);
  return (
    <>
      <Container className="mt-4">
        <div className="d-flex justify-content-between">
          <Button className="justify-self-end" onClick={handleShow}>
            Add Question
          </Button>
          <Link to="/">
            <Button
              variant="link"
              className="justify-self-start"
              onClick={handleShow}
            >
              Back To Home
            </Button>
          </Link>
        </div>

        <Container className="border p-3 mt-1 rounded-4 bg-white shadow-sm">
          <Formik
            onSubmit={formSubmitHandler}
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              resetForm,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group
                  controlId="validationFormik101"
                  className="position-relative mb-3"
                >
                  <Form.Label className="h5">Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.title && !errors.title}
                    isInvalid={touched.title && errors.title}
                  />
                </Form.Group>
                <Form.Group
                  controlId="validationFormik102"
                  className="position-relative mb-3"
                >
                  <Form.Label className="h5">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.description && !errors.description}
                    isInvalid={touched.description && errors.description}
                  />
                </Form.Group>
                <Form.Group
                  controlId="validationFormik103"
                  className="position-relative mb-3"
                >
                  <Form.Label className="h5">Final Score</Form.Label>
                  <Form.Control
                    type="number"
                    name="finalScore"
                    min={1}
                    value={values.finalScore}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.finalScore && !errors.finalScore}
                    isInvalid={touched.finalScore && errors.finalScore}
                  />
                </Form.Group>
                <Form.Group
                  controlId="validationFormik101"
                  className="position-relative mb-3"
                >
                  <Form.Label className="h5">URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="url"
                    value={values.url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.url && !errors.url}
                    isInvalid={touched.url && errors.url}
                  />
                </Form.Group>
                {questions?.length > 0 && (
                  <Button type="submit">
                    {type === "update" ? "Update Quiz" : "Submit Quiz"}
                  </Button>
                )}
              </Form>
            )}
          </Formik>
        </Container>
        {questions?.length > 0 && (
          <>
            <h4 className="mt-4">Questions</h4>
            <Container
              style={{ maxHeight: "500px" }}
              className="border rounded-4 p-3 overflow-y-scroll overflow-hidden mb-4 bg-white shadow-sm"
            >
              {questions.map((question, i) => (
                <div
                  key={i + "q"}
                  className="d-flex justify-content-between align-items-center p-3 bg-light rounded-2 text-dark text-capitalize mb-2 "
                >
                  <p className="mb-0">{question.question || question.text}</p>
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    {type === "update" && (
                      <Button
                        onClick={() => {
                          setQuestionToUpdate(question);
                          setShow(true);
                        }}
                      >
                        update
                      </Button>
                    )}
                    <AiOutlineDelete
                      cursor="pointer"
                      onClick={() =>
                        setQuestions(
                          questions.filter((_, index) => index !== i)
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </Container>
          </>
        )}
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {type === "update" ? "Update Question" : "Add New Question"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <QuestionForm
            submitQuestion={questionSubmitHandler}
            type={type}
            question={questionToUpdate}
            updateQuestion={questionUpdateHandler}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default QuizForm;

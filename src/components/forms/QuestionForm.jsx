import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";

const questionSchema = Yup.object().shape({
  question: Yup.string().required("Question is required"),
  feedback_true: Yup.string().required("Feedback is required"),
  feedback_false: Yup.string().required("Feedback is required"),
  answers: Yup.array()
    .of(
      Yup.object().shape({
        text: Yup.string().required("Answer is required"),
        is_true: Yup.boolean(),
      })
    )
    .required("Answers required")
    .test(
      "only-one-true-answer",
      "Select exactly one answer as true",
      function (value) {
        const trueAnswersCount = value.filter(
          (answer) => answer.is_true
        ).length;
        return trueAnswersCount === 1;
      }
    )
    .min(2)
    .max(4),
});

const QuestionForm = ({ submitQuestion, type, question, updateQuestion }) => {
  const initialState = {
    question: type === "update" && question ? question?.text : "",
    feedback_true: type === "update" && question ? question?.feedback_true : "",
    feedback_false:
      type === "update" && question ? question?.feedback_false : "",
    answers: type === "update" && question ? question.answers : [],
  };

  const formSubmitHandler = (values, onSubmitProps) => {
    if (type === "update" && question) {
      console.log(values, question);
      let updatedQuestion = {
        answer_id: null,
        id: question.id,
        text: question.text,
        feedback_false: values.feedback_false,
        feedback_true: values.feedback_true,
        answers: values.answers.map((answer, i) => {
          return {
            id: i + 1,
            is_true: answer.is_true,
            text: answer.text,
          };
        }),
      };
      updateQuestion(updatedQuestion);
    } else {
      submitQuestion(values);
      onSubmitProps.resetForm();
    }
  };
  return (
    <Formik
      onSubmit={formSubmitHandler}
      initialValues={initialState}
      validationSchema={questionSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="question" className="position-relative mb-3">
            <Form.Label className="h6 md:h5">Question</Form.Label>
            <Form.Control
              type="text"
              name="question"
              value={values.question}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.question && !errors.question}
              isInvalid={touched.question && errors.question}
            />
            <Form.Control.Feedback type="invalid">
              {errors.question}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            controlId="feedback_true"
            className="position-relative mb-3"
          >
            <Form.Label className="h6">True Answer Feedback</Form.Label>
            <Form.Control
              type="text"
              name="feedback_true"
              value={values.feedback_true}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.feedback_true && !errors.feedback_true}
              isInvalid={touched.feedback_true && errors.feedback_true}
            />
            <Form.Control.Feedback type="invalid">
              {errors.feedback_true}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            controlId="feedback_false"
            className="position-relative mb-3"
          >
            <Form.Label className="h6">Wrong Answer Feedback</Form.Label>
            <Form.Control
              type="text"
              name="feedback_false"
              value={values.feedback_false}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.feedback_false && !errors.feedback_false}
              isInvalid={touched.feedback_false && errors.feedback_false}
            />
            <Form.Control.Feedback type="invalid">
              {errors.feedback_false}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="w-100 d-flex justify-content-end">
            <Button
              variant="dark"
              onClick={() =>
                setFieldValue("answers", [
                  ...values.answers,
                  { text: "", is_true: false },
                ])
              }
            >
              Add Answer
            </Button>
          </div>
          <Form.Group controlId="answers">
            <h6 className="">Answers</h6>
            {values.answers.map((answer, index) => (
              <div
                key={index}
                className="d-flex justify-content-between align-items-center mb-3"
              >
                <Form.Control
                  className="d-flex w-75"
                  type="text"
                  name={`answers[${index}].text`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={answer.text}
                  isInvalid={
                    touched.answers?.[index]?.text &&
                    errors.answers?.[index]?.text
                  }
                  isValid={
                    touched.answers?.[index]?.text &&
                    !errors.answers?.[index]?.text
                  }
                />
                <Form.Check
                  name={`answers[${index}].is_true`}
                  label="Is True"
                  checked={answer.is_true}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <AiOutlineDelete
                  color="red"
                  cursor="pointer"
                  onClick={() =>
                    setFieldValue(
                      "answers",
                      values.answers.filter((_, i) => i !== index)
                    )
                  }
                />
              </div>
            ))}
            {touched.answers?.length === values.answers?.length &&
              errors.answers && (
                <div>
                  {errors.answers ? (
                    typeof errors.answers === "string" ? (
                      <p className="text-danger">{errors.answers}</p>
                    ) : (
                      errors.answers?.map((answer, i) => (
                        <p key={i} className="text-danger">
                          {answer.text}
                        </p>
                      ))
                    )
                  ) : (
                    ""
                  )}
                </div>
              )}
          </Form.Group>
          <Button type="submit">
            {type === "update" && question
              ? "Update Question"
              : "Submit question"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default QuestionForm;

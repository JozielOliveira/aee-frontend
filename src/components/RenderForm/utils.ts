import * as yup from "yup";
import { message } from "./constants";
import { QuestionType } from "../../types";

export const getInitialValue = (questions: QuestionType[]) => {
  const values: any = {};
  questions.forEach((question) => {
    values[question.name] = question.defaultValue;
  });
  return values;
};

export const getValidationSchema = (question: QuestionType[]) => {
  let schema: any = {};

  question.forEach((question) => {
    if (question.validations?.length) {
      schema[question.name] = yup;

      question.validations.forEach((validation, index) => {
        schema[question.name] = schema[question.name][validation](
          index && message[validation](question.label)
        );
      });
    }
  });

  return yup.object().shape(schema);
};

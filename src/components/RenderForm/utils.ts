import * as yup from "yup";
import { message } from "./constants";
import { QuestionType } from "types";

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
      switch (question.type) {
        case 'text':
          schema[question.name] = yup.string();
          break;
        case 'boolean':
          schema[question.name] = yup.string();
          break;
        case 'options':
          schema[question.name] = yup.string();
          break;
        default:
          schema[question.name] = yup[question.type]();
      }

      question.validations.forEach((validation, index) => {
        const messageError = message[validation.value](question.label);

        schema[question.name] = schema[question.name][validation.value](
          messageError
        );
      });
    }
  });

  return yup.object().shape(schema);
};

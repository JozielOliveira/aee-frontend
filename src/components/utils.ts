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
      if (question.type === 'number')
        schema[question.name] = yup.number();
      else
        schema[question.name] = yup.string();

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

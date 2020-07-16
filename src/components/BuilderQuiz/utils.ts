import { BuilderQuizProps } from "types";

export const deepDiffMapper = function () {
  return {
    VALUE_CREATED: 'created',
    VALUE_UPDATED: 'updated',
    VALUE_DELETED: 'deleted',
    VALUE_UNCHANGED: 'unchanged',
    map: function (obj1: any, obj2: any) {
      if (this.isFunction(obj1) || this.isFunction(obj2)) {
        // eslint-disable-next-line
        throw 'Invalid argument. Function given, object expected.';
      }
      if (this.isValue(obj1) || this.isValue(obj2)) {
        return {
          type: this.compareValues(obj1, obj2),
          data: obj1 === undefined ? obj2 : obj1
        };
      }

      var diff: any = this.isArray(obj1) ? [] : {};
      for (var key in obj1) {
        if (this.isFunction(obj1[key])) {
          continue;
        }

        var value2 = undefined;
        if (obj2[key] !== undefined) {
          value2 = obj2[key];
        }

        diff[key] = this.map(obj1[key], value2);
      }
      // eslint-disable-next-line
      for (var key in obj2) {
        if (this.isFunction(obj2[key]) || diff[key] !== undefined) {
          continue;
        }

        diff[key] = this.map(undefined, obj2[key]);
      }

      return diff;

    },
    compareValues: function (value1: any, value2: any) {
      if (value1 === value2) {
        return this.VALUE_UNCHANGED;
      }
      if (this.isDate(value1) && this.isDate(value2) && value1.getTime() === value2.getTime()) {
        return this.VALUE_UNCHANGED;
      }
      if (value1 === undefined) {
        return this.VALUE_CREATED;
      }
      if (value2 === undefined) {
        return this.VALUE_DELETED;
      }
      return this.VALUE_UPDATED;
    },
    isFunction: function (x: any) {
      return Object.prototype.toString.call(x) === '[object Function]';
    },
    isArray: function (x: any) {
      return Object.prototype.toString.call(x) === '[object Array]';
    },
    isDate: function (x: any) {
      return Object.prototype.toString.call(x) === '[object Date]';
    },
    isObject: function (x: any) {
      return Object.prototype.toString.call(x) === '[object Object]';
    },
    isValue: function (x: any) {
      return !this.isObject(x) && !this.isArray(x);
    }
  }
}();

export const handleNewValues = (initial: BuilderQuizProps | [], values: any): BuilderQuizProps => {
  const compare = (obj: any, key: any) => {
    try {
      return obj[key].type !== 'unchanged'
    } catch (error) {
      return obj.type !== 'unchanged'
    }
  }
  const conditional = (question: any) => question.type || question.type !== 'unchanged' ?
    compare(question, 'position') || compare(question, 'question_title') || compare(question, 'question_type') ||
    compare(question, 'question_answer') ||
    question.question_options[question.question_options.length - 1]?.type === 'created'
    : false

  const diff: any = deepDiffMapper.map(initial, values)
  console.log(diff)
  const steps = diff.steps.map((step: any, index: number) => {
    if (step.type === "created")
      return step.data
    else if (
      compare(step, 'position') ||
      compare(step, 'step_title') ||
      compare(step, 'step_description') ||
      step.questions?.some((question: any) => conditional(question))
    )
      return {
        ...values.steps[index],
        questions: step.questions.map((question: any, index_question: number) =>
          conditional(question)
            ?
            {
              ...values.steps[index].questions[index_question],
            } : undefined
        ).filter((question: any) => question) ||
          values.steps[index].questions
      }
    else
      return undefined
  }).filter((step: any) => step)

  const newValues: BuilderQuizProps = {
    id: values.id,
    quiz_title: values.quiz_title,
    quiz_description: values.quiz_description,
    steps
  }

  console.log(newValues)
  return (newValues)
}

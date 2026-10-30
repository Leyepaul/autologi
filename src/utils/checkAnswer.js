// One place that decides if an answer is right. Add a case when you add a question type.
export function checkAnswer(question, answer) {
  switch (question.type) {
    case 'multiple_choice':
    case 'true_false':
    case 'predict_output':
      return answer === question.answer;
    case 'match_pairs':
      // Perfect only if the learner finished with zero wrong matches
      return answer?.mistakes === 0;
    case 'drag_order':
      // question.items is written in the CORRECT order
      return Array.isArray(answer) && answer.every((item, i) => item === question.items[i]);
    default:
      return false;
  }
}

import MultipleChoice from './MultipleChoice';
import TrueFalse from './TrueFalse';
import PredictOutput from './PredictOutput';
import MatchPairs from './MatchPairs';
import DragOrder from './DragOrder';

// Maps question.type -> component. Add new question types here.
const TYPES = {
  multiple_choice: MultipleChoice,
  true_false: TrueFalse,
  predict_output: PredictOutput,
  match_pairs: MatchPairs,
  drag_order: DragOrder,
};

export default function QuestionRenderer(props) {
  const Component = TYPES[props.question.type];
  if (!Component) return <p>Unknown question type: {props.question.type}</p>;
  return <Component {...props} />;
}

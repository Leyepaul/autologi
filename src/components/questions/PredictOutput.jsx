import LadderRung from '../LadderRung';
import OptionList from './OptionList';

// Shows a rung. Power colours appear only after the learner checks.
export default function PredictOutput({ question, answer, onChange, locked }) {
  const options = question.options.map((label) => ({ value: label, label }));
  return (
    <>
      <h2 className="prompt">{question.prompt}</h2>
      <div className="card">
        <LadderRung elements={question.rung} reveal={locked} />
      </div>
      <OptionList options={options} selected={answer} onSelect={onChange} locked={locked} />
    </>
  );
}

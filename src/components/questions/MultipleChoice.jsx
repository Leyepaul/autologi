import OptionList from './OptionList';

export default function MultipleChoice({ question, answer, onChange, locked }) {
  const options = question.options.map((label, i) => ({ value: i, label }));
  return (
    <>
      <h2 className="prompt">{question.prompt}</h2>
      <OptionList options={options} selected={answer} onSelect={onChange} locked={locked} />
    </>
  );
}

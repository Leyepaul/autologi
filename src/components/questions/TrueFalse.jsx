import OptionList from './OptionList';

const OPTIONS = [
  { value: true, label: 'True' },
  { value: false, label: 'False' },
];

export default function TrueFalse({ question, answer, onChange, locked }) {
  return (
    <>
      <h2 className="prompt">{question.prompt}</h2>
      <OptionList options={OPTIONS} selected={answer} onSelect={onChange} locked={locked} />
    </>
  );
}

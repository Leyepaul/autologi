// Shared list of tappable answer buttons (used by multiple choice, true/false, predict output)

import { play } from '../../audio/sounds';

export default function OptionList({ options, selected, onSelect, locked }) {
  return (
    <div className="options">
      {options.map((opt) => (
        <button
          key={String(opt.value)}
          className={`option ${selected === opt.value ? 'is-selected' : ''}`}
          disabled={locked}
          onClick={() => { play('tap'); onSelect(opt.value); }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

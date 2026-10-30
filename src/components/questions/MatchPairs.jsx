import { useMemo, useState } from 'react';
import { shuffle } from '../../utils/shuffle';

// Tap one item on the left, then its partner on the right.
// Every correct pair gets its OWN colour (and a letter badge, so it works without colour too).
// Colours come from --pair-1 ... --pair-5 in styles/variables.css (max 5 pairs).
// Reports { mistakes } once every pair is matched.
const LETTERS = ['A', 'B', 'C', 'D', 'E'];

export default function MatchPairs({ question, onChange, locked }) {
  const { pairs } = question;
  const rights = useMemo(() => shuffle(pairs.map((p) => p.right)), [pairs]);
  const [matched, setMatched] = useState([]);        // matched left labels
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [wrong, setWrong] = useState(null);          // { left, right } flashing red
  const [mistakes, setMistakes] = useState(0);

  const pairIndexByLeft = (left) => pairs.findIndex((p) => p.left === left);
  const pairIndexByRight = (right) => pairs.findIndex((p) => p.right === right);
  const isLeftMatched = (left) => matched.includes(left);
  const isRightMatched = (right) => matched.includes(pairs[pairIndexByRight(right)].left);

  function pickRight(right) {
    if (!selectedLeft || locked) return;
    if (pairs[pairIndexByLeft(selectedLeft)].right === right) {
      const nextMatched = [...matched, selectedLeft];
      setMatched(nextMatched);
      setSelectedLeft(null);
      if (nextMatched.length === pairs.length) onChange({ mistakes });
    } else {
      setMistakes((m) => m + 1);
      setWrong({ left: selectedLeft, right });
      setSelectedLeft(null);
      setTimeout(() => setWrong(null), 600);
    }
  }

  function renderItem(text, idx, isMatched, extraClass, onClick) {
    return (
      <button
        key={text}
        disabled={isMatched || locked}
        className={`option pair-${idx} ${isMatched ? 'is-matched' : ''} ${extraClass}`}
        onClick={onClick}
      >
        {isMatched && <span className="badge">{LETTERS[idx]}</span>}
        {text}
      </button>
    );
  }

  return (
    <>
      <h2 className="prompt">{question.prompt}</h2>
      <p className="hint">Tap an item on the left, then its partner on the right</p>
      <div className="match">
        <div className="match__col">
          {pairs.map((p, i) =>
            renderItem(
              p.left, i, isLeftMatched(p.left),
              `${selectedLeft === p.left ? 'is-picked' : ''} ${wrong?.left === p.left ? 'is-wrong' : ''}`,
              () => setSelectedLeft(p.left)
            )
          )}
        </div>
        <div className="match__col">
          {rights.map((r) =>
            renderItem(
              r, pairIndexByRight(r), isRightMatched(r),
              wrong?.right === r ? 'is-wrong' : '',
              () => pickRight(r)
            )
          )}
        </div>
      </div>
    </>
  );
}

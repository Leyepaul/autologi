export function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Shuffle, but never return the list in its original (correct) order
export function shuffleDifferent(list) {
  if (list.length < 2) return [...list];
  let result;
  do {
    result = shuffle(list);
  } while (result.every((v, i) => v === list[i]));
  return result;
}

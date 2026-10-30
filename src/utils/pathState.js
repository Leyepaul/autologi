// Works out what is locked and unlocked on the home path.
//
// UNIT rule:   a unit opens only when EVERY lesson in the units before it is finished.
//              A lesson that is still "coming soon" counts as unfinished, so it blocks the next unit.
// LESSON rule: inside an open unit, lessons are played in order.
//
// Lesson states:
// 'done'    finished (stays reviewable even if its unit later locks)
// 'current' the next lesson to play in an open unit
// 'open'    playable (only when the dev switch unlocks everything)
// 'locked'  finish the earlier lesson or unit first
// 'soon'    no content file yet

export function getUnitStatus(units, completed, unlockAll = false) {
  const status = {};
  let everythingBeforeDone = true;
  units.forEach((unit) => {
    const done = unit.lessons.filter((l) => completed[l.id]).length;
    const finished = done === unit.lessons.length;
    status[unit.id] = {
      locked: !(everythingBeforeDone || unlockAll),
      done,
      total: unit.lessons.length,
      finished,
    };
    everythingBeforeDone = everythingBeforeDone && finished;
  });
  return status;
}

export function getPathState(units, lessons, completed, unlockAll = false) {
  const unitStatus = getUnitStatus(units, completed, unlockAll);
  const states = {};
  units.forEach((unit) => {
    const unitLocked = unitStatus[unit.id].locked;
    let previousDone = true;
    unit.lessons.forEach((l) => {
      if (!lessons[l.id]) { states[l.id] = 'soon'; return; }
      if (completed[l.id]) { states[l.id] = 'done'; return; }
      if (unitLocked) { states[l.id] = 'locked'; return; }
      if (previousDone) {
        states[l.id] = 'current';
        previousDone = false;
      } else {
        states[l.id] = unlockAll ? 'open' : 'locked';
      }
    });
  });
  return states;
}
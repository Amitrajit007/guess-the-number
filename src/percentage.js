export function GetResult(difficulty, difference, flag) {
  let max;
  if (difficulty === "Easy") {
    max = 10;
  } else if (difficulty === "Normal") {
    max = 50;
  } else if (difficulty === "Hard") {
    max = 100;
  }

  const percent = (difference / max) * 100;
  if (percent === 0) {
    flag = true;
    return { msg: "Got it", flag, percent };
  } else if (percent <= 10) return { msg: "Almost There", flag, percent };
  else if (percent <= 25) return { msg: "You're close", flag, percent };
  else if (percent <= 40) return { msg: "Not so close", flag, percent };
  else return { msg: "Bruh", flag, percent };
}

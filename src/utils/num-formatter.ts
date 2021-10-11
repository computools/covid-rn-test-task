const M = 1000000;
const defDigits = 1;
const K = 1000;
const almostK = 999;

export const numFormatter = (value: number) => {
  if (value > almostK && value < M) {
    return (value / K).toFixed(defDigits) + 'K';
  } else if (value > M) {
    return (value / M).toFixed(defDigits) + 'M';
  }

  return value;
};

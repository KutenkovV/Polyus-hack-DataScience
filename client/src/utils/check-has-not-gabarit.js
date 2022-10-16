export function checkHasNotGabarit(data = []) {
  return data.length === 10 && data[9] > 0;
}

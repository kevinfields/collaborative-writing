export default function checkTurn(round, order, name) {

  if (order[round % order.length] === name) {
    return true;
  } else {
    return false;
  }
}
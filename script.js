let currencyUnits = [
  ["PENNY", 1],
  ["NICKEL", 5],
  ["DIME", 10],
  ["QUARTER", 25],
  ["ONE", 100],
  ["FIVE", 500],
  ["TEN", 1000],
  ["TWENTY", 2000],
  ["ONE HUNDRED",10000] 
];

function checkCashRegister(price, cash, cid) {
  let change = Math.round(cash * 100) - Math.round(price * 100);
  let cashOnHand = {};
  let cashToGive = {};

  cid.forEach(currencyunit => {
    cashOnHand[currencyunit[0]] = Math.round(currencyunit[1] * 100)
  })
  
  let index = currencyUnits.length - 1;

  while(index >= 0 && change > 0) {
    let moneyName = currencyUnits[index][0];
    let moneyValue = currencyUnits[index][1];
    
    if(change >= moneyValue > 0 && cashOnHand[moneyName] > 0) {
      cashToGive[moneyName] = 0;
      while(cashOnHand[moneyName] > 0 && change >= moneyValue) {
        cashOnHand[moneyName] -= moneyValue;
        cashToGive[moneyName] += moneyValue;
        change -= moneyValue;
      }
    }
    index -= 1;
  }
  if(change === 0) {
    let isRegisterEmpty = true;

    Object.keys(cashOnHand).forEach(moneyType => {
      if(cashOnHand[moneyType] > 0) {
        isRegisterEmpty = false;
      }
    });

    if(isRegisterEmpty) {
      return {status: "CLOSED", change: cid}
    } else {
      let changeArray = [];
    Object.keys(cashToGive).map(moneyType => {
      if(cashToGive[moneyType] > 0) {
        changeArray.push([moneyType, cashToGive[moneyType] / 100]);
      }
    });
    return {status: "OPEN", change: changeArray}
    }
  }
  return {status: "INSUFFICIENT_FUNDS", change: []}
}

console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));

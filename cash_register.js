function checkCashRegister(price, cash, cid) {
  let mels = +(cash - price).toFixed(2);
  console.log(mels)
  let change = check(mels, cid);
  
  if (change.status === "OPEN" && getTotal(change.change) !== mels) {
    change = { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  console.log(change)
  return change;
}

function check(mels, cid) {
  const currencyUnits = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
  };

  let totalCID = 0;
  for (let i = 0; i < cid.length; i++) {
    totalCID += cid[i][1];
  }
  totalCID = +(totalCID).toFixed(2);

  
  if (totalCID < mels) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };

  } else if (totalCID === mels) {
    return { status: "CLOSED", change: cid };

  } else {
    cid = cid.reverse();
    // console.log(cid)
    let result = [];
    for (let i = 0; i < cid.length; i++) {

      let temp = [cid[i][0], 0];
      // console.log(temp,'temp')

      while (mels >= currencyUnits[cid[i][0]] && cid[i][1] > 0) {
        temp[1] += currencyUnits[cid[i][0]];
        console.log(temp,'temp')
        cid[i][1] -= currencyUnits[cid[i][0]];
        //  console.log(cid,'cid')
        mels -= currencyUnits[cid[i][0]];
        mels = +(mels).toFixed(2);
        console.log(mels,'meLs')
      }
      if (temp[1] > 0) {
        console.log(temp,'k')
        result.push(temp);
        console.log(result,'res')
      }
    }
  
    if (mels > 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
    
    return { status: "OPEN", change: result };
  }
}

function getTotal(changeArr) {
  let total = 0;
  for (let i = 0; i < changeArr.length; i++) {
    total += changeArr[i][1];
  }
  return +(total).toFixed(2);
}

// checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
// checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])

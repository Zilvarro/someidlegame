export const arrayCompare = (array1, array2)=>{
  //Based on values, arrays should have same length
  for (let i = 0; i<Math.min(array1.length,array2.length); i++) {
    if (array1[i] === array2[i])
      continue
    else if (array1[i] > array2[i])
      return 1
    else
      return -1
  }
}

export const logB = (base, value)=>Math.log(value)/Math.log(base);

export const geometricSum = (initial, base, steps)=>{
    return initial * (1 - Math.pow(base, steps)) / (1 - base)
}

export const reverseGeometric = (initial, base, sumvalue)=>{
    return Math.floor(logB(base, sumvalue*(base-1)/initial + 1))
}

export const clamp = (lower, value, upper)=>{
    return Math.min(Math.max(lower,value),upper)
}

export const getRewardInterval = (amount, milliSeconds, globalMultiplier)=>{
    if (globalMultiplier <= 1 || milliSeconds > 11000)
        return clamp(1000, milliSeconds, 1000*3600*24) / amount
    else if (milliSeconds <= 1000)
        return 1000 / (amount * globalMultiplier)
    else
        return milliSeconds / (amount * Math.pow(globalMultiplier, 1.1 - milliSeconds / 10000))
}

export const numericSort = (numArray, descending)=>{
    return numArray.sort(function(a, b) {
        return descending ? b - a: a - b;
    });
}

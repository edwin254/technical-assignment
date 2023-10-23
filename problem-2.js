function distributeGoodies(prices, employees) {
    if (prices.length < employees) {
      return "Not enough goodies.";
    }
  
    // Sort the goodies by price in ascending order.
    prices.sort((a, b) => a - b);
  
    let minPriceDifference = Infinity;
    let distribution = [];
  
    for (let i = 0; i <= prices.length - employees; i++) {
      const priceDifference = prices[i + employees - 1] - prices[i];
      
      if (priceDifference < minPriceDifference) {
        minPriceDifference = priceDifference;
        distribution = prices.slice(i, i + employees);
      }
    }
  
    return distribution;
  }
  
  const goodiesPrices = [7980, 22349, 999, 2799, 229900,11101, 9999, 2195, 9800, 4999];
  const numberOfEmployees = 4;
  const result = distributeGoodies(goodiesPrices, numberOfEmployees);
  console.log("Goodies :", result);
  
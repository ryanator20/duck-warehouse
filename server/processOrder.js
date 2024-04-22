getPackage = require('./getPackage')
calculateCost = require('./calculateCost')

function processOrder(duck, quantity, country, shippingMode) {
    const { packageType, protectionType } = getPackage(duck.size, shippingMode)
    const { cost, details } = calculateCost(country, shippingMode, quantity, duck.price, packageType)
    return { packageType, protectionType, cost, details }
}

module.exports = processOrder
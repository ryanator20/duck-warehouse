function applyUnitDiscount(cost, quantity, details, modifiers) {
    if (quantity > 100) {
        let discount = -(cost * 0.20)
        modifiers.push(discount)
        details.push(`Unit discount for order greater than 100: ${discount} USD`)
    }
}

function applyPackageCosts(cost, packageType, details, modifiers) {
    if (packageDiscountFunctions[packageType]) {
        packageDiscountFunctions[packageType](cost, details, modifiers)
    }
}

function applyWoodCost(cost, details, modifiers) {
    let additionalCost = cost * 0.05
    modifiers.push(additionalCost)
    details.push(`Additional cost for wood packaging: ${additionalCost} USD`)
}

function applyPlasticCost(cost, details, modifiers) {
    let additionalCost = cost * 0.10
    modifiers.push(additionalCost)
    details.push(`Additional cost for plastic packaging: ${additionalCost} USD`)
}

function applyCardboardDiscount(cost, details, modifiers) {
    let discount = -(cost * 0.01)
    modifiers.push(discount)
    details.push(`Discount for cardboard packaging: ${discount} USD`)
}

const packageDiscountFunctions = {
    wood: applyWoodCost,
    plastic: applyPlasticCost,
    cardboard: applyCardboardDiscount
}

function applyDestinationCosts(cost, country, details, modifiers) {
    if (destinationCostFunctions[country]) {
        destinationCostFunctions[country](cost, details, modifiers)
    } else {
        destinationCostFunctions.default(cost, details, modifiers)
    }
}

function applyUSACost(cost, details, modifiers) {
    let additionalCost = cost * 0.18
    modifiers.push(additionalCost)
    details.push(`Additional cost for shipping to USA: ${additionalCost} USD`)
}

function applyBoliviaCost(cost, details, modifiers) {
    let additionalCost = cost * 0.13
    modifiers.push(additionalCost)
    details.push(`Additional cost for shipping to Bolivia: ${additionalCost} USD`)
}

function applyIndiaCost(cost, details, modifiers) {
    let additionalCost = cost * 0.19
    modifiers.push(additionalCost)
    details.push(`Additional cost for shipping to India: ${additionalCost} USD`)
}

function applyDefaultCost(cost, details, modifiers) {
    let additionalCost = cost * 0.15
    modifiers.push(additionalCost)
    details.push(`Additional cost for shipping to default: ${additionalCost} USD`)
}

const destinationCostFunctions = {
    USA: applyUSACost,
    Bolivia: applyBoliviaCost,
    India: applyIndiaCost,
    default: applyDefaultCost
}

function applyShippingCosts(shippingMode, quantity, details, modifiers) {
    if (shippingCostFunctions[shippingMode]) {
        shippingCostFunctions[shippingMode](quantity, details, modifiers)
    }
}

function applyAirCost(quantity, details, modifiers) {
    let additionalCost = 30 * quantity
    let detailMessage = `Additional cost for air shipping: ${additionalCost} USD`
    if (quantity > 1000) {
        additionalCost = additionalCost * 0.85
        detailMessage = `Additional cost for air shipping: ${additionalCost} USD (15% discount)`
    }
    modifiers.push(additionalCost)
    details.push(detailMessage)
}

function applyLandCost(quantity, details, modifiers) {
    let additionalCost = 10 * quantity
    modifiers.push(additionalCost)
    details.push(`Additional cost for land shipping: ${additionalCost} USD`)
}

function applySeaCost(quantity, details, modifiers) {
    let additionalCost = 400
    modifiers.push(additionalCost)
    details.push(`Additional cost for sea shipping: ${additionalCost} USD`)
}

const shippingCostFunctions = {
    Air: applyAirCost,
    Land: applyLandCost,
    Sea: applySeaCost
}

function calculateCost(country, shippingMode, quantity, price, packageType) {
    let cost = quantity * price
    let details = [`Base cost: ${cost} USD`]
    let modifiers = []
    applyUnitDiscount(cost, quantity, details, modifiers)
    applyPackageCosts(cost, packageType, details, modifiers)
    applyDestinationCosts(cost, country, details, modifiers)
    applyShippingCosts(shippingMode, quantity, details, modifiers)

    cost = modifiers.reduce((acc, modifier) => acc + modifier, cost)
    return { cost, details }
}

module.exports = calculateCost
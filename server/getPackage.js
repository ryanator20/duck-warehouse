const packageTypes = {
    XLarge: 'wood',
    Large: 'wood',
    Medium: 'cardboard',
    Small: 'plastic',
    XSmall: 'plastic'
}

const airProtection = {
    default: ['polystyrene balls'],
    plastic: ['bubble wrap bags']
}

const landProtection = {
    default: ['polystyrene balls']
}

const seaProtection = {
    default: ['moisture-absorbing beads','bubble wrap bags']
}

const shippingModes = {
    Air: airProtection,
    Land: landProtection,
    Sea: seaProtection
}


function getPackage(size, shippingMode) {
    const packageType = packageTypes[size]
    const protectionType = shippingModes[shippingMode]?.[packageType] || shippingModes[shippingMode].default
    return { packageType, protectionType }
}

module.exports = getPackage
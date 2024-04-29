//Converts a string of the format '3 for 140' to an object of the format {quantity: 3, price: 140}
const convertSpecialPriceString = (specialPrice) => {
    if (specialPrice.includes(' for ')) {
        const priceArray = specialPrice.split(' for ')
        if (Number(priceArray[0]) && Number(priceArray[1])) {
            const priceObject = {
                quantity: Number(priceArray[0]),
                price: Number(priceArray[1])
            }
            return priceObject
        }
    }
    return false
}

//Takes an orders array and prices array, calulates the total cost for all items in the order and returns
const calculateSubTotal = (order, prices) => {
    if (Array.isArray(order) && Array.isArray(prices)) {
        let subTotal = 0
        order.map((item) => {
            let quantity = item.quantity
            const price = prices.filter((itemPrice) => {
                return itemPrice.item_code === item["code"]
            })[0]
            if (price.special_price) {
                const specialPriceObject = convertSpecialPriceString(price.special_price)
                if (specialPriceObject) {
                    if (quantity >= specialPriceObject.quantity) {
                        const discountQuantity = specialPriceObject.quantity
                        const discountPrice = specialPriceObject.price
                        const numBundles = Math.floor(quantity / discountQuantity)
                        subTotal += (numBundles * discountPrice)
                        quantity -= (numBundles * discountQuantity)
                    }
                }
            }
            subTotal += (quantity * price.unit_price)
        })
        return subTotal
    }
    return false
}

module.exports = {
    calculateSubTotal,
    convertSpecialPriceString
}
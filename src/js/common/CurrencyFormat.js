export const formatCurrency = (amount) => {
    return new Intl.NumberFormat("pl", {style: 'currency', currency: 'PLN'}).format(amount)
}

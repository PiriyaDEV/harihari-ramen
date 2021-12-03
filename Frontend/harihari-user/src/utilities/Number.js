// This function used to return the inputed number to be an integer with the comma format.
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
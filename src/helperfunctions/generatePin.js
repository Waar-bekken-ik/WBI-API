function generatePin() {
    min = 0;
    max = 9999;
    return ("0" + (Math.floor(Math.random() * (max - min + 1)) + min)).substr(-4);
}

module.exports = generatePin

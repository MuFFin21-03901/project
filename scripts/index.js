const array = [1, 4 ,7 ,9]

// function multBy (arr, n) {
//     return arr.map(function(i) {
//         return i * n
//     })
// }

Array.prototype.multBy = function (n) {
    return this.map(function(i) {
        return i * n
    })
}

console.log(array.multBy(2))


const myPromise = new Promise ((resolve, reject ) => { 
let success = false;

if (success) {
    resolve ('nice');

} else reject ('fail');
})
myPromise 
    .then((result) => {
    console.log(result)
})
    .catch ((error) => {
        console.log(error);
})
    .finally (() => {
        console.log('over');
    })
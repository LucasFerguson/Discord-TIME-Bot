

console.log("Hello, World!")

function isPrime(num) {
    for ( var i = 2; i < num; i++ ) {
        if ( num % i === 0 ) {
            return false;
        }
    }
    return true;
}

function display(n) {
    var arr = [2];
    for ( var i = 3; i < n; i+=2 ) {
        if ( isPrime(i) ) {
            arr.push(i);
        }
    }
    //console.log(arr); // use arr result on your own
    for (let i = 0; i < arr.length; i++) {
         console.log(i + "  " + arr[i] );
    }
}

display(1000);

// Hello Wrold 😊

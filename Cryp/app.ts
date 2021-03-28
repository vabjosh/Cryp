
const readline = require("readline");
var http = require("https");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

 

let date: string;
let coin: string;
let key = "api_key=64bc614d219b521a17fad1667ce145723cb0dbdc5018bb2018669293303b8b8b";
const question1 = () => {
    return new Promise((resolve, reject) => {
        rl.question('Enter date ', (answer) => {
            console.log(`${answer}`)
            date = `${answer}`;
            resolve();          
        })
    })
}

const question2 = () => {
    return new Promise((resolve, reject) => {
        rl.question('Enter Coin', (answer) => {
            coin = `${answer}`;
            resolve();            
        })
    })
}

const main = async () => {
    await question1();    
    await question2();
    console.log(date);
    console.log(coin);

    if (date && date.length > 0 && coin && date.length > 0) {

        //let url = "/data/pricehistorical?" + key + "fsym=" + coin + "&tsyms=USD&ts=" + date+"";
        let url = "/data/pricehistorical?" + key + "&fsym=" + coin + "&tsyms=USD&ts=" + date;

            //"/data/pricemulti?" + key+"&ts=" + date + "&fsyms=" + coin + "&tsyms=USD"

        CrptoApiGet(url);
        
    }
    else if (date && date.length > 0) {
        let url = "/data/pricemulti?" + key+"&toTs=" + date + "&fsyms=BTC&tsyms=USD"
        CrptoApiGet(url);
        console.log('date');
    }
    else if (coin && coin.length > 0) {
        let url = "/data/price?" + key+"&fsym=" + coin+"&tsyms=USD"
        CrptoApiGet(url);
        console.log('coin');
    }
    else
    {
        let url = "/data/price?" + key+"&fsym=BTC&tsyms=USD"
        CrptoApiGet(url);
        
        console.log('none');
    }



    //rl.close()
}

main()

function CrptoApiGet(_url) {
    var options = {
        "method": "GET",
        "hostname": "min-api.cryptocompare.com",
        "port": null,
        "path": _url,
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "5139da3d-d41e-b14e-8439-51690c2a79d0"
        }
    };

    var req = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
        });
    });

    req.end();
}

rl.on("close", function () {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});
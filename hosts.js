var ping = require('ping');
var request = require('request');


var validIp = []
var allIp = []

fetchData()

// pingCheck()

function fetchData() {
    var host = 'https://asm.ca.com/en/api/pingproxy.php?uid=d5ad1af563e21c7f2ba521608f3b6b47&host=google.com&v=2'
    request(host, function(error, response, body) {
        var ob = JSON.parse(body).r;
        console.log(ob)
        pingCheck(ob)
    });
}



// https.get(host, (res) => {
//     console.log('statusCode:', res.statusCode);
//     console.log('headers:', res.headers);

//     res.on('data', (d) => {
//         process.stdout.write(d);
//     });

// }).on('error', (e) => {
//     console.error(e);
// });

function pingCheck(array) {

    for (key in array) {
        var url = array[key]['result']['ip'];
        allIp.push(url);
    }

    var promises = [];

    allIp.forEach(function(ip) {
        promises.push(ping.promise.probe(ip, {
            timeout: 30
        }).then(function(res) {
            if (res) {
                var ob = res
                if (ob && ob.alive) {
                    validIp.push(ob.host)
                }
            }
        }));
    });

    Promise.all(promises).then(() =>
        console.log(validIp)
    );

    // Ping google.com
}
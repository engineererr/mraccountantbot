const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_TOKEN;
//const token = '600082662:AAF9VWyKLlRCD9gkwcFuLz4mfyq2kMXiZgo';
var port = process.env.PORT || 3000;
$PORT = process.env.PORT
console.log(token);
console.log(port);


// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
// const client = new vision.ImageAnnotatorClient({
//     projectId: process.env.GOOGLE_PROJECTID,
//     credentials: {
//         client_email: process.env.GOOGLE_CLIENTEMAIL,
//         private_key: process.env.GOOGLE_PRIVATEKEY,
//     }
// });

const client = new vision.ImageAnnotatorClient({
    //keyFilename: './My Project-2f082c08b8c1.json'
    credentials: {
        client_email: 'mr-accountant-bot@learned-cirrus-203913.iam.gserviceaccount.com',
        private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCob0SgRvRHSACx\nrLEbotEEKp4dcptYt++Pax19ka5XhzL5GKW6/S8YuuiUxVGR/LL2HDennr1gbqyE\nnhJ8l6mV1Pg1rCLCAlRd5lUeLS8k/znMWSV5/MvppRHW9FestRo0TQn+1NG++9AJ\nJoV6a+lby35kQDSi8lwfVicw4kdaD1+RbJp2AKOCdImKeDNZMhpAh90ocBJog8XQ\nngJ4T1RO3PgZaa9sFkuFRxp/mQp/kiuYJ1FJFWG1jKhu6CvyL3comwnS/wUlF5AJ\nsUZOl6aJjl7uKzB6rZAUDeIvz6bfmpfuXmQqttH/+4hFYl2+51iRN4Bm59LAMJeJ\nMauaEMu1AgMBAAECggEACY95RHoKjbeP9zB6GWYPjvjmon1vGmUkXKO5Qoz1Pvlz\nrVEWv8tKXqZl+GMj1bwTd2XoyyOhlFqWgcI21+oZjDbmA3vlZCroLtqZrGhm/jwG\nGUEvyqG3UagsNU3ct8xMHrmxuSHLfwJBj8dnOP3s5Wg39h5Gg+pATDS3wu37xqg0\nLQQQkp1UASAvpdexGAGrLilbKGnS9HG5tSE5KP/6o2187BAFbaqscSPeXes6Zi18\nyckOoVVPNLaQ1pIt9Wd7LpvtMFN56119i9aDdpSArfnfsTeSVQTAuOoK0uJPwa/P\n3hVuo1wxbel2Cc0/fCeHGMhHaWGvKtZewnxgnr3u+QKBgQDoWTEp8G4a0aB3J5fe\nzVLEIJaauwinS877bP4pDK5ubSYYVl2mgcq8Xm31TTv751vzeXIBNUsxGRmAx2G6\nsyh60RzjWAG+1vdcRXz7fJZkyvONEnk5ynh878uyspWhai+o1seAefUmuzE/TBg1\nJx+UjU6+popJ5vvLRpmLtv4tzQKBgQC5lIk1yLqnH45eR6WF9jguFvWFfuEjoBpr\ncNM+IIU9kx1Zi28TvEndm0G3A+1gcCH3Rh+UmvoXPQf4zt7+K3VOxNmJzwLsfwQo\nr9vFSFdR2X9sjnTmm3DvrVDYP9BVsKGrd7tEjj/y3g0j4S18v2tHaLhS4oWDz83d\n9lJ5ArJtiQKBgQChf8V1gkH18DlaOTIN0qex3XjxSgnExyOyjVrIS6E+7i0pg3aK\n0vKJJhXGCI4mFPVL8eE1R8bg9LJOWcfrTrZXT9yFhVmJPcAn6cDqyPl8S7koGGwc\nqEhBhygOKKVq0fUYpVl8SskEx95+QbUd1PjVd7cBO58pqRzheUwm2eYpDQKBgCrq\nwuCBT0ke7xm2j/zu+AcQoC8DLKXEfNej+/Y+JxIaV4tBx6pUvPBW21ervNW0mOZK\nfTssq/F718Aed0toWXSh6X0JNq/in9+Y68Yv+KGhHurH9xjtkayb9DpOZ6upcXnp\n8pDkJL3RxFAr3w0eZ3zYJuhkImRdRkqykFgT25ehAoGAVUuJAxQ0f1uEvgygXhLg\nGGa1gIcDdNbnoOnF6PCaxFVE5SFfOwlUV79cnfVHAKSvAEemrL0R4uUIC8aKMoHj\nSzTWnR3YJyOx1SKAi9QEdeCSO8bnHLNT2lufT6UySaOLhIc0BJx/NIpPYUqe04UM\nWwY0sd0kRPu+pZWwptmHj90=\n-----END PRIVATE KEY-----\n',
    },
    projectId: 'learned-cirrus-203913',


});

const bot = new TelegramBot(token, {
    polling: true,
});

const commandSendBill = "Rechnung einreichen";
const commandGetTotal = "Total abfragen";

const customerA = "Kunde A";
const customerB = "Kunde B";

bot.on('message', (msg) => {
    if (!msg.text) return;
    console.log(msg);
    let Hi = 'hi';
    if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
        let username = msg.from.username;
        bot.sendMessage(msg.chat.id, `Hallo ${username}. Wie kann ich dir helfen?`);
    }

    if (msg.text.indexOf(commandSendBill) === 0) {
        bot.sendMessage(msg.chat.id, "Bitte schick mir die Rechnung.");
    }

    if (msg.text.indexOf(commandGetTotal) === 0) {
        bot.sendMessage(msg.chat.id, "Für welchen Kunde ist die Rechnung?", {
            "reply_markup": {
                "keyboard": [
                    [customerA, customerB]
                ]
            }
        });
    }

    if (msg.text.indexOf(customerA) === 0) {
        bot.sendMessage(msg.chat.id, "CHF 500 im Monat Juli", {
            "reply_markup": {
                "keyboard": [
                    [commandSendBill, commandGetTotal]
                ]
            }
        });
    }

    if (msg.text.indexOf(customerB) === 0) {
        bot.sendMessage(msg.chat.id, "CHF 312 im Monat Juli", {
            "reply_markup": {
                "keyboard": [
                    [commandSendBill, commandGetTotal]
                ]
            }
        });
    }
});

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Willkommen", {
        "reply_markup": {
            "keyboard": [
                [commandSendBill, commandGetTotal]
            ]
        }
    });
});

bot.on("photo", (msg) => {
    let photoId = msg.photo[msg.photo.length - 1].file_id;
    bot.downloadFile(photoId, "./").then(path => {
        client
            .textDetection(path)
            .then(results => {
                const detections = results[0].textAnnotations;
                console.log('Text:');
                let response = [];
                detections.forEach(text => {
                    // if (text.description.toLowerCase().indexOf("rapport") > -1) {
                    response += text.description;
                    // }
                });
                bot.sendMessage(msg.chat.id, "Response: " + JSON.stringify(response));
            })
            .catch(err => {
                console.error('ERROR:', err);
            });
    });
});
const TelegramBot = require('node-telegram-bot-api');
const token = '600082662:AAF9VWyKLlRCD9gkwcFuLz4mfyq2kMXiZgo';


// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient({
    keyFilename: 'D:/AVexcluded/MrAccountantBot/My Project-c7fea86027a8.json'
});

const bot = new TelegramBot(token, {
    polling: true
});

const commandSendBill = "Rechnung einreichen";
const commandGetTotal = "Total abfragen";

const customerA = "customerA";
const customerB = "customerB";

bot.on('message', (msg) => {
    if (!msg.text) return;
    console.log(msg);
    let Hi = 'hi';
    if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
        let username = msg.from.username;
        bot.sendMessage(msg.chat.id, `Hello ${username}. How can I help you?`);
    }

    if (msg.text.indexOf(commandSendBill) === 0) {
        bot.sendMessage(msg.chat.id, "Please send me the picture");
    }

    if (msg.text.indexOf(commandGetTotal) === 0) {
        bot.sendMessage(msg.chat.id, "Which customer?", {
            "reply_markup": {
                "keyboard": [
                    [customerA, customerB]
                ]
            }
        });
    }
});

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome", {
        "reply_markup": {
            "keyboard": [
                [commandSendBill, commandGetTotal]
            ]
        }
    });
});

bot.on("photo", (msg) => {
    let photoId = msg.photo[msg.photo.length - 1].file_id;
    bot.downloadFile(photoId, "D:\\").then(path => {
        client
            .textDetection(path)
            .then(results => {
                const detections = results[0].textAnnotations;
                console.log('Text:');
                let response = [];
                detections.forEach(text => {
                    if (text.description.toLowerCase().indexOf("rapport") > -1) {
                        response += text.description;
                    }
                });
                bot.sendMessage(msg.chat.id, "Response: " + JSON.stringify(response));
            })
            .catch(err => {
                console.error('ERROR:', err);
            });
    });

});
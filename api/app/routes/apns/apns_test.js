let apn = require('apn')

const TEAM_ID = "SUKAFQ5426";
const KEY_ID = "V9C2C5DZ97";

var options = {
  token: {
    key: "/backend/routes/apns/AuthKey_V9C2C5DZ97.p8",
    keyId: KEY_ID,
    teamId: TEAM_ID
  },
};

var apnProvider = new apn.Provider(options);

// get device token from database
let deviceToken = "4e3042e0a3ff67fe1984b564f5af179032bcabae1069500d9eab1d05fc4b74b7"

var note = new apn.Notification();

note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
note.badge = 3;
note.sound = "ping.aiff";
note.alert = "\uD83D\uDCE7 \u2709 Yo! You have a new message";
note.payload = {'messageFrom': 'Michael Russell'};
note.topic = "com.thumbgenius.reactNativeApp"; // app bundle id

apnProvider.send(note, deviceToken).then( (result) => {
  // see documentation for an explanation of result
  console.log(result);
  apnProvider.shutdown();
  process.exit();
});

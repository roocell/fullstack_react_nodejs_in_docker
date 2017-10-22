let apn = require('apn')

const TEAM_ID = "SUKAFQ5426";
const KEY_ID = "V9C2C5DZ97";

var options = {
  token: {
    key: "./AuthKey_V9C2C5DZ97.p8",
    keyId: KEY_ID,
    teamId: TEAM_ID
  },
};

var apnProvider = new apn.Provider(options);

// get device token from database
// 73cc7743f6c20890c2aa2f4aa1f1d916e4c634266112a22b6aa6056e3c5cbfb3
let deviceToken = "73cc7743f6c20890c2aa2f4aa1f1d916e4c634266112a22b6aa6056e3c5cbfb3"

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

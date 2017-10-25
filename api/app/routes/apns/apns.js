let apn = require('apn')

const TEAM_ID = "SUKAFQ5426";
const KEY_ID = "V9C2C5DZ97";

module.exports = class Apns {
    constructor( ) {
      var options = {
        token: {
          key: "/backend/routes/apns/AuthKey_V9C2C5DZ97.p8",
          keyId: KEY_ID,
          teamId: TEAM_ID
        },
      };
      this.Provider = new apn.Provider(options);
    }
    // accepts object
    // {
    //   notiftoken: token,
    //   message: message,
    //   source_userid: userid,
    // }
    sendPushNotification (data) {
      console.log(data.notiftoken);
      return new Promise( ( resolve, reject ) => {
        var note = new apn.Notification();

        note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
        note.badge = 3;
        note.sound = "ping.aiff";
        note.alert = data.message;
        note.payload = {'messageFrom': data.source_userid};
        note.topic = "com.thumbgenius.reactNativeApp"; // app bundle id

        this.Provider.send(note, data.notiftoken, (result) => {
          // see documentation for an explanation of result
          console.log(result);
          this.Provider.shutdown();
          resolve( result );
        });
      } );
    }

}

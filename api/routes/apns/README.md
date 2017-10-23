
# APNS
in order to use APNS we need to keep track of a user and their push device token
this is a field in the user when registration happens

Apple has switched from Provider Certificates to Provider Auth Tokens
https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/CommunicatingwithAPNs.html#//apple_ref/doc/uid/TP40008194-CH11-SW1

node-apn default instruction describes using Provider Auth Tokens
so we will try that.

instruction for the server side implementation are here
https://github.com/node-apn/node-apn/blob/master/doc/apn.markdown

1. goto developer.apple.com, keys, create a new key for APN.
   will need to remember the key_id
```
Name:
reactNativeApp APNS key
Key ID:
V9C2C5DZ97
Services
APNs
```
2. download the .p8 key file and store it on the server
```
cp *.p8 api/routes/apns
```

3. follow node-apn implementation instructions

4. assuming the api container is already running
   you can run the apns script
```
docker exec -it api node /backend/routes/apns/apns.js
```

#==========================================================
# DO NOT COMMIT OR PUSH ANY CERT FILES
#==========================================================


instructions for the app side are here
https://facebook.github.io/react-native/docs/pushnotificationios.html

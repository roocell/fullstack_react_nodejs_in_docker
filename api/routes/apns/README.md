#------------------------------------------------------
# APNS
#------------------------------------------------------
# certificate generation
http://www.raywenderlich.com/32960/apple-push-notification-services-in-ios-6-tutorial-part-1

# generate CSR on your MAC (dont need a new one everytime)
# open "Keychain Access" app


1. goto developer.apple.com, member centre, certificates
2. select "Apple Push Notification service SSL Cert (Sandox & Production), create a new cert
3. select wifisentinel appID
4. upload CSR (from rayw's URL above)
5. download the .cer file

#now we create the PEM file
openssl x509 -in aps_PS.cer -inform der -out PushCert_PS.pem
openssl pkcs12 -nocerts -out PushKey_PS.pem -in PushKey_PS.p12
cat PushCert_PS.pem PushKey_PS.pem > ck_PS.pem

# to test
openssl s_client -connect gateway.push.apple.com:2195 -cert PushCert_PS.pem -key PushKey_PS.pem

# copy the ck_PS.pem file into the APNS server directory
# =================================================
# DO NOT COMMIT AND PUSH ANY CERT FILES
# =================================================

const admin = require('firebase-admin');

const serviceAccount = {
  "type": "service_account",
  "project_id": "mobile-verify-cb340",
  "private_key_id": "452a07a56c2a3c0d663587a09af51d0481e07139",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCcwWA3jkGuPXpK\nqrSC1d4OyBHYOuf3MQb4Eb9e5s3044zRwwRqwMy7eNZB1e6GV9RSLvxRlmML9zQw\nhe3I7vtadlpsQn1slikJS8x0BRCObOZG9ThS1FPRzT8e+kC/jp9wa+aBW3P+VE05\nHHhowPZCNKAF2UwhGBjLnOFfu3hFIzcTpeZazRrS5xQmElmH1ESmXAp9wRQFuMfH\nqLpM8nd6GdBUS87CAdYiR9Bl2qVDZItE3rKUHoij48d8iP0Yz7DtJ0unDkQHdlc0\nfoNRbzHAVgM4MIgJOxRVhMdWiZTuXRj7PMvsgI4z973A1UZtDwslMawCnsywyi5o\nhkrvibvVAgMBAAECggEAAW4dOIczz7O6uCWBuJjcFLKcFmbb2MGUgJ0O1n47aPgj\nf9gW4/ocKWYIlGNahf9qozulAdc3UkkK1kTT3suutOGpYQf5Q3fvlL4MNeRu79G2\nscqJHUOtJm1IMw+RmX3NtBWemIBdrkzAGJzgd1oyqkzMcfPh0dfPBW/fZC4ebTO0\nTtZ4P5BLaUcbx51xrgsLWWyk9NBzNM/RejTpuqJm9d/SafoMivYTWJCuDVtQAqje\nepAk/oNbzbV0hIoDBag/rSIyAzAMQy6C8SFJAVKRjRJ1Gwt4Zhhom8iw50SeZo2r\ncuratNDGQAJjGZH6XWz+wq5iRFw57DZNLyeBppYh6QKBgQDLJHkwZ/Xbdal7jReJ\ngmKD8mlXaAhDIhyaSuOGnbxgC1ht/ukBHEPxdlrw7yE842J2FM+UEB9BZIaXQIOQ\n85wI0zAhU060Rtn7by2VaQbuhVAAr+S2dUCqs6+aP/ct9w54dTD8GvLtOTxx7wEe\nQoFzriFDOh8nSXaqq1lwA6/vvQKBgQDFiwK3ATOGemHbggNthAvKkFe5NCkyiebE\nQg2ffMaWnlaB/vx3XsKmWce3TwkHn9GkZf1BRXFaRX9Ft0fwOsdntvlsBwL7OkR2\neEIixjsA/CcUemuGscgWs7j7AwKT2TMCmtMQbsPegxNOaCYIhiqbxzWuSg21IQNa\nA0+MNVYR+QKBgEfVqwFCEf+8GOW22/blY37zTur4v8s1mdW528Fzr/Rqrqee97hL\nzX7qcng2p5NHeT72Vv0twk+2g52i06ODcc7xF1kBg5heYaD3DLCEBk58V/EWQhN/\nXRHAHr22FutrLPPNxTexM+xNTCGh+cxAilRk5CBIwlF7OfpaQ3NH6oQlAoGBAJ2a\nxcS6OaCd/XsDJLb4devb85E4k3HV4f5M8M+A3nQGyeAXTtfyC3xq/tM6RGsH0FvI\nXyD3RXOPJPa7PrLkQnl121Ob2H4Vw899LM7Ptv2XL5q//Q/OwWOTag8iHKlWzcLT\nQXfH14+spfeVUlrUqCP28NYoEP2k5Capo4qqdwwJAoGAQnjwELKhhzw7Nd4tGB2V\nLFbth9rFGm2Po3z+CLIl0Q3qmqHlKPR36W1XxnTiLxzNPyXzQHzr1ztBK6+D6719\nBCqYNcP6sgS06XZrG4Uq40JDtEekHcubuLy/JswSIP5nRdaSpmybprMBc/wdDYmS\nPa9PstnQrDt2sO/r0ptYI6U=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-679gg@mobile-verify-cb340.iam.gserviceaccount.com",
  "client_id": "100746340887232035578",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-679gg%40mobile-verify-cb340.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;


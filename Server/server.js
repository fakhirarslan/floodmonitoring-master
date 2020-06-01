const express =  require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
app.use(cors())
app.use('/', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const client = require('twilio')(
    "AC082d1c1499533a16e146ad7fb88a068b",
    "1f85a07f5194a6c632636360b2b8f930"
);

const firebaseAdminConfig = {
  "type": "service_account",
  "project_id": "flood-monitoring-786",
  "private_key_id": "6d003db28e955a0d002927984a79f0d868c29879",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCVwiPAWqlqofYS\nF024IBTvQ0tPKZfCzDbMK6O5+6AMME7DSm7lNLkiq36JFU4H3lMGiAk3loJZ/1DA\n9X0HsQZ6w65UPTMphMfsUWmNg4qAernjDu2BwEb+EoqH9OX6TPmFhZG8hIcP9BrO\noH5Xsxs6tlNFZjunyG35w7eGx3gVXPGZDqndl/tCuUimKoKM4zLYMAvlH78AD76Q\nefqQigAnx74CyMv54UNiKf1N5mlW8MUbX6Z21MPQPyPv61Uxu6nyOXgWfYe8QCdx\njFBwtD7micpH8a73AOVDl8mbgutWl3XyV+zPMs0v7TjIHL6c6i4/hI60E3ubeBXb\nu1UwZ1bzAgMBAAECggEAM2ZaOfOEEU68c9IewTL1rHc22llGtru7lRDnVXaZJIXS\nCrI55J5XaqBcwjUXPpkeeu/m5fbZD4WTVF8Nhj3KoQkXhN8qd7YUnjYFGeaLe3Rj\n55wghXeWhi6b8HTsGCAiRiMldYQxDRc1ujSYmIYnMtwQMZIYqIogwOhdTbuZqg7h\nVjCcZPKKh8Csn5uHh1EshuIVBXamJDSufIAhqOMFXw8Sw9ZDDEzl4PL0fyksPWsS\nYZroXd7JRfblAwuj6C9/naed+5D0tajRVZ8dQD5wTbJf1ImxjN51/fWfEqjdt8jB\nkqUuAZxYhSMhv7HUz/opkVBEkaKBKJCOQuzhjcTArQKBgQDPX27KxO4kmIINTpdX\nDFc/kVNzm2VN7GeO8ykA1xdlPw7ymKnNMQbnvODB/OfGwu6Tr5B/5pS115zB/dgy\nlxOwZML3YxAFElNp9m//1pLKLHMD+mKKvmOnMvQgfs96DahU/CvF9SGS5NUtZbgw\nW1NKre4h5+idiD88kUVTUfNVHQKBgQC44B5jXFjs04EBWjPBVeql8o+Xd9HVlDVH\n016NIEYHOjpdRQS8GLV1YrtCXCVsQVsQe3jQbyEroJ9jwAwrpfs8OhDEDUyPH+3V\nMyGzFYQvqMyR3CnjirYffxGIdOYyoWNWNYRAOPywZ/6RunnDpCqzNIPel5vd4vJj\n/fv5XCLvTwKBgFk8rgaf3ALvhfeH/GQ/MURvm0PCeUOhGadQSDLOXIj7K8mFnHxq\nPph2lRmlZXAI7nWrNTl01kWyNQjd3a1Xied8VNH0VS55hl+w5t1nTt+lZREvLDyc\nVXHb4WYia9IQEoIPyh5zsDDwPDQ+85YLlroqQrFghJ9VxDCiKv0B5P6ZAoGBAIMG\nG6NRvJhDoadCtXFtIbrwuMGhoq5atpQsAlPErrzKkLivhJaGcHw8N/jk84TQoOiC\niXI3gGu6D5yTbEy2+uKJSH6Z6kt5VoaGEXkpY6CfYjRxs6JXGZIi7VsndkolxRBB\nJ3SYrsWbPnkrjsaQH88YBemIy2erQxyI0b69hOjTAoGAZso08eYIM8q0z20VGPUL\nHoHzBfBJoIhNBUlvuIKZk4OfLSqCpnPL+crLuF1X8rro8U/sFcEyGtuXDPIU4w8D\nH2aWKTsvH/MPsqbrrjKTTmnac4Yb8dw7PnPF49wd3SRtxNOqLZv856UBYRNGquUJ\nJg1nyxBkZo1Yj2L6ek17Arg=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-8k99l@flood-monitoring-786.iam.gserviceaccount.com",
  "client_id": "104397730243999796068",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-8k99l%40flood-monitoring-786.iam.gserviceaccount.com"
}

admin.initializeApp({ credential: admin.credential.cert(firebaseAdminConfig), databaseURL: "https://flood-monitoring-786.firebaseio.com" })


app.post('/messages', (req, res) => {
  client.messages
    .create({
      from: "+14086375612",
      to: req.body.phone,
      body: req.body.text
    })
    .then(() => {
      res.json(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.json(JSON.stringify({ success: false }));
    });
});

app.get('/getAllUsers', (req, res) => {
  let usersArr = []
  admin.auth().listUsers(1000, "100")
  .then(function(listUsersResult) {
    listUsersResult.users.forEach(function(userRecord) {
      
      usersArr.push(userRecord.toJSON())
    });
    res.send(usersArr)
  })
  .catch(function(error) {
    console.log('Error listing users:', error);
  });
})

app.post('/deleteUser', (req, res) => {
  let usersArr = []
  admin.auth().deleteUser(req.body.id)
  .then(function() {
    admin.database().ref('UserDetails/').child(req.body.name).remove();
    admin.auth().listUsers(1000, "100")
    .then(function(listUsersResult) {
      listUsersResult.users.forEach(function(userRecord) {
        usersArr.push(userRecord.toJSON())
      });
      res.send(usersArr)
    })
    .catch(function(error) {
      console.log('Error listing users:', error);
    });
  })
  .catch(function(error) {
    console.log('Error deleting user:', error);
  });
})

app.post('/editUser', (req, res) => {
  const { name, password, phone, uid, email } = req.body;
  admin.auth().updateUser(uid, {
    password: password,
    displayName: name,
  })
    .then(function(userRecord) {
      admin.database().ref("UserDetails/").child(userRecord.toJSON().displayName).update({ name: name, phone: phone, email: email }).then(() => {
        res.send("User Updated Succesfully")
      })
    })
    .catch(function(error) {
      console.log('Error updating user:', error);
    });
})

app.listen(3001, () => console.log("Established"));

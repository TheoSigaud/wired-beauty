const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const admin = require("firebase-admin")
var serviceAccount = require("./wired-beauty-firebase-adminsdk-eo81i-887291162f.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const User = require("../models/users");
const Pdf = require("../models/pdf");

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(cors())

// DB Setup
var mongoose = require('mongoose');

var DATABASE_URL = process.env.DATABASE_URL || 'http://localhost'
mongoose.connect(`mongodb://${DATABASE_URL}/posts`, {useNewUrlParser: true});

var db = mongoose.connection;

db.on('error', function (error) {
    // If first connect fails because server-database isn't up yet, try again.
    // This is only needed for first connect, not for runtime reconnects.
    // See: https://github.com/Automattic/mongoose/issues/5169
    if (error.message && error.message.match(/failed to connect to server .* on first connect/)) {
        setTimeout(function () {
            mongoose.connect(`mongodb://${DATABASE_URL}/posts`, {useNewUrlParser: true}).catch(() => {
                // empty catch avoids unhandled rejections
            });
        }, 20 * 1000);
    } else {
        // Some other error occurred.  Log it.
        console.error(new Date(), String(error));
    }
});

db.once("open", function (callback) {
    console.log("Connection Succeeded");
});

//List all users
app.get('/api/users', (req, res) => {
    User.find({}, 'email uid', function (error, users) {
        if (error) {
            console.error(error);
        }
        res.send({
            users: users
        })
    }).sort({_id: -1})
});

//Create new user
app.post('/api/users', (req, res) => {
    console.log('tzugdgazvv')
    const email = req.body.email.trim();

    admin.auth()
        .createUser({
            email: email,
            password: generatePwd()
        })
        .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully created new user:', userRecord.uid);

            const new_user = new User({
                email: email,
                uid: userRecord.uid
            })

            new_user.save(function (error) {
                if (error) {
                    console.log(error)
                }
                res.status(201);
                res.send({
                    success: true,
                    message: 'User saved successfully!'
                });
            });
        })
        .catch((error) => {
            console.log('Error creating new user:', error);
            res.status(200);
            res.send({
                success: false,
                message: 'User already exist!'
            });
        });
});

//Delete user
app.post('/api/delete-user', (req, res) => {
    const uid = req.body.uid;

    admin.auth().deleteUser(uid)
        .then(() => {
            console.log('Successfully deleted user');
            User.deleteOne({
                uid: uid
            }, function(err, post){
                if (err)
                    res.send(err)
                res.send({
                    success: true
                })
            })
        })
        .catch((error) => {
            console.log('Error deleting user:', error);
        });
});

app.post('/api/save-pdf', (req, res) => {
    let pdf = req.body.pdf;
    let name = req.body.name;

    const new_pdf = new Pdf({
        pdf: pdf,
        name: name
    })

    new_pdf.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.status(201);
        res.send({
            success: true,
            message: 'Pdf saved successfully!'
        });
    });
    // res.send({
    //     pdf: req.body.pdf
    // })
})


//List all pdf
app.get('/api/pdf', (req, res) => {
    Pdf.find({}, 'name pdf', function (error, pdf) {
        if (error) {
            console.error(error);
        }
        res.send({
            pdf: pdf
        })
    }).sort({_id: -1})
});

function generatePwd() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 15; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

app.listen(process.env.PORT || 8081)

const User = require("../../models/users");
module.exports = function (app) {


    //Create new user
    app.post('/api/users', (req, res) => {
        const email = req.body.email.trim();
        const pseudo = req.body.pseudo.trim();


        const new_user = new User({
            email: email,
            pseudo: pseudo
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


    });

    //List all users
    app.get('/api/users', (req, res) => {
        User.find({}, 'pseudo email password', function (error, users) {
            if (error) {
                console.error(error);
            }
            res.send({
                users: users
            })
        }).sort({_id: -1})
    });

    // Check single user
    app.post('/api/check-user', (req, res) => {
        const email = req.body.email.trim();
        const pseudo = req.body.pseudo.trim();

        User.findOne({$or:[{"email": email}, {"pseudo": pseudo}]}, 'pseudo email', function (error, user) {
            if (error) { console.error(error); }

            if (user){
                if (email === user.email) { res.send('Un compte avec cette email existe déjà'); }

                if (pseudo === user.pseudo) { res.send('Un compte avec ce pseudo existe déjà'); }
            } else {
                res.send('');
            }
        })
    });
}
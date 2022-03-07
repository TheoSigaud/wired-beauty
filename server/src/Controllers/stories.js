const fs = require('fs');
const Story = require("../../models/stories");

const pathRepositoryImages = './imagesUpload/stories/'

module.exports = function (app) {


    //Create new story
    app.post('/api/stories', (req, res) => {
        const nameFile = Date.now();
        const name = req.body.name.trim();
        const description = req.body.description.trim();

        const fileContents = new Buffer(req.body.image, 'base64')
        fs.writeFile(pathRepositoryImages + nameFile, fileContents, (err) => {
            if (err) return console.error(err)

            const new_story = new Story({
                name: name,
                description: description,
                image: nameFile
            })

            new_story.save(function (error) {
                if (error) {
                    console.log(error)
                }
                res.status(201);
                res.send({
                    success: true,
                    message: 'Story saved successfully!'
                });
            });
        })
    });

    //List all stories
    app.get('/api/stories', (req, res) => {
        Story.find({}, 'name description image', function (error, stories) {
            if (error) {
                console.error(error);
            }

            stories.map(story => {
                let content = fs.readFileSync(pathRepositoryImages + story.image, {encoding: 'base64'});
                content = 'data:image/jpeg;base64,' + content.substr(20,content.length);

                story.image = content;
            })

            res.send({
                stories: stories
            })
        }).sort({_id: -1})
    });

    // Get single story
    app.get('/api/story/:id', (req, res) => {
        Story.findById(req.params.id, 'name description image', function (error, story) {
            if (error) { console.error(error); }

            let content = fs.readFileSync('./imagesUpload/stories/'+story.image, {encoding: 'base64'});
            content = 'data:image/jpeg;base64,' + content.substr(20,content.length);
            story.image = content;

            res.send(story)
        })
    });

    // Update a story
    app.put('/api/story/:id', (req, res) => {
        const name = req.body.name.trim();
        const description = req.body.description.trim();

        Story.findById(req.params.id, 'name description image', function (error, post) {
            if (error) { console.error(error); }

            if (req.body.newImage){
                const fileContents = new Buffer(req.body.newImage, 'base64')

                fs.writeFile(pathRepositoryImages + post.image, fileContents, function (err) {
                    if (err) throw err;
                    console.log('Fichier mis à jour !');
                });
            }

            post.name = name
            post.description = description
            post.save(function (error) {
                if (error) {
                    console.log(error)
                }
                res.send({
                    success: true
                })
            })
        })
    });

    // Delete a story
    app.delete('/api/story/:id', (req, res) => {
        Story.findById(req.params.id, 'image', function (error, post) {
            if (error) {
                console.error(error);
            }
            fs.unlink(pathRepositoryImages + post.image, function (err) {
                if (err) throw err;

                Story.remove({
                    _id: req.params.id
                }, function(err, post){
                    if (err)
                        res.send(err)
                    res.send({
                        success: true
                    })
                })
            });
        });
    });
}
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Issue from './models/issue';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

// Connect to the MongoDB database collection
mongoose.connect('mongodb://localhost:27017/issues');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

// Fetch all documents
router.route('/issues').get((req, res) => {
    Issue.find((err, issues) => {
        if (err) {
            console.log(err);
        } else {
            res.json(issues);
        }
    });
});

// Fetch ids of up to ten documents
router.route('/issues/ids').get((req, res) => {
    Issue.find({}, '_id', {limit: 10}, (err, issues) => {
        if (err) {
            console.log(err);
        } else {
            res.json(issues);
        }
    });
});

// Check whether attempt was correct
router.route('/issues/check/:id&:attempt').get((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (err) {
            console.log(err);
        } else {
            let result;
            if (issue.language2.toLowerCase()
                    == req.params.attempt.toLowerCase()) {
                if (issue.difficulty > 0) {
                    issue.difficulty -= 1;
                }
                result = 1;
            } else {
                if (issue.difficulty < 5) {
                    issue.difficulty += 1;
                }
                result = 0;
            }
            res.json({
                result: result,
                correct: issue.language2,
            });
            issue.save();
        }
    });
});

// Fetch a single document by _id
router.route('/issues/:id').get((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (err) {
            console.log(err);
        } else {
            res.json(issue);
        }
    });
});

// Add a document
router.route('/issues/add').post((req, res) => {
    let issue = new Issue(req.body);
    issue.save()
        .then((issue) => {
            res.status(200).json({'issue': 'Added successfully'});
        })
        .catch((err) => {
            res.status(400).send('Failed to create new record');
        });
});

// Update existing document
router.route('/issues/update/:id').post((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (!issue) {
            return next(new Error('Could not load document'));
        } else {
            issue.type = req.body.type;
            issue.language1 = req.body.language1;
            issue.language2 = req.body.language2;
            issue.difficulty = req.body.difficulty;
            issue.status = req.body.status;

            issue.save()
                .then((issue) => {
                    res.json('Update complete');
                })
                .catch((err) => {
                    res.status(400).send('Update failed');
                });
        }
    });
});

// Delete single document by id
router.route('/issues/delete/:id').delete((req, res) => {
    Issue.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
        if (err) {
            res.json(err);
        } else {
            res.json('Removed successfully');
        }
    });
});

app.use('/', router);

// Establish which port the backend runs on
app.listen(4000, () => console.log('Express server running on port 4000'));

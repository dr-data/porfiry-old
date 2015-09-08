import express from 'express';

import Quiz from '../models/Quiz';

let router = express.Router();

/**
 * GET /api/quizzes
 * Returns all quizzes.
 */
router.get('/', (req, res) => {
  Quiz.find({}, '-__v', (err, quizzes) => {
    if (err) throw err;
    res.send({ quizzes });
  });
});

/**
 * POST /api/quizzes
 * Adds a new quiz to the database.
 */
router.post('/', (req, res) => {
  let quiz = new Quiz();

  quiz.title = req.body.title;
  quiz.cover = req.body.cover;
  quiz.author = req.body.author;
  quiz.year = req.body.year;
  quiz.type = req.body.type;
  quiz.genre = req.body.genre;
  quiz.isbn = req.body.isbn;

  quiz.save(err => {
    if (err) throw err;
    res.send({ message: quiz.title + ' was saved!' });
  });
});

/**
 * GET /api/quizzes/:id
 * Returns a specific quiz.
 * @param  {quizId} id The id of the quiz to return.
 */
router.get('/:quizId', (req, res) => {
  Quiz.findById(req.params.quizId, (err, quiz) => {
    if (err) throw err;
    res.send(quiz);
  });
});

/**
 * PUT /api/quizzes/:id
 * Updates a specific quiz.
 * @param  {Object_id} id The id of the quiz to update.
 */
router.put('/:quizId', (req, res) => {
  Quiz.findById(req.params.quizId, (err, quiz) => {
    if (err) throw err;

    for (let property in req.body) {
      quiz[property] = req.body[property];
    }
    
    quiz.save(err => {
      if (err) throw err;
      res.send({ message: 'Quiz updated!', quiz });
    });
  });
});

/**
 * DELETE /api/quizzes/:id
 * Deletes a specific quiz.
 * @param  {Object_id} id The id of the quiz to delete.
 */
router.delete('/:quizId', (req, res) => {
  Quiz.remove(req.params.quizId, (err, quiz) => {
    if (err) throw err;
    res.send({ message: 'Quiz was deleted!' });
  });
});

export default router;
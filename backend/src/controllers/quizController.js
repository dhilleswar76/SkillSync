const Quiz = require("../models/Quiz");

exports.submitQuiz = async (req, res) => {
  const quiz = await Quiz.findById(req.params.quizId);

  if (!quiz) {
    return res.status(404).json({ message: "Quiz not found" });
  }

  const isCorrect = quiz.correctAnswer === req.body.answer;

  res.json({ correct: isCorrect });
};

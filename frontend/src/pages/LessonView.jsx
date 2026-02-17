import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

const LessonView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLessonData();
  }, [id]);

  const fetchLessonData = async () => {
    try {
      const lessonRes = await API.get(`/lessons/${id}`);
      setLesson(lessonRes.data);
      
      // Fetch quiz if available
      try {
        const quizRes = await API.get(`/quiz/lesson/${id}`);
        setQuiz(quizRes.data);
      } catch (error) {
        // Quiz might not exist
        console.log('No quiz for this lesson');
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching lesson:', error);
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleCompleteLesson = async () => {
    try {
      await API.post(`/progress/complete-lesson/${lesson.course}/${id}`);
      setCompleted(true);
      alert('Lesson completed successfully!');
    } catch (error) {
      console.error('Error completing lesson:', error);
      alert('Failed to mark lesson as complete');
    }
  };

  const handleSubmitQuiz = async () => {
    try {
      const response = await API.post(`/quiz/${quiz._id}/submit`, { answers });
      alert(`Quiz submitted! Score: ${response.data.score}/${response.data.totalQuestions}`);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Failed to submit quiz');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Lesson not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:text-blue-800"
      >
        ← Back to Course
      </button>

      {/* Lesson Content */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
        
        {lesson.videoUrl && (
          <div className="mb-6">
            <video
              controls
              className="w-full rounded-lg"
              src={lesson.videoUrl}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        <div className="prose max-w-none">
          <p className="text-gray-700 whitespace-pre-wrap">{lesson.content}</p>
        </div>

        {!completed && (
          <button
            onClick={handleCompleteLesson}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold"
          >
            Mark as Complete
          </button>
        )}
      </div>

      {/* Quiz Section */}
      {quiz && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Quiz</h2>
          
          <div className="space-y-6">
            {quiz.questions?.map((question, index) => (
              <div key={question._id} className="border-b pb-6">
                <p className="font-semibold mb-3">
                  {index + 1}. {question.questionText}
                </p>
                <div className="space-y-2">
                  {question.options?.map((option, optIndex) => (
                    <label
                      key={optIndex}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${question._id}`}
                        value={option}
                        onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                        className="form-radio text-blue-600"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmitQuiz}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
          >
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default LessonView;

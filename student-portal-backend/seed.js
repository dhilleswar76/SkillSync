const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Import models
const User = require('./src/models/User');
const Course = require('./src/models/Course');
const Lesson = require('./src/models/Lesson');
const Quiz = require('./src/models/Quiz');

async function seedDatabase() {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Lesson.deleteMany({});
    await Quiz.deleteMany({});

    console.log('✓ Cleared existing data');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@studentportal.com',
      password: adminPassword,
      role: 'admin'
    });

    console.log('✓ Created admin user (email: admin@studentportal.com, password: admin123)');

    // Create student users
    const studentPassword = await bcrypt.hash('student123', 10);
    const student1 = await User.create({
      name: 'John Doe',
      email: 'john@student.com',
      password: studentPassword,
      role: 'student'
    });

    const student2 = await User.create({
      name: 'Jane Smith',
      email: 'jane@student.com',
      password: studentPassword,
      role: 'student'
    });

    console.log('✓ Created 2 student users (password: student123)');

    // Create courses
    const course1 = await Course.create({
      title: 'Introduction to Web Development',
      description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript. Perfect for beginners who want to start their journey in web development.',
      instructor: admin._id,
      level: 'Beginner',
      duration: 40,
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
      isPublished: true
    });

    const course2 = await Course.create({
      title: 'React and Modern JavaScript',
      description: 'Master React.js and modern JavaScript ES6+ features. Build dynamic, responsive web applications with the most popular frontend framework.',
      instructor: admin._id,
      level: 'Intermediate',
      duration: 60,
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
      isPublished: true
    });

    const course3 = await Course.create({
      title: 'Node.js Backend Development',
      description: 'Build scalable backend applications with Node.js, Express, and MongoDB. Learn API development, authentication, and database management.',
      instructor: admin._id,
      level: 'Advanced',
      duration: 80,
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800',
      isPublished: true
    });

    console.log('✓ Created 3 courses');

    // Create lessons for course 1
    const lesson1_1 = await Lesson.create({
      title: 'Introduction to HTML',
      content: 'HTML (HyperText Markup Language) is the standard markup language for creating web pages. In this lesson, you will learn about HTML tags, elements, and document structure.',
      course: course1._id,
      order: 1,
      duration: 30
    });

    const lesson1_2 = await Lesson.create({
      title: 'CSS Basics',
      content: 'CSS (Cascading Style Sheets) is used to style and layout web pages. Learn about selectors, properties, box model, and responsive design principles.',
      course: course1._id,
      order: 2,
      duration: 45
    });

    const lesson1_3 = await Lesson.create({
      title: 'JavaScript Fundamentals',
      content: 'JavaScript is the programming language of the web. Learn about variables, data types, functions, and DOM manipulation to make your websites interactive.',
      course: course1._id,
      order: 3,
      duration: 60
    });

    // Create lessons for course 2
    const lesson2_1 = await Lesson.create({
      title: 'React Components',
      content: 'Components are the building blocks of React applications. Learn how to create functional and class components, pass props, and manage component lifecycle.',
      course: course2._id,
      order: 1,
      duration: 50
    });

    const lesson2_2 = await Lesson.create({
      title: 'State and Hooks',
      content: 'Master React Hooks like useState, useEffect, and useContext. Understand state management and side effects in functional components.',
      course: course2._id,
      order: 2,
      duration: 55
    });

    // Create lessons for course 3
    const lesson3_1 = await Lesson.create({
      title: 'Express.js Basics',
      content: 'Express.js is a minimal and flexible Node.js web application framework. Learn about routing, middleware, and building RESTful APIs.',
      course: course3._id,
      order: 1,
      duration: 60
    });

    console.log('✓ Created lessons for all courses');

    // Create quizzes
    await Quiz.create({
      lesson: lesson1_1._id,
      questions: [
        {
          questionText: 'What does HTML stand for?',
          options: [
            'Hyper Text Markup Language',
            'High Tech Modern Language',
            'Home Tool Markup Language',
            'Hyperlinks and Text Markup Language'
          ],
          correctAnswer: 'Hyper Text Markup Language'
        },
        {
          questionText: 'Which HTML tag is used for the largest heading?',
          options: ['<h1>', '<h6>', '<heading>', '<head>'],
          correctAnswer: '<h1>'
        }
      ]
    });

    await Quiz.create({
      lesson: lesson2_1._id,
      questions: [
        {
          questionText: 'What is a React component?',
          options: [
            'A reusable piece of UI',
            'A database',
            'A CSS file',
            'A JavaScript library'
          ],
          correctAnswer: 'A reusable piece of UI'
        }
      ]
    });

    console.log('✓ Created quizzes');

    console.log('\n=================================');
    console.log('Database seeded successfully! 🎉');
    console.log('=================================');
    console.log('\nLogin Credentials:');
    console.log('------------------');
    console.log('Admin:');
    console.log('  Email: admin@studentportal.com');
    console.log('  Password: admin123');
    console.log('\nStudent:');
    console.log('  Email: john@student.com');
    console.log('  Password: student123');
    console.log('\n=================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

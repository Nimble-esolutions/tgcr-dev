-- Insert ClassLevel
-- Trial Class must be at Position 0; otherwise /api/lookup needs to be updated
INSERT INTO `ClassLevel` (`name`, `position`) VALUES
('Trial Class', 0),
('Lower Primary (Age: 6 - 8)', 1),
('Upper Primary (Age: 8 - 12)', 2),
('Lower Secondary (Age: 12 - 15)', 3),
('Upper Secondary (Age: 15 - 18)', 4),
('Higher Education (Age: 18 +)', 5);

INSERT INTO `Subject` (`name`, `position`) VALUES
('Mathematics', 1),
('Physics', 2),
('Chemistry', 3),
('Biology', 4),
('Economics', 5),
('English Language Acquisition', 6),
('English Language and Literature', 7),
('Others', 8);

INSERT INTO `InstructionMedium` (name, position) VALUES
('English', 1),
('Hindi', 2),
('Dutch', 3);

-- Insert EducationalQualification
INSERT INTO `EducationalQualification` (`name`, `position`) VALUES
('Doctorate or Higher / PHD', 1),
('Master’s Degree / PG', 2),
('Bachelor’s Degree / UG', 3),
('General Education Diploma', 4),
('Secondary Education / High School', 5);

-- Insert ExperienceLevel
INSERT INTO `ExperienceLevel` (`name`, `position`) VALUES
( '0-4 years', 1),
( '5-10 years', 2),
( '11-15 years', 3),
( '15 years and above', 4);

-- Insert Timezone
INSERT INTO `Timezone` (`name`, `code`, `tzIdentifier`, `tzAbbreviation`, `utcOffset`, `position`) VALUES
('Pacific Standard Time', 'PST', 'America/Los_Angeles', 'PST', '-08:00', 1),
('Mountain Standard Time', 'MST', 'America/Denver', 'MST', '-07:00', 2),
('Eastern Standard Time', 'EST', 'America/New_York', 'EST', '-05:00', 3),
('Central Standard Time', 'CST', 'America/Chicago', 'CST', '-06:00', 4),
('Atlantic Standard Time', 'AST', 'America/Halifax', 'AST', '-04:00', 5),
('Greenwich Mean Time', 'GMT', 'Europe/London', 'GMT', '+00:00', 6),
('Central European Time', 'CET', 'Europe/Amsterdam', 'CET', '+01:00', 7),
('Indian Standard Time', 'IST', 'Asia/Calcutta', 'IST', '+05:30', 8),
('Australian Eastern Standard Time', 'AEST', 'Australia/Sydney', 'AEST', '+10:00', 9);

-- Insert Country
INSERT INTO `Country` (`iso2Code`, `name`, `region`, `dialCode`, `position`) VALUES
('US', 'United States', 'North America', '+1', 0),
('CA', 'Canada', 'North America', '+1', 0),
('GB', 'United Kingdom', 'Europe', '+44', 0),
('NL', 'Netherlands', 'Europe', '+31', 1),
('IN', 'India', 'Asia', '+91', 1);

-- Insert Educational Boards
INSERT INTO `EducationalBoard` (`name`, `position`) VALUES
('IB', 1),
('IGCSE', 2),
('GCSE', 3),
('CBSE', 4),
('ICSE', 5),
('Cambridge', 6),
('AUS - Australian', 7),
('British', 8),
('US', 9),
('National Curriculum', 10),
('Others', 11);

-- Insert FeedbackAttribute
INSERT INTO `FeedbackAttribute` (`name`, `key`, `position`) VALUES
('Punctuality', 'PUNC', 1), -- Did the lesson start on time?
('Tech Issues', 'TECH', 2), -- Did you experience any tech issues during the lesson? 
('WiFi Issues', 'WIFI', 3), -- Did you experience any WiFi drops/screen freezes during the lesson? 
('Value for Money', 'VALU', 4), -- Would you rate your lesson as value for money?
('Clear Instructions', 'CLER', 5), -- Were the teacher's instructions clear and easy to follow?
('Resource and Content Quality', 'QUAL', 6), -- How do you rate the quality of resources / content used during the lesson?
('Meet Expectations', 'MEET', 7), -- Did the lesson meet your expectations?
('Engaging Lesson', 'ENGL', 8), -- Did you find your teacher's lesson engaging enough?
('Teacher''s Knowledge', 'KNOW', 9), -- How do you rate the teacher's knowledge of the subject?
('Overall Satisfaction', 'SATS', 10); -- How do you rate the overall quality and satisfaction from your lesson?

-- Creating Admin User - "Pas$w0rd"
INSERT INTO `User` (
  `id`, `name`, `firstName`, `middleName`, `lastName`, `email`, `hashedPassword`, `image`, `role`, `gender`, `dob`, `timezoneId`, 
  `countryId`, `isInstructor`, `emailConfirmed`, `emailConfirmedOn`, `isActive`, `hasAcceptedTnC`, `createdOn`, `updatedOn`) VALUES
(uuid(),'TGCR Admininistrator', 'Admin', '', 'Admin', 'admin@tgcr.net', '$2b$12$7YoSmFmfs7xqSKkB//U/Y.k2xOok6UZTGNaA6xDaLJfw.9oMuBkKq', 
'https://lh3.googleusercontent.com/-inz6JHpHgS4/AAAAAAAAAAI/AAAAAAAAAAA/ALKGfkn0BF0l6D9dN0XqJtUCC_PyAc9i9Q/photo.jpg', 
'Admin', 'Male', '1977-12-25 12:00:00.000', 1, 1, 1, 1, NOW(), 1, 1, NOW(), NOW());


/*** may not needed or production ***/

-- Dumping data for table `Category`
INSERT INTO `Category` (`id`, `name`, `slug`, `createdOn`, `updatedOn`) VALUES
(1, 'Web Development', 'web-development', '2024-02-06 07:17:13.567', '2024-02-06 07:17:13.567'),
(2, 'App Development', 'app-development', '2024-02-06 07:17:13.567', '2024-02-06 07:17:13.567'),
(3, 'Mobile', 'mobile', '2024-02-06 07:17:13.567', '2024-04-08 05:57:26.764'),
(4, 'IT Certifications', 'it-certifications', '2024-04-16 03:10:24.787', '2024-04-16 03:10:24.787'),
(5, 'Finance & Accounting', 'finance-accounting', '2024-04-16 06:06:21.447', '2024-04-16 06:06:21.447'),
(6, 'IT & Software', 'it-software', '2024-04-16 06:06:31.926', '2024-04-16 06:06:31.926'),
(7, 'Office Productivity', 'office-productivity', '2024-04-16 06:06:47.686', '2024-04-16 06:06:47.686'),
(8, 'Personal Development', 'personal-development', '2024-04-16 06:07:00.441', '2024-04-16 06:07:00.441'),
(9, 'Design', 'design', '2024-04-16 06:07:10.479', '2024-04-16 06:07:10.479'),
(10, 'Marketing', 'marketing', '2024-04-16 06:07:27.089', '2024-04-16 06:07:27.089'),
(11, 'Lifestyle', 'lifestyle', '2024-04-16 06:07:38.579', '2024-04-16 06:07:38.579'),
(12, 'Photography & Video', 'photography-video', '2024-04-16 06:07:51.034', '2024-04-16 06:07:51.034'),
(13, 'Health & Fitness', 'health-fitness', '2024-04-16 06:08:00.897', '2024-04-16 06:08:00.897'),
(14, 'Music', 'music', '2024-04-16 06:08:10.530', '2024-04-16 06:08:10.530'),
(15, 'Teaching & Academics', 'teaching-academics', '2024-04-16 06:08:22.773', '2024-04-16 06:08:22.773');

INSERT INTO `Coupon` (`id`, `code`, `discount`, `expDate`, `status`, `deletedOn`, `activeForFullSite`, `createdOn`) VALUES
(3, 'FEB25', 25, NULL, NULL, NULL, 0, '2024-04-08 06:40:48.479');

-- Dumping data for table `Partner`
INSERT INTO `Partner` (`id`, `name`, `image`, `createdOn`, `updatedOn`) VALUES
(1, 'Google', 'https://res.cloudinary.com/dev-empty/image/upload/v1712471902/mqxx0l2rbohkprp3xzw1.png', '2024-04-07 06:38:24.141', '2024-04-07 06:38:24.141'),
(2, 'MS', 'https://res.cloudinary.com/dev-empty/image/upload/v1712471948/llz0bauapvvl5orjrtoz.png', '2024-04-07 06:39:10.350', '2024-04-07 06:39:10.350'),
(3, 'Apple', 'https://res.cloudinary.com/dev-empty/image/upload/v1712471962/liykku9qtakwl4nu199g.png', '2024-04-07 06:39:24.023', '2024-04-07 06:39:24.023'),
(4, 'Everlane', 'https://res.cloudinary.com/dev-empty/image/upload/v1713248699/lerclugqsfzslxxjbg4j.png', '2024-04-16 06:25:10.564', '2024-04-16 06:25:10.564'),
(5, 'Pegasus', 'https://res.cloudinary.com/dev-empty/image/upload/v1713248719/rndof0zazfdwacvpwx45.png', '2024-04-16 06:25:26.673', '2024-04-16 06:25:26.673'),
(6, 'Comedy', 'https://res.cloudinary.com/dev-empty/image/upload/v1713248735/mjlhsaokpmqi6j7rfnrw.png', '2024-04-16 06:25:40.444', '2024-04-16 06:25:40.444');


INSERT INTO `Testimonial` (`id`, `name`, `image`, `bioTitle`, `description`, `createdOn`, `updatedOn`) VALUES
(1, 'John Berkings', 'https://res.cloudinary.com/dev-empty/image/upload/v1712478054/lj5qjro9mgaezlsubgrx.jpg', 'Angular CEO', 'Syntho Laboratories Ltd is the best Pharmaceutical manufacturer company in Bangladesh. We are leading pharmaceutical and medicine manufacturer company in ..', '2024-04-07 08:21:31.106', '2024-04-07 08:45:41.630'),
(3, 'Mobile', 'https://res.cloudinary.com/dev-empty/image/upload/v1712478054/lj5qjro9mgaezlsubgrx.jpg', 'Angular CEO', 'Syntho Laboratories Ltd is the best Pharmaceutical manufacturer company in Bangladesh. We are leading pharmaceutical and medicine manufacturer company in ..', '2024-04-07 08:21:31.106', '2024-04-08 05:56:27.138');


INSERT INTO `User` (`id`, `name`, `email`, `hashedPassword`, `image`, `role`, `gender`, `isInstructor`, `emailConfirmed`, `emailConfirmedOn`, `isActive`, `createdOn`, `updatedOn`) VALUES
(uuid(),'Yoo Honeysingh', 'tgcr.net@gmail.com', '$2b$12$kERK.Uxb3nHHxlFB0iMlnuq5omFj6362gJyyY07193jH.1TcP7s9G', 'https://res.cloudinary.com/dev-empty/image/upload/v1712139903/typ3uhxza7v9wv5w48ch.jpg', 'Admin', 'Male', 0, 0, NULL, 1, NOW(), NOW());

INSERT INTO `User` (`id`,`name`, `email`, `hashedPassword`, `image`, `role`, `gender`, `isInstructor`, `emailConfirmed`, `emailConfirmedOn`, `isActive`, `createdOn`, `updatedOn`) VALUES
-- Instructors
('834c71e6-faad-11ef-a4ea-0242ac110002','Sarah Johnson', 'sarah.j@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4WAYiHwmi6', '/images/advisor/advisor1.jpg', 'Instructor', 'Female', 1, 1, NOW(), 1, NOW(), NOW()),
('834c92b2-faad-11ef-a4ea-0242ac110002','Michael Chen', 'michael.c@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4WAYiHwmi6', '/images/advisor/advisor2.jpg', 'Instructor', 'Male', 1, 1, NOW(), 1, NOW(), NOW()),
('834c9580-faad-11ef-a4ea-0242ac110002','Emma Wilson', 'emma.w@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4WAYiHwmi6', '/images/advisor/advisor3.jpg', 'Instructor', 'Female', 1, 1, NOW(), 1, NOW(), NOW()),
('834c9868-faad-11ef-a4ea-0242ac110002','David Brown', 'david.b@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4WAYiHwmi6', '/images/advisor/advisor4.jpg', 'Instructor', 'Male', 1, 1, NOW(), 1, NOW(), NOW()),
('834c99a5-faad-11ef-a4ea-0242ac110002','Maria Garcia', 'maria.g@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4WAYiHwmi6', '/images/advisor/advisor5.jpg', 'Instructor', 'Female', 1, 1, NOW(), 1, NOW(), NOW()),
-- Students
(uuid(),'John Smith', 'john.s@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4WAYiHwmi6', '/images/user1.jpg', 'Student', 'Male', 0, 1, NOW(), 1, NOW(), NOW()),
(uuid(),'Lisa Wang', 'lisa.w@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4WAYiHwmi6', '/images/user2.jpg', 'Student', 'Female', 0, 1, NOW(), 1, NOW(), NOW()),
(uuid(),'James Wilson', 'james.w@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4WAYiHwmi6', '/images/user3.jpg', 'Student', 'Male', 0, 1, NOW(), 1, NOW(), NOW()),
(uuid(),'Sofia Rodriguez', 'sofia.r@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4WAYiHwmi6', '/images/user4.jpg', 'Student', 'Female', 0, 1, NOW(), 1, NOW(), NOW()),
(uuid(),'Tom Miller', 'tom.m@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4WAYiHwmi6', '/images/user5.jpg', 'Student', 'Male', 0, 1, NOW(), 1, NOW(), NOW());

  -- Insert Profiles for Instructors
INSERT INTO Profile (`id`,`userId`, `bioTitle`, `bio`, `phone`, `website`, `twitter`, `facebook`, `linkedin`, `youtube`, `subjects`, `updatedOn`) VALUES
(uuid(),'834c71e6-faad-11ef-a4ea-0242ac110002', 'Mathematics Professor', 'Experienced math educator with 10+ years teaching experience', '+1234567890', 'www.sarahjohnson.com', '@sarahj_math', 'sarahjmath', 'sarahjohnson', 'sarahjmath', 'Mathematics,Calculus,Algebra', NOW()),
(uuid(),'834c92b2-faad-11ef-a4ea-0242ac110002', 'Computer Science Instructor', 'Software engineer turned educator, specialized in web development', '+1234567891', 'www.michaelchen.dev', '@chen_codes', 'chentech', 'michaelchen', 'chencode', 'Programming,Web Development,Python', NOW()),
(uuid(),'834c9580-faad-11ef-a4ea-0242ac110002', 'Language Arts Teacher', 'Passionate about literature and creative writing', '+4412345678', 'www.emmawilson.edu', '@emma_writes', 'emmawilsonteach', 'emmawilson', 'emmateaches', 'English,Creative Writing,Literature', NOW()),
(uuid(),'834c9868-faad-11ef-a4ea-0242ac110002', 'Physics Professor', 'PhD in Theoretical Physics with research background', '+1234567892', 'www.davidbrown.edu', '@dr_brown', 'drbrown', 'davidbrownphysics', 'physicswithbrown', 'Physics,Quantum Mechanics,Mathematics', NOW()),
(uuid(),'834c99a5-faad-11ef-a4ea-0242ac110002', 'Spanish Language Expert', 'Native Spanish speaker with teaching certification', '+3412345678', 'www.mariagarcia.es', '@maria_teaches', 'mariagarciateach', 'mariagarcia', 'spanishwithmaria', 'Spanish,ESL,Language Arts', NOW());   

INSERT INTO `Course` (`id`, `userId`, `catId`, `title`, `slug`, `overview`, `regular_price`, `before_price`, `is_free`, `lessons`, `duration`, `image`, `access_time`, `requirements`, `what_you_will_learn`, `who_is_this_course_for`, `approved`, `in_home_page`, `is_class`, `createdOn`, `updatedOn`) VALUES
(1, '834c71e6-faad-11ef-a4ea-0242ac110002', 3, 'The Complete Python Bootcamp', 'the-complete-python-bootcamp', '<p><strong>Become a Python Programmer and learn one of the employer\'s most requested skills of 2023!</strong></p><p>This is the&nbsp;<strong>most comprehensive, yet straightforward, course for the Python programming language on Udemy!</strong>&nbsp;Whether you have never programmed before, already know basic syntax, or want to learn about the advanced features of Python, this course is for you! In this course we will&nbsp;<strong>teach you Python 3.</strong></p><p>With&nbsp;<strong>over 100 lectures</strong>&nbsp;and more than 21 hours of video, this comprehensive course leaves no stone unturned! This course includes quizzes, tests, coding exercises and homework assignments as well as 3 major projects to create a Python project portfolio!</p><p><strong>Learn how to use Python for real-world tasks, such as working with PDF Files, sending emails, reading Excel files, Scraping websites for pieces of information, working with image files, and much more!</strong></p><p>This course will practically teach you Python, with every lecture comes a full coding screencast and a corresponding code notebook! Learn in whatever manner is best for you!</p><p>We will start by helping you get Python installed on your computer, regardless of your operating system, whether its Linux, MacOS, or Windows, we\'ve got you covered.</p>', 100, 199, 0, '156', '22 hours on-demand video', 'https://res.cloudinary.com/dev-empty/image/upload/v1710662546/cbkssvalvathuerbtktl.jpg', 'Lifetime', '<ul><li>Access to a computer with an internet connection.</li><li>step 2 repeat<sup>tm</sup></li></ul>', '<ul><li>You will learn how to leverage the power of Python to solve tasks.</li><li>You will build games and programs that use Python libraries.</li><li>You will be able to use Python for your work problems or personal projects.</li><li>You will create a portfolio of Python-based projects you can share.</li><li>Learn to use Python professionally, learning both Python 2 and Python 3!</li><li>Create games with Python, like Tic Tac Toe and Blackjack!</li><li>Learn advanced Python features, like the collections module, and how to work with timestamps!</li><li>Learn to use Object Oriented Programming with classes!</li><li>Understand complex topics, like decorators.</li><li>Understand how to use both the Jupyter Notebook and create .py files</li><li>Get an understanding of how to create GUIs in the Jupyter Notebook system!</li></ul>', '<ul><li>Beginners who have never programmed before.</li><li>Programmers switching languages to Python.</li><li>Intermediate Python programmers who want to level up their skills!</li></ul>', 1, 1, 0, '2024-03-11 18:12:03.503', '2024-03-20 07:09:13.839'),
(2, '834c71e6-faad-11ef-a4ea-0242ac110002', 4, 'AWS Certified Cloud Practitioner', 'aws-certified-cloud-practitioner', '<p>If you are new to Amazon Web Services / Cloud Computing and looking to confidently pass your&nbsp;<strong>AWS Cloud Practitioner Certification Exam</strong>&nbsp;- then this AWS&nbsp;training is for you!</p><p>This popular&nbsp;<strong>AWS Cloud Practitioner Training</strong>&nbsp;for the&nbsp;<strong>AWS Certified Cloud Practitioner certification exam&nbsp;</strong>(CLF-C02) is packed with over 12 hours of comprehensive video lessons, hands-on lessons and a full-length practice exam simulation. With our mixture of in-depth theory, architectural diagrams and hands-on training, you\'ll learn how to architect and build applications on&nbsp;<strong>Amazon Web Services</strong>, fully preparing you for the&nbsp;<strong>AWS Cloud Practitioner certification&nbsp;</strong>exam. With this comprehensive&nbsp;<strong>Udemy AWS Cloud Practitioner training</strong>&nbsp;course, you have everything you need to comfortably pass the&nbsp;<strong>AWS Cloud Practitioner certification</strong>&nbsp;exam with confidence.</p><p><strong>HOW THIS COURSE IS DIFFERENT</strong></p><p>We have closely aligned this course with the official&nbsp;<strong>AWS Certified Cloud Practitioner exam guide</strong>&nbsp;and structured the course so that you can study at a pace that suits you best. We start with some basic background to get everyone up to speed on what cloud computing is and its benefits, before progressing through each knowledge domain.</p><p>We are big believers in using practical exercises to improve memory retention and contextualize knowledge, so we have included many guided practical exercises for those who have the time and desire to build a practical skillset. With this ALL-IN-ONE&nbsp;<strong>Udemy AWS cloud practitioner training</strong>, you\'ll be ready to pass the&nbsp;<strong>AWS Cloud Practitioner</strong>&nbsp;exam the first time.</p><p><strong>PREVIEW THIS COURSE</strong></p><p>There are many<strong>&nbsp;FREE&nbsp;previews</strong>&nbsp;so you can see how we prepare you for the AWS&nbsp;Certified Cloud Practitioner (CLF-C02) exam - using a combination of theoretical lectures and guided practical hands-on lessons.</p><p><strong>FOLLOW&nbsp;THE&nbsp;STUDY&nbsp;PLAN&nbsp;TO&nbsp;GET&nbsp;CERTIFIED&nbsp;IN&nbsp;20 DAYS</strong></p><p>You get a&nbsp;<strong>free study guide</strong>&nbsp;in PDF&nbsp;format (optional, requires name/email) to help you plan your study so you can pass your AWS&nbsp;Certified Cloud Practitioner exam in&nbsp;<strong>20 days</strong>! Dedicate around 1 hour every day to studying and you\'ll be ready to earn your first AWS&nbsp;certification in no time at all.</p>', 74, 200, 0, '203', '14h total length', 'https://res.cloudinary.com/dev-empty/image/upload/v1713237750/lmyfyv3n2yaceuw2to5k.jpg', 'Lifetime', '<ul><li>Beginners welcome! This course was designed with non-techies and newcomers to the cloud in mind</li><li>No need for previous AWS cloud experience as we\'ll teach you the foundations of cloud computing</li><li>A free-tier AWS account is recommended to follow along with the practice lessons - we’ll show you step by step how to create one</li></ul>', '<ul><li>MAXIMIZE YOUR TIME EFFICIENCY: Learn at your own pace with theory lectures and guided practical hands-on exercises</li><li>QUIZZES: At the end of each section you get to review your knowledge with a total of 120 unique quiz questions that test your understanding</li><li>ALL DIAGRAMS, CODE AND SLIDES: Available for download in PDF format</li><li>RESPONSIVE SUPPORT: Our team of AWS experts respond to all of your questions, concerns or feedback</li><li>PRESENTED IN A PROFESSIONAL WAY: Focused and to the point, clear language with professional subtitles</li></ul>', '<ul><li>Students preparing for the AWS Certified Cloud Practitioner exam who want to pass with confidence at first attempt</li><li>Candidates for the AWS exam who want to feel fully prepared and master the cloud with this comprehensive ALL-IN-ONE Training Course</li><li>IT Professionals who want to become qualified AWS Cloud Practitioners and enter any AWS technical Job interview with confidence</li><li>Anyone who is keen to take their AWS Cloud Career and salary to the next level with an AWS certification</li><li>Professionals who want to learn how to leverage the benefits of the AWS Cloud to demonstrate strong capability with AWS to (future) employers</li><li>Those who feel ready to work in a real-world environment and want to gain solid experience on AWS and master the AWS platform</li></ul>', 1, 1, 0, '2024-04-16 03:15:05.395', '2024-04-16 03:22:36.079'),
(3, '834c71e6-faad-11ef-a4ea-0242ac110002', 15, 'Classroom Management Essentials', 'classroom-management-essentials', '<p>Classroom management is consistently identified as a major concern for teachers. Yet, it is absolutely an essential component of effective teaching. This course helps teachers learn how to effectively manage a classroom.&nbsp;The primary goal of the course is to introduce a practical model for understanding and deconstructing the tasks involved in the process of classroom management and on learning practical, easy to implement strategies that enable teachers to spend more time teaching rather than disciplining!</p><p>Specifically, participants in this course will learn:&nbsp;&nbsp;</p><ul><li>Common misconceptions about classroom management</li><li>How to develop effective rules and routines</li><li>The role relationships play in one’s classroom management plan</li><li>Techniques for preventing misbehavior</li><li>Strategies for dealing with minor and more serious misbehavior</li><li>Plus much, much more!</li></ul><p>The course is divided into seven chapters.&nbsp;Each chapter begins with a lecture presented by Dr. Tracey Garrett, a specialist in the field of classroom management.&nbsp;Then, each chapter has a self-guided component where participants can review and expand on the material presented in the first lecture at their own pace.&nbsp;Finally, the remaining lectures in each chapter are interviews of teachers at different grade levels offering insight into their practice.&nbsp;</p>', 35, 75, 0, '28', '1h 51m', 'https://res.cloudinary.com/dev-empty/image/upload/v1713247811/gfnaqkwgpnzlfous1746.jpg', 'Lifetime', '<ul><li>A basic understanding of the dynamics of an elementary, middle or high school classroom is required.</li></ul>', '<ul><li><span style=\"color: rgb(45, 47, 49);\">Students who complete this course will develop the skills necessary to develop a safe, caring and orderly classroom where academic and social-emotional learning can</span></li></ul>', '<ul><li>This target audience for this class is any novice or veteran teacher, supervisor, mentor or coach, and principals who would like to learn about effective classroom management.</li></ul>', 1, 0, 0, '2024-04-16 06:11:20.053', '2024-04-16 06:23:25.737'),
(4, '834c71e6-faad-11ef-a4ea-0242ac110002', 5, 'Simple Strategy for Swing Trading', 'simple-strategy-for-swing-trading', '<p>I\'ve been a full-time trader of the Stock Market for almost twenty&nbsp;years, and I have developed a very simple and effective strategy for&nbsp;Swing Trading Stocks, ETF\'s -&nbsp;plus the&nbsp;Forex, Cryptocurrency&nbsp;and Commodity Markets.&nbsp;My strategy combines both Fundamental and Technical Analysis, but relies mostly on Technical Analysis of stock charts. This course will concentrate on Technical Analysis, and you will learn everything I know about correctly reading stock charts&nbsp;in about 80 minutes!</p><p>By training yourself to read and correctly interpret the information charts give you, you will be able to predict which way a stock will most likely move in the near future.&nbsp;Charts can actually give you a glimpse of the future, and are a must have tool in the successful trader\'s arsenal.</p><p>In my&nbsp;Beginners Guide to Technical Analysis of Stock Charts here on Udemy, I covered fifty different technical indicators.&nbsp;In this course, I teach the one&nbsp;indicator I use for all of my Buy and Sell Signals, and it\'s accuracy rate is about&nbsp;80%. Two&nbsp;of the most important lessons included in this course are&nbsp;how to handle a false Buy Signal to keep losses to an absolute minimum, and when to lock in profits to maximize your gains.&nbsp;The trading strategy I teach in this course will provide you with a plan for entering and exiting trades with confidence.&nbsp;</p><p>I look forward to helping you to become a&nbsp;successful Trader!</p><p>Happy Trading!&nbsp;</p>', 20, 50, 0, '8', '1h 20m', 'https://res.cloudinary.com/dev-empty/image/upload/v1713248066/ynvaoj85kure7mwqn2ax.jpg', 'One_Year', '<ul><li>You do not need any previous experience with stock charts.</li><li>All you need is an Internet connection and a desire to learn.</li><li>I supply links to all of the free tools needed for USA and Canadian traders.</li><li>For students outside the USA and Canada, your charting software must include the CCI - Commodity Chanel Index</li></ul>', '<ul><li>Become a successful trader!</li><li>Know exactly when to lock in profits.</li><li>Keep your losses to an absolute minimum.</li><li>Have a plan for entry and exit on every trade.</li><li>Trade stocks using one technical indicator that gives excellent Buy and Sell Signals.</li></ul>', '<ul><li>Everyone that wants to learn how to be a successful trader of Stocks and Exchange Traded Funds (ETF\'s)</li><li>This trading strategy also work for trading Currencies, Commodities and Cryptocurrencys.</li><li>Anyone that has too many Technical Indicators on their charts.</li><li>Anyone who wants a solid plan for entering and exiting trades.</li><li>Anyone who wants to stop taking big losses on their trades.</li><li>Anyone that needs a solid trading strategy.</li></ul>', 1, 0, 0, '2024-04-16 06:15:29.204', '2024-04-16 06:23:26.462'),
(5, '834c71e6-faad-11ef-a4ea-0242ac110002', 5, 'Stock Market Trading', 'stock-market-trading', '<p>I\'ve been a full-time trader of the Stock Market for almost twenty&nbsp;years, and I have developed a very simple and effective strategy for&nbsp;Swing Trading Stocks, ETF\'s -&nbsp;plus the&nbsp;Forex, Cryptocurrency&nbsp;and Commodity Markets.&nbsp;My strategy combines both Fundamental and Technical Analysis, but relies mostly on Technical Analysis of stock charts. This course will concentrate on Technical Analysis, and you will learn everything I know about correctly reading stock charts&nbsp;in about 80 minutes!</p><p>By training yourself to read and correctly interpret the information charts give you, you will be able to predict which way a stock will most likely move in the near future.&nbsp;Charts can actually give you a glimpse of the future, and are a must have tool in the successful trader\'s arsenal.</p><p>In my&nbsp;Beginners Guide to Technical Analysis of Stock Charts here on Udemy, I covered fifty different technical indicators.&nbsp;In this course, I teach the one&nbsp;indicator I use for all of my Buy and Sell Signals, and it\'s accuracy rate is about&nbsp;80%. Two&nbsp;of the most important lessons included in this course are&nbsp;how to handle a false Buy Signal to keep losses to an absolute minimum, and when to lock in profits to maximize your gains.&nbsp;The trading strategy I teach in this course will provide you with a plan for entering and exiting trades with confidence.&nbsp;</p><p>I look forward to helping you to become a&nbsp;successful Trader!</p><p>Happy Trading!&nbsp;</p>', 20, 50, 0, '8', '1h 20m', 'https://res.cloudinary.com/dev-empty/image/upload/v1713248210/dz2ijrpuklidbhhgi03k.jpg', 'One_Year', '<ul><li>You do not need any previous experience with stock charts.</li><li>All you need is an Internet connection and a desire to learn.</li><li>I supply links to all of the free tools needed for USA and Canadian traders.</li><li>For students outside the USA and Canada, your charting software must include the CCI - Commodity Chanel Index</li></ul>', '<ul><li>Become a successful trader!</li><li>Know exactly when to lock in profits.</li><li>Keep your losses to an absolute minimum.</li><li>Have a plan for entry and exit on every trade.</li><li>Trade stocks using one technical indicator that gives excellent Buy and Sell Signals.</li></ul>', '<ul><li>Everyone that wants to learn how to be a successful trader of Stocks and Exchange Traded Funds (ETF\'s)</li><li>This trading strategy also work for trading Currencies, Commodities and Cryptocurrencys.</li><li>Anyone that has too many Technical Indicators on their charts.</li><li>Anyone who wants a solid plan for entering and exiting trades.</li><li>Anyone who wants to stop taking big losses on their trades.</li><li>Anyone that needs a solid trading strategy.</li></ul>', 1, 0, 0, '2024-04-16 06:16:56.264', '2024-04-16 06:23:27.217'),
(6, '834c71e6-faad-11ef-a4ea-0242ac110002', 5, 'Technical Analysis MasterClass', 'technical-analysis-masterclass', '<p>I\'ve been a full-time trader of the Stock Market for almost twenty&nbsp;years, and I have developed a very simple and effective strategy for&nbsp;Swing Trading Stocks, ETF\'s -&nbsp;plus the&nbsp;Forex, Cryptocurrency&nbsp;and Commodity Markets.&nbsp;My strategy combines both Fundamental and Technical Analysis, but relies mostly on Technical Analysis of stock charts. This course will concentrate on Technical Analysis, and you will learn everything I know about correctly reading stock charts&nbsp;in about 80 minutes!</p><p>By training yourself to read and correctly interpret the information charts give you, you will be able to predict which way a stock will most likely move in the near future.&nbsp;Charts can actually give you a glimpse of the future, and are a must have tool in the successful trader\'s arsenal.</p><p>In my&nbsp;Beginners Guide to Technical Analysis of Stock Charts here on Udemy, I covered fifty different technical indicators.&nbsp;In this course, I teach the one&nbsp;indicator I use for all of my Buy and Sell Signals, and it\'s accuracy rate is about&nbsp;80%. Two&nbsp;of the most important lessons included in this course are&nbsp;how to handle a false Buy Signal to keep losses to an absolute minimum, and when to lock in profits to maximize your gains.&nbsp;The trading strategy I teach in this course will provide you with a plan for entering and exiting trades with confidence.&nbsp;</p><p>I look forward to helping you to become a&nbsp;successful Trader!</p><p>Happy Trading!&nbsp;</p>', 20, 50, 0, '8', '1h 20m', 'https://res.cloudinary.com/dev-empty/image/upload/v1713248298/gav1xg9vpqtrlps8l0jz.jpg', 'One_Year', '<ul><li>You do not need any previous experience with stock charts.</li><li>All you need is an Internet connection and a desire to learn.</li><li>I supply links to all of the free tools needed for USA and Canadian traders.</li><li>For students outside the USA and Canada, your charting software must include the CCI - Commodity Chanel Index</li></ul>', '<ul><li>Become a successful trader!</li><li>Know exactly when to lock in profits.</li><li>Keep your losses to an absolute minimum.</li><li>Have a plan for entry and exit on every trade.</li><li>Trade stocks using one technical indicator that gives excellent Buy and Sell Signals.</li></ul>', '<ul><li>Everyone that wants to learn how to be a successful trader of Stocks and Exchange Traded Funds (ETF\'s)</li><li>This trading strategy also work for trading Currencies, Commodities and Cryptocurrencys.</li><li>Anyone that has too many Technical Indicators on their charts.</li><li>Anyone who wants a solid plan for entering and exiting trades.</li><li>Anyone who wants to stop taking big losses on their trades.</li><li>Anyone that needs a solid trading strategy.</li></ul>', 1, 0, 0, '2024-04-16 06:18:22.402', '2024-04-16 06:23:27.849');


INSERT INTO `Video` (`id`, `courseId`, `groupName`, `title`, `thumbImage`, `videoUrl`, `videoLength`, `isPreview`, `shortId`, `createdOn`, `updatedOn`) VALUES
(1, 1, 'Introduction', 'How to setup computer?', 'https://res.cloudinary.com/dev-empty/image/upload/v1710652579/rvlhltiuwjvfr9lx13vx.jpg', 'https://res.cloudinary.com/dev-empty/video/upload/v1710652558/xatwghyrdowx7wm1ewt2.mp4', '00:00:08', 1, 1, '2024-03-17 05:16:59.100', '2024-03-17 05:16:59.100'),
(8, 1, 'Introduction', 'Setep 1', 'https://res.cloudinary.com/dev-empty/image/upload/v1710652579/rvlhltiuwjvfr9lx13vx.jpg', 'https://res.cloudinary.com/dev-empty/video/upload/v1710652558/xatwghyrdowx7wm1ewt2.mp4', '00:00:08', 0, 3, '2024-03-17 05:16:59.100', '2024-03-17 05:16:59.100'),
(9, 1, 'Introduction', 'Setep 2', 'https://res.cloudinary.com/dev-empty/image/upload/v1710652579/rvlhltiuwjvfr9lx13vx.jpg', 'https://res.cloudinary.com/dev-empty/video/upload/v1710652558/xatwghyrdowx7wm1ewt2.mp4', '00:00:08', 1, 5, '2024-03-17 05:16:59.100', '2024-03-17 05:16:59.100'),
(10, 1, 'Introduction', 'Setep 3', 'https://res.cloudinary.com/dev-empty/image/upload/v1710652579/rvlhltiuwjvfr9lx13vx.jpg', 'https://res.cloudinary.com/dev-empty/video/upload/v1710652558/xatwghyrdowx7wm1ewt2.mp4', '00:00:08', 1, 2, '2024-03-17 05:16:59.100', '2024-03-17 05:16:59.100'),
(11, 1, 'Introduction', 'Setep 4', 'https://res.cloudinary.com/dev-empty/image/upload/v1710652579/rvlhltiuwjvfr9lx13vx.jpg', 'https://res.cloudinary.com/colbycloud-next-cloudinary/video/upload/q_auto/f_auto:video/v1/videos/mountain-stars?_s=vp-1.10.6', '00:00:08', 1, 10, '2024-03-17 05:16:59.100', '2024-03-17 05:16:59.100'),
(12, 2, 'Phase 1', 'Introduction', 'https://res.cloudinary.com/dev-empty/image/upload/v1713237409/o3rjz4nxiu9xzj5i3qat.jpg', 'https://res.cloudinary.com/dev-empty/video/upload/v1713237433/wvo6bepjgkg5nsgwz9bm.mp4', '00:00:08', 1, 0, '2024-04-16 03:17:27.816', '2024-04-16 03:17:27.816'),
(13, 2, 'Phase 1', 'Setup Environment', 'https://res.cloudinary.com/dev-empty/image/upload/v1713237525/srrnamqv1vqsgrq8buhz.jpg', 'https://res.cloudinary.com/dev-empty/video/upload/v1713237494/gud1w1cimli7yf23glgb.mp4', '00:00:25', 0, 1, '2024-04-16 03:20:53.188', '2024-04-16 03:20:53.188'),
(14, 6, 'Introduction', 'Introduction', 'https://res.cloudinary.com/dev-empty/image/upload/v1713248339/j1xmqfob3bmrvifyotno.jpg', 'https://res.cloudinary.com/dev-empty/video/upload/v1713248349/exuhwhbteencg7etqbl5.mp4', '00:00:10', 1, 0, '2024-04-16 06:19:19.605', '2024-04-16 06:19:19.605'),
(15, 6, 'Introduction', 'Technical Analysis', 'https://res.cloudinary.com/dev-empty/image/upload/v1713248421/wendd6igfdg6spinol2c.jpg', 'https://res.cloudinary.com/dev-empty/video/upload/v1713248398/fxuf781bz1smwrqr6hbh.mp4', '00:00:20', 0, 1, '2024-04-16 06:20:27.030', '2024-04-16 06:20:27.030'),
(16, 4, 'Introduction', 'Introduction', 'https://res.cloudinary.com/dev-empty/image/upload/v1713248471/swf357os32qf0nywkk4o.jpg', 'https://res.cloudinary.com/dev-empty/video/upload/v1713248486/i4gtg3jtg3zq4eefonp3.mp4', '00:00:06', 1, 0, '2024-04-16 06:21:33.383', '2024-04-16 06:21:33.383'),
(17, 5, 'Introduction', 'Introduction', 'https://res.cloudinary.com/dev-empty/image/upload/v1713248554/remidjexilj2nmucpdt0.jpg', 'https://res.cloudinary.com/dev-empty/video/upload/v1713248526/qg2tcp96vytoisg8mfpr.mp4', '00:00:10', 0, 1, '2024-04-16 06:22:40.066', '2024-04-16 06:22:40.066'),
(18, 3, 'Introduction', 'Introduction', 'https://res.cloudinary.com/dev-empty/image/upload/v1713248577/hcvbbktracmft2z4s0rh.jpg', 'https://res.cloudinary.com/dev-empty/video/upload/v1713248587/rtmsqdcyxvgn61u8nybf.mp4', '00:00:19', 1, 1, '2024-04-16 06:23:15.384', '2024-04-16 06:23:15.384');


INSERT INTO `Asset` (`id`, `courseId`, `lectureName`, `assetZip`, `createdOn`, `updatedOn`) VALUES
(1, 1, 'Project catelog', 'https://res.cloudinary.com/dev-empty/raw/upload/v1712122501/g6gnhpql65wzaynmvglq.zip', '2024-04-03 05:35:05.530', '2024-04-03 05:35:05.530');


INSERT INTO `Progress` (`id`, `finished`, `userId`, `courseId`, `videoId`, `createdOn`) VALUES
(2, 1, '834c71e6-faad-11ef-a4ea-0242ac110002', 1, 1, '2024-04-03 07:08:32.167'),
(3, 1, '834c71e6-faad-11ef-a4ea-0242ac110002', 1, 11, '2024-04-03 07:08:43.206'),
(4, 1, '834c71e6-faad-11ef-a4ea-0242ac110002', 1, 9, '2024-04-03 07:08:45.749'),
(5, 1, '834c71e6-faad-11ef-a4ea-0242ac110002', 1, 8, '2024-04-03 07:08:48.775'),
(6, 1, '834c71e6-faad-11ef-a4ea-0242ac110002', 1, 10, '2024-04-03 07:08:50.782');

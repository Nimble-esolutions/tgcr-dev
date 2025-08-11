-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 14, 2025 at 11:23 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tgcr`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `provider` varchar(191) NOT NULL,
  `providerAccountId` varchar(191) NOT NULL,
  `refresh_token` varchar(191) DEFAULT NULL,
  `access_token` text DEFAULT NULL,
  `expires_at` int(11) DEFAULT NULL,
  `token_type` varchar(191) DEFAULT NULL,
  `scope` varchar(191) DEFAULT NULL,
  `id_token` text DEFAULT NULL,
  `session_state` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `asset`
--

CREATE TABLE `asset` (
  `id` int(11) NOT NULL,
  `courseId` int(11) NOT NULL,
  `lectureName` varchar(255) DEFAULT NULL,
  `assetZip` varchar(500) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `updatedOn` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `asset`
--

INSERT INTO `asset` (`id`, `courseId`, `lectureName`, `assetZip`, `createdOn`, `updatedOn`) VALUES
(1, 1, 'Project catelog', 'https://res.cloudinary.com/dev-empty/raw/upload/v1712122501/g6gnhpql65wzaynmvglq.zip', '2024-04-03 05:35:05', '2024-04-03 05:35:05');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `updatedOn` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `slug`, `createdOn`, `updatedOn`) VALUES
(1, 'Web Development', 'web-development', '2024-02-06 07:17:13', '2024-02-06 07:17:13'),
(2, 'App Development', 'app-development', '2024-02-06 07:17:13', '2024-02-06 07:17:13'),
(3, 'Mobile', 'mobile', '2024-02-06 07:17:13', '2024-04-08 05:57:26'),
(4, 'IT Certifications', 'it-certifications', '2024-04-16 03:10:24', '2024-04-16 03:10:24'),
(5, 'Finance & Accounting', 'finance-accounting', '2024-04-16 06:06:21', '2024-04-16 06:06:21'),
(6, 'IT & Software', 'it-software', '2024-04-16 06:06:31', '2024-04-16 06:06:31'),
(7, 'Office Productivity', 'office-productivity', '2024-04-16 06:06:47', '2024-04-16 06:06:47'),
(8, 'Personal Development', 'personal-development', '2024-04-16 06:07:00', '2024-04-16 06:07:00'),
(9, 'Design', 'design', '2024-04-16 06:07:10', '2024-04-16 06:07:10'),
(10, 'Marketing', 'marketing', '2024-04-16 06:07:27', '2024-04-16 06:07:27'),
(11, 'Lifestyle', 'lifestyle', '2024-04-16 06:07:38', '2024-04-16 06:07:38'),
(12, 'Photography & Video', 'photography-video', '2024-04-16 06:07:51', '2024-04-16 06:07:51'),
(13, 'Health & Fitness', 'health-fitness', '2024-04-16 06:08:00', '2024-04-16 06:08:00'),
(14, 'Music', 'music', '2024-04-16 06:08:10', '2024-04-16 06:08:10'),
(15, 'Teaching & Academics', 'teaching-academics', '2024-04-16 06:08:22', '2024-04-16 06:08:22');

-- --------------------------------------------------------

--
-- Table structure for table `classlevel`
--

CREATE TABLE `classlevel` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `position` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `classlevel`
--

INSERT INTO `classlevel` (`id`, `name`, `position`) VALUES
(1, 'Trial Class', 0),
(2, 'Lower Primary (Age: 6 - 8)', 1),
(3, 'Upper Primary (Age: 8 - 12)', 2),
(4, 'Lower Secondary (Age: 12 - 15)', 3),
(5, 'Upper Secondary (Age: 15 - 18)', 4),
(6, 'Higher Education (Age: 18 +)', 5);

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `id` int(11) NOT NULL,
  `iso2Code` varchar(5) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `region` varchar(100) DEFAULT NULL,
  `dialCode` varchar(10) DEFAULT NULL,
  `position` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`id`, `iso2Code`, `name`, `region`, `dialCode`, `position`) VALUES
(1, 'US', 'United States', 'North America', '+1', 0),
(2, 'CA', 'Canada', 'North America', '+1', 0),
(3, 'GB', 'United Kingdom', 'Europe', '+44', 0),
(4, 'NL', 'Netherlands', 'Europe', '+31', 1),
(5, 'IN', 'India', 'Asia', '+91', 1);

-- --------------------------------------------------------

--
-- Table structure for table `coupon`
--

CREATE TABLE `coupon` (
  `id` int(11) NOT NULL,
  `code` varchar(50) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `expDate` datetime DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `deletedOn` datetime DEFAULT NULL,
  `activeForFullSite` tinyint(1) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `coupon`
--

INSERT INTO `coupon` (`id`, `code`, `discount`, `expDate`, `status`, `deletedOn`, `activeForFullSite`, `createdOn`) VALUES
(3, 'FEB25', 25, NULL, NULL, NULL, 0, '2024-04-08 06:40:48');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `catId` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `overview` longtext DEFAULT NULL,
  `regular_price` decimal(10,2) DEFAULT NULL,
  `before_price` decimal(10,2) DEFAULT NULL,
  `is_free` tinyint(1) DEFAULT NULL,
  `lessons` varchar(50) DEFAULT NULL,
  `duration` varchar(100) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `access_time` varchar(100) DEFAULT NULL,
  `requirements` text DEFAULT NULL,
  `what_you_will_learn` longtext DEFAULT NULL,
  `who_is_this_course_for` longtext DEFAULT NULL,
  `approved` tinyint(1) DEFAULT NULL,
  `in_home_page` tinyint(1) DEFAULT NULL,
  `is_class` tinyint(1) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `updatedOn` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `userId`, `catId`, `title`, `slug`, `overview`, `regular_price`, `before_price`, `is_free`, `lessons`, `duration`, `image`, `access_time`, `requirements`, `what_you_will_learn`, `who_is_this_course_for`, `approved`, `in_home_page`, `is_class`, `createdOn`, `updatedOn`) VALUES
(1, '834c71e6-faad-11ef-a4ea-0242ac110002', 3, 'The Complete Python Bootcamp', 'the-complete-python-bootcamp', '<p><strong>Become a Python Programmer and learn one of the employer\'s most requested skills of 2023!</strong></p><p>This is the&nbsp;<strong>most comprehensive, yet straightforward, course for the Python programming language on Udemy!</strong>&nbsp;Whether you have never programmed before, already know basic syntax, or want to learn about the advanced features of Python, this course is for you! In this course we will&nbsp;<strong>teach you Python 3.</strong></p><p>With&nbsp;<strong>over 100 lectures</strong>&nbsp;and more than 21 hours of video, this comprehensive course leaves no stone unturned! This course includes quizzes, tests, coding exercises and homework assignments as well as 3 major projects to create a Python project portfolio!</p><p><strong>Learn how to use Python for real-world tasks, such as working with PDF Files, sending emails, reading Excel files, Scraping websites for pieces of information, working with image files, and much more!</strong></p><p>This course will practically teach you Python, with every lecture comes a full coding screencast and a corresponding code notebook! Learn in whatever manner is best for you!</p><p>We will start by helping you get Python installed on your computer, regardless of your operating system, whether its Linux, MacOS, or Windows, we\'ve got you covered.</p>', 100.00, 199.00, 0, '156', '22 hours on-demand video', 'https://res.cloudinary.com/dev-empty/image/upload/v1710662546/cbkssvalvathuerbtktl.jpg', 'Lifetime', '<ul><li>Access to a computer with an internet connection.</li><li>step 2 repeat<sup>tm</sup></li></ul>', '<ul><li>You will learn how to leverage the power of Python to solve tasks.</li><li>You will build games and programs that use Python libraries.</li><li>You will be able to use Python for your work problems or personal projects.</li><li>You will create a portfolio of Python-based projects you can share.</li><li>Learn to use Python professionally, learning both Python 2 and Python 3!</li><li>Create games with Python, like Tic Tac Toe and Blackjack!</li><li>Learn advanced Python features, like the collections module, and how to work with timestamps!</li><li>Learn to use Object Oriented Programming with classes!</li><li>Understand complex topics, like decorators.</li><li>Understand how to use both the Jupyter Notebook and create .py files</li><li>Get an understanding of how to create GUIs in the Jupyter Notebook system!</li></ul>', '<ul><li>Beginners who have never programmed before.</li><li>Programmers switching languages to Python.</li><li>Intermediate Python programmers who want to level up their skills!</li></ul>', 1, 1, 0, '2024-03-11 18:12:03', '2024-03-20 07:09:13'),
(2, '834c71e6-faad-11ef-a4ea-0242ac110002', 4, 'AWS Certified Cloud Practitioner', 'aws-certified-cloud-practitioner', '<p>If you are new to Amazon Web Services / Cloud Computing and looking to confidently pass your&nbsp;<strong>AWS Cloud Practitioner Certification Exam</strong>&nbsp;- then this AWS&nbsp;training is for you!</p><p>This popular&nbsp;<strong>AWS Cloud Practitioner Training</strong>&nbsp;for the&nbsp;<strong>AWS Certified Cloud Practitioner certification exam&nbsp;</strong>(CLF-C02) is packed with over 12 hours of comprehensive video lessons, hands-on lessons and a full-length practice exam simulation. With our mixture of in-depth theory, architectural diagrams and hands-on training, you\'ll learn how to architect and build applications on&nbsp;<strong>Amazon Web Services</strong>, fully preparing you for the&nbsp;<strong>AWS Cloud Practitioner certification&nbsp;</strong>exam. With this comprehensive&nbsp;<strong>Udemy AWS Cloud Practitioner training</strong>&nbsp;course, you have everything you need to comfortably pass the&nbsp;<strong>AWS Cloud Practitioner certification</strong>&nbsp;exam with confidence.</p><p><strong>HOW THIS COURSE IS DIFFERENT</strong></p><p>We have closely aligned this course with the official&nbsp;<strong>AWS Certified Cloud Practitioner exam guide</strong>&nbsp;and structured the course so that you can study at a pace that suits you best. We start with some basic background to get everyone up to speed on what cloud computing is and its benefits, before progressing through each knowledge domain.</p><p>We are big believers in using practical exercises to improve memory retention and contextualize knowledge, so we have included many guided practical exercises for those who have the time and desire to build a practical skillset. With this ALL-IN-ONE&nbsp;<strong>Udemy AWS cloud practitioner training</strong>, you\'ll be ready to pass the&nbsp;<strong>AWS Cloud Practitioner</strong>&nbsp;exam the first time.</p><p><strong>PREVIEW THIS COURSE</strong></p><p>There are many<strong>&nbsp;FREE&nbsp;previews</strong>&nbsp;so you can see how we prepare you for the AWS&nbsp;Certified Cloud Practitioner (CLF-C02) exam - using a combination of theoretical lectures and guided practical hands-on lessons.</p><p><strong>FOLLOW&nbsp;THE&nbsp;STUDY&nbsp;PLAN&nbsp;TO&nbsp;GET&nbsp;CERTIFIED&nbsp;IN&nbsp;20 DAYS</strong></p><p>You get a&nbsp;<strong>free study guide</strong>&nbsp;in PDF&nbsp;format (optional, requires name/email) to help you plan your study so you can pass your AWS&nbsp;Certified Cloud Practitioner exam in&nbsp;<strong>20 days</strong>! Dedicate around 1 hour every day to studying and you\'ll be ready to earn your first AWS&nbsp;certification in no time at all.</p>', 74.00, 200.00, 0, '203', '14h total length', 'https://res.cloudinary.com/dev-empty/image/upload/v1713237750/lmyfyv3n2yaceuw2to5k.jpg', 'Lifetime', '<ul><li>Beginners welcome! This course was designed with non-techies and newcomers to the cloud in mind</li><li>No need for previous AWS cloud experience as we\'ll teach you the foundations of cloud computing</li><li>A free-tier AWS account is recommended to follow along with the practice lessons - we’ll show you step by step how to create one</li></ul>', '<ul><li>MAXIMIZE YOUR TIME EFFICIENCY: Learn at your own pace with theory lectures and guided practical hands-on exercises</li><li>QUIZZES: At the end of each section you get to review your knowledge with a total of 120 unique quiz questions that test your understanding</li><li>ALL DIAGRAMS, CODE AND SLIDES: Available for download in PDF format</li><li>RESPONSIVE SUPPORT: Our team of AWS experts respond to all of your questions, concerns or feedback</li><li>PRESENTED IN A PROFESSIONAL WAY: Focused and to the point, clear language with professional subtitles</li></ul>', '<ul><li>Students preparing for the AWS Certified Cloud Practitioner exam who want to pass with confidence at first attempt</li><li>Candidates for the AWS exam who want to feel fully prepared and master the cloud with this comprehensive ALL-IN-ONE Training Course</li><li>IT Professionals who want to become qualified AWS Cloud Practitioners and enter any AWS technical Job interview with confidence</li><li>Anyone who is keen to take their AWS Cloud Career and salary to the next level with an AWS certification</li><li>Professionals who want to learn how to leverage the benefits of the AWS Cloud to demonstrate strong capability with AWS to (future) employers</li><li>Those who feel ready to work in a real-world environment and want to gain solid experience on AWS and master the AWS platform</li></ul>', 1, 1, 0, '2024-04-16 03:15:05', '2024-04-16 03:22:36'),
(3, '834c71e6-faad-11ef-a4ea-0242ac110002', 15, 'Classroom Management Essentials', 'classroom-management-essentials', '<p>Classroom management is consistently identified as a major concern for teachers. Yet, it is absolutely an essential component of effective teaching. This course helps teachers learn how to effectively manage a classroom.&nbsp;The primary goal of the course is to introduce a practical model for understanding and deconstructing the tasks involved in the process of classroom management and on learning practical, easy to implement strategies that enable teachers to spend more time teaching rather than disciplining!</p><p>Specifically, participants in this course will learn:&nbsp;&nbsp;</p><ul><li>Common misconceptions about classroom management</li><li>How to develop effective rules and routines</li><li>The role relationships play in one’s classroom management plan</li><li>Techniques for preventing misbehavior</li><li>Strategies for dealing with minor and more serious misbehavior</li><li>Plus much, much more!</li></ul><p>The course is divided into seven chapters.&nbsp;Each chapter begins with a lecture presented by Dr. Tracey Garrett, a specialist in the field of classroom management.&nbsp;Then, each chapter has a self-guided component where participants can review and expand on the material presented in the first lecture at their own pace.&nbsp;Finally, the remaining lectures in each chapter are interviews of teachers at different grade levels offering insight into their practice.&nbsp;</p>', 35.00, 75.00, 0, '28', '1h 51m', 'https://res.cloudinary.com/dev-empty/image/upload/v1713247811/gfnaqkwgpnzlfous1746.jpg', 'Lifetime', '<ul><li>A basic understanding of the dynamics of an elementary, middle or high school classroom is required.</li></ul>', '<ul><li><span style=\"color: rgb(45, 47, 49);\">Students who complete this course will develop the skills necessary to develop a safe, caring and orderly classroom where academic and social-emotional learning can</span></li></ul>', '<ul><li>This target audience for this class is any novice or veteran teacher, supervisor, mentor or coach, and principals who would like to learn about effective classroom management.</li></ul>', 1, 0, 0, '2024-04-16 06:11:20', '2024-04-16 06:23:25'),
(4, '834c71e6-faad-11ef-a4ea-0242ac110002', 5, 'Simple Strategy for Swing Trading', 'simple-strategy-for-swing-trading', '<p>I\'ve been a full-time trader of the Stock Market for almost twenty&nbsp;years, and I have developed a very simple and effective strategy for&nbsp;Swing Trading Stocks, ETF\'s -&nbsp;plus the&nbsp;Forex, Cryptocurrency&nbsp;and Commodity Markets.&nbsp;My strategy combines both Fundamental and Technical Analysis, but relies mostly on Technical Analysis of stock charts. This course will concentrate on Technical Analysis, and you will learn everything I know about correctly reading stock charts&nbsp;in about 80 minutes!</p><p>By training yourself to read and correctly interpret the information charts give you, you will be able to predict which way a stock will most likely move in the near future.&nbsp;Charts can actually give you a glimpse of the future, and are a must have tool in the successful trader\'s arsenal.</p><p>In my&nbsp;Beginners Guide to Technical Analysis of Stock Charts here on Udemy, I covered fifty different technical indicators.&nbsp;In this course, I teach the one&nbsp;indicator I use for all of my Buy and Sell Signals, and it\'s accuracy rate is about&nbsp;80%. Two&nbsp;of the most important lessons included in this course are&nbsp;how to handle a false Buy Signal to keep losses to an absolute minimum, and when to lock in profits to maximize your gains.&nbsp;The trading strategy I teach in this course will provide you with a plan for entering and exiting trades with confidence.&nbsp;</p><p>I look forward to helping you to become a&nbsp;successful Trader!</p><p>Happy Trading!&nbsp;</p>', 20.00, 50.00, 0, '8', '1h 20m', 'https://res.cloudinary.com/dev-empty/image/upload/v1713248066/ynvaoj85kure7mwqn2ax.jpg', 'One_Year', '<ul><li>You do not need any previous experience with stock charts.</li><li>All you need is an Internet connection and a desire to learn.</li><li>I supply links to all of the free tools needed for USA and Canadian traders.</li><li>For students outside the USA and Canada, your charting software must include the CCI - Commodity Chanel Index</li></ul>', '<ul><li>Become a successful trader!</li><li>Know exactly when to lock in profits.</li><li>Keep your losses to an absolute minimum.</li><li>Have a plan for entry and exit on every trade.</li><li>Trade stocks using one technical indicator that gives excellent Buy and Sell Signals.</li></ul>', '<ul><li>Everyone that wants to learn how to be a successful trader of Stocks and Exchange Traded Funds (ETF\'s)</li><li>This trading strategy also work for trading Currencies, Commodities and Cryptocurrencys.</li><li>Anyone that has too many Technical Indicators on their charts.</li><li>Anyone who wants a solid plan for entering and exiting trades.</li><li>Anyone who wants to stop taking big losses on their trades.</li><li>Anyone that needs a solid trading strategy.</li></ul>', 1, 0, 0, '2024-04-16 06:15:29', '2024-04-16 06:23:26'),
(5, '834c71e6-faad-11ef-a4ea-0242ac110002', 5, 'Stock Market Trading', 'stock-market-trading', '<p>I\'ve been a full-time trader of the Stock Market for almost twenty&nbsp;years, and I have developed a very simple and effective strategy for&nbsp;Swing Trading Stocks, ETF\'s -&nbsp;plus the&nbsp;Forex, Cryptocurrency&nbsp;and Commodity Markets.&nbsp;My strategy combines both Fundamental and Technical Analysis, but relies mostly on Technical Analysis of stock charts. This course will concentrate on Technical Analysis, and you will learn everything I know about correctly reading stock charts&nbsp;in about 80 minutes!</p><p>By training yourself to read and correctly interpret the information charts give you, you will be able to predict which way a stock will most likely move in the near future.&nbsp;Charts can actually give you a glimpse of the future, and are a must have tool in the successful trader\'s arsenal.</p><p>In my&nbsp;Beginners Guide to Technical Analysis of Stock Charts here on Udemy, I covered fifty different technical indicators.&nbsp;In this course, I teach the one&nbsp;indicator I use for all of my Buy and Sell Signals, and it\'s accuracy rate is about&nbsp;80%. Two&nbsp;of the most important lessons included in this course are&nbsp;how to handle a false Buy Signal to keep losses to an absolute minimum, and when to lock in profits to maximize your gains.&nbsp;The trading strategy I teach in this course will provide you with a plan for entering and exiting trades with confidence.&nbsp;</p><p>I look forward to helping you to become a&nbsp;successful Trader!</p><p>Happy Trading!&nbsp;</p>', 20.00, 50.00, 0, '8', '1h 20m', 'https://res.cloudinary.com/dev-empty/image/upload/v1713248210/dz2ijrpuklidbhhgi03k.jpg', 'One_Year', '<ul><li>You do not need any previous experience with stock charts.</li><li>All you need is an Internet connection and a desire to learn.</li><li>I supply links to all of the free tools needed for USA and Canadian traders.</li><li>For students outside the USA and Canada, your charting software must include the CCI - Commodity Chanel Index</li></ul>', '<ul><li>Become a successful trader!</li><li>Know exactly when to lock in profits.</li><li>Keep your losses to an absolute minimum.</li><li>Have a plan for entry and exit on every trade.</li><li>Trade stocks using one technical indicator that gives excellent Buy and Sell Signals.</li></ul>', '<ul><li>Everyone that wants to learn how to be a successful trader of Stocks and Exchange Traded Funds (ETF\'s)</li><li>This trading strategy also work for trading Currencies, Commodities and Cryptocurrencys.</li><li>Anyone that has too many Technical Indicators on their charts.</li><li>Anyone who wants a solid plan for entering and exiting trades.</li><li>Anyone who wants to stop taking big losses on their trades.</li><li>Anyone that needs a solid trading strategy.</li></ul>', 1, 0, 0, '2024-04-16 06:16:56', '2024-04-16 06:23:27'),
(6, '834c71e6-faad-11ef-a4ea-0242ac110002', 5, 'Technical Analysis MasterClass', 'technical-analysis-masterclass', '<p>I\'ve been a full-time trader of the Stock Market for almost twenty&nbsp;years, and I have developed a very simple and effective strategy for&nbsp;Swing Trading Stocks, ETF\'s -&nbsp;plus the&nbsp;Forex, Cryptocurrency&nbsp;and Commodity Markets.&nbsp;My strategy combines both Fundamental and Technical Analysis, but relies mostly on Technical Analysis of stock charts. This course will concentrate on Technical Analysis, and you will learn everything I know about correctly reading stock charts&nbsp;in about 80 minutes!</p><p>By training yourself to read and correctly interpret the information charts give you, you will be able to predict which way a stock will most likely move in the near future.&nbsp;Charts can actually give you a glimpse of the future, and are a must have tool in the successful trader\'s arsenal.</p><p>In my&nbsp;Beginners Guide to Technical Analysis of Stock Charts here on Udemy, I covered fifty different technical indicators.&nbsp;In this course, I teach the one&nbsp;indicator I use for all of my Buy and Sell Signals, and it\'s accuracy rate is about&nbsp;80%. Two&nbsp;of the most important lessons included in this course are&nbsp;how to handle a false Buy Signal to keep losses to an absolute minimum, and when to lock in profits to maximize your gains.&nbsp;The trading strategy I teach in this course will provide you with a plan for entering and exiting trades with confidence.&nbsp;</p><p>I look forward to helping you to become a&nbsp;successful Trader!</p><p>Happy Trading!&nbsp;</p>', 20.00, 50.00, 0, '8', '1h 20m', 'https://res.cloudinary.com/dev-empty/image/upload/v1713248298/gav1xg9vpqtrlps8l0jz.jpg', 'One_Year', '<ul><li>You do not need any previous experience with stock charts.</li><li>All you need is an Internet connection and a desire to learn.</li><li>I supply links to all of the free tools needed for USA and Canadian traders.</li><li>For students outside the USA and Canada, your charting software must include the CCI - Commodity Chanel Index</li></ul>', '<ul><li>Become a successful trader!</li><li>Know exactly when to lock in profits.</li><li>Keep your losses to an absolute minimum.</li><li>Have a plan for entry and exit on every trade.</li><li>Trade stocks using one technical indicator that gives excellent Buy and Sell Signals.</li></ul>', '<ul><li>Everyone that wants to learn how to be a successful trader of Stocks and Exchange Traded Funds (ETF\'s)</li><li>This trading strategy also work for trading Currencies, Commodities and Cryptocurrencys.</li><li>Anyone that has too many Technical Indicators on their charts.</li><li>Anyone who wants a solid plan for entering and exiting trades.</li><li>Anyone who wants to stop taking big losses on their trades.</li><li>Anyone that needs a solid trading strategy.</li></ul>', 1, 0, 0, '2024-04-16 06:18:22', '2024-04-16 06:23:27');

-- --------------------------------------------------------

--
-- Table structure for table `earning`
--

CREATE TABLE `earning` (
  `id` int(11) NOT NULL,
  `cost` double DEFAULT NULL,
  `userId` varchar(191) NOT NULL,
  `courseId` int(11) NOT NULL,
  `status` enum('Due','Paid','Cancelled') NOT NULL DEFAULT 'Due',
  `createdOn` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedOn` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `educationalboard`
--

CREATE TABLE `educationalboard` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `position` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `educationalboard`
--

INSERT INTO `educationalboard` (`id`, `name`, `position`) VALUES
(1, 'IB', 1),
(2, 'IGCSE', 2),
(3, 'GCSE', 3),
(4, 'CBSE', 4),
(5, 'ICSE', 5),
(6, 'Cambridge', 6),
(7, 'AUS - Australian', 7),
(8, 'British', 8),
(9, 'US', 9),
(10, 'National Curriculum', 10),
(11, 'Others', 11);

-- --------------------------------------------------------

--
-- Table structure for table `educationalqualification`
--

CREATE TABLE `educationalqualification` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `position` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `enrolment`
--

CREATE TABLE `enrolment` (
  `id` int(11) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `courseId` int(11) NOT NULL,
  `orderNumber` varchar(191) NOT NULL,
  `price` int(11) DEFAULT NULL,
  `paymentId` varchar(191) DEFAULT NULL,
  `paymentStatus` enum('Pending','Paid','Cancelled','Hold') NOT NULL DEFAULT 'Pending',
  `status` enum('Pending','Paid','Cancelled','Hold') NOT NULL DEFAULT 'Pending',
  `paymentVia` varchar(191) DEFAULT NULL,
  `createdOn` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `experiencelevel`
--

CREATE TABLE `experiencelevel` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `position` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `experiencelevel`
--

INSERT INTO `experiencelevel` (`id`, `name`, `position`) VALUES
(1, '0-4 years', 1),
(2, '5-10 years', 2),
(3, '11-15 years', 3),
(4, '15 years and above', 4);

-- --------------------------------------------------------

--
-- Table structure for table `favourite`
--

CREATE TABLE `favourite` (
  `id` int(11) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `courseId` int(11) NOT NULL,
  `createdOn` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `remarks` text DEFAULT NULL,
  `createdOn` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedOn` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feedbackattribute`
--

CREATE TABLE `feedbackattribute` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `key` varchar(10) NOT NULL,
  `position` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `feedbackattribute`
--

INSERT INTO `feedbackattribute` (`id`, `name`, `key`, `position`) VALUES
(1, 'Punctuality', 'PUNC', 1),
(2, 'Tech Issues', 'TECH', 2),
(3, 'WiFi Issues', 'WIFI', 3),
(4, 'Value for Money', 'VALU', 4),
(5, 'Clear Instructions', 'CLER', 5),
(6, 'Resource and Content Quality', 'QUAL', 6),
(7, 'Meet Expectations', 'MEET', 7),
(8, 'Engaging Lesson', 'ENGL', 8),
(9, 'Teacher\'s Knowledge', 'KNOW', 9),
(10, 'Overall Satisfaction', 'SATS', 10);

-- --------------------------------------------------------

--
-- Table structure for table `feedbackdetail`
--

CREATE TABLE `feedbackdetail` (
  `id` int(11) NOT NULL,
  `feedbackId` int(11) NOT NULL,
  `feedbackKey` varchar(191) NOT NULL,
  `feedbackValue` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `instructionmedium`
--

CREATE TABLE `instructionmedium` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `position` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `instructionmedium`
--

INSERT INTO `instructionmedium` (`id`, `name`, `position`) VALUES
(1, 'English', 1),
(2, 'Hindi', 2),
(3, 'Dutch', 3);

-- --------------------------------------------------------

--
-- Table structure for table `instructoravailability`
--

CREATE TABLE `instructoravailability` (
  `id` int(11) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `createdOn` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedOn` datetime(3) NOT NULL,
  `duration` varchar(191) NOT NULL,
  `endWeek` int(11) NOT NULL,
  `exdate` text DEFAULT NULL,
  `rrule` text DEFAULT NULL,
  `startWeek` int(11) NOT NULL,
  `title` enum('Availability','Booking') NOT NULL DEFAULT 'Availability'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `instructoravailabilityexceptions`
--

CREATE TABLE `instructoravailabilityexceptions` (
  `id` int(11) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `exceptionDate` date NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `isUnavailable` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lesson`
--

CREATE TABLE `lesson` (
  `id` int(11) NOT NULL,
  `lessonRequestId` int(11) NOT NULL,
  `userId` varchar(191) DEFAULT NULL,
  `createdOn` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedOn` datetime(3) NOT NULL,
  `actualEnd` datetime(3) NOT NULL,
  `actualStart` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lessonrequest`
--

CREATE TABLE `lessonrequest` (
  `id` varchar(191) NOT NULL,
  `studentId` int(11) NOT NULL,
  `instructorId` int(11) NOT NULL,
  `status` enum('Requested','Accepted','Rejected','Cancelled','Started','Completed') NOT NULL DEFAULT 'Requested',
  `userId` varchar(191) DEFAULT NULL,
  `requestedEnd` datetime(3) NOT NULL,
  `requestedStart` datetime(3) NOT NULL,
  `createdOn` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedOn` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `message` text NOT NULL,
  `status` enum('Unread','Read') NOT NULL DEFAULT 'Unread',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `partner`
--

CREATE TABLE `partner` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `updatedOn` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `partner`
--

INSERT INTO `partner` (`id`, `name`, `image`, `createdOn`, `updatedOn`) VALUES
(1, 'Google', 'https://res.cloudinary.com/dev-empty/image/upload/v1712471902/mqxx0l2rbohkprp3xzw1.png', '2024-04-07 06:38:24', '2024-04-07 06:38:24'),
(2, 'MS', 'https://res.cloudinary.com/dev-empty/image/upload/v1712471948/llz0bauapvvl5orjrtoz.png', '2024-04-07 06:39:10', '2024-04-07 06:39:10'),
(3, 'Apple', 'https://res.cloudinary.com/dev-empty/image/upload/v1712471962/liykku9qtakwl4nu199g.png', '2024-04-07 06:39:24', '2024-04-07 06:39:24'),
(4, 'Everlane', 'https://res.cloudinary.com/dev-empty/image/upload/v1713248699/lerclugqsfzslxxjbg4j.png', '2024-04-16 06:25:10', '2024-04-16 06:25:10'),
(5, 'Pegasus', 'https://res.cloudinary.com/dev-empty/image/upload/v1713248719/rndof0zazfdwacvpwx45.png', '2024-04-16 06:25:26', '2024-04-16 06:25:26'),
(6, 'Comedy', 'https://res.cloudinary.com/dev-empty/image/upload/v1713248735/mjlhsaokpmqi6j7rfnrw.png', '2024-04-16 06:25:40', '2024-04-16 06:25:40');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `lessonRequestId` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `paymentStatus` enum('Pending','Completed','Failed') NOT NULL DEFAULT 'Pending',
  `transactionId` varchar(191) DEFAULT NULL,
  `userId` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Profile`
--

CREATE TABLE `Profile` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `bioTitle` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `twitter` varchar(100) DEFAULT NULL,
  `facebook` varchar(100) DEFAULT NULL,
  `linkedin` varchar(100) DEFAULT NULL,
  `youtube` varchar(100) DEFAULT NULL,
  `subjects` text DEFAULT NULL,
  `updatedOn` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `Profile`
--

INSERT INTO `Profile` (`id`, `userId`, `bioTitle`, `bio`, `phone`, `website`, `twitter`, `facebook`, `linkedin`, `youtube`, `subjects`, `updatedOn`) VALUES
('d8faf5a0-5d51-11f0-ab02-000af7df17d6', '834c71e6-faad-11ef-a4ea-0242ac110002', 'Mathematics Professor', 'Experienced math educator with 10+ years teaching experience', '+1234567890', 'www.sarahjohnson.com', '@sarahj_math', 'sarahjmath', 'sarahjohnson', 'sarahjmath', 'Mathematics,Calculus,Algebra', '2025-07-10 06:50:54'),
('d8faf8c0-5d51-11f0-ab02-000af7df17d6', '834c92b2-faad-11ef-a4ea-0242ac110002', 'Computer Science Instructor', 'Software engineer turned educator, specialized in web development', '+1234567891', 'www.michaelchen.dev', '@chen_codes', 'chentech', 'michaelchen', 'chencode', 'Programming,Web Development,Python', '2025-07-10 06:50:54'),
('d8faf9d0-5d51-11f0-ab02-000af7df17d6', '834c9580-faad-11ef-a4ea-0242ac110002', 'Language Arts Teacher', 'Passionate about literature and creative writing', '+4412345678', 'www.emmawilson.edu', '@emma_writes', 'emmawilsonteach', 'emmawilson', 'emmateaches', 'English,Creative Writing,Literature', '2025-07-10 06:50:54'),
('d8fafa31-5d51-11f0-ab02-000af7df17d6', '834c9868-faad-11ef-a4ea-0242ac110002', 'Physics Professor', 'PhD in Theoretical Physics with research background', '+1234567892', 'www.davidbrown.edu', '@dr_brown', 'drbrown', 'davidbrownphysics', 'physicswithbrown', 'Physics,Quantum Mechanics,Mathematics', '2025-07-10 06:50:54'),
('d8fafa8b-5d51-11f0-ab02-000af7df17d6', '834c99a5-faad-11ef-a4ea-0242ac110002', 'Spanish Language Expert', 'Native Spanish speaker with teaching certification', '+3412345678', 'www.mariagarcia.es', '@maria_teaches', 'mariagarciateach', 'mariagarcia', 'spanishwithmaria', 'Spanish,ESL,Language Arts', '2025-07-10 06:50:54');

-- --------------------------------------------------------

--
-- Table structure for table `progress`
--

CREATE TABLE `progress` (
  `id` int(11) NOT NULL,
  `finished` tinyint(1) DEFAULT NULL,
  `userId` varchar(191) NOT NULL,
  `courseId` int(11) NOT NULL,
  `videoId` int(11) NOT NULL,
  `createdOn` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `progress`
--

INSERT INTO `progress` (`id`, `finished`, `userId`, `courseId`, `videoId`, `createdOn`) VALUES
(2, 1, '834c71e6-faad-11ef-a4ea-0242ac110002', 1, 1, '2024-04-03 07:08:32'),
(3, 1, '834c71e6-faad-11ef-a4ea-0242ac110002', 1, 11, '2024-04-03 07:08:43'),
(4, 1, '834c71e6-faad-11ef-a4ea-0242ac110002', 1, 9, '2024-04-03 07:08:45'),
(5, 1, '834c71e6-faad-11ef-a4ea-0242ac110002', 1, 8, '2024-04-03 07:08:48'),
(6, 1, '834c71e6-faad-11ef-a4ea-0242ac110002', 1, 10, '2024-04-03 07:08:50');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `userId` varchar(191) NOT NULL,
  `courseId` int(11) NOT NULL,
  `createdOn` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedOn` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `position` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`id`, `name`, `position`) VALUES
(1, 'Mathematics', 1),
(2, 'Physics', 2),
(3, 'Chemistry', 3),
(4, 'Biology', 4),
(5, 'Economics', 5),
(6, 'English Language Acquisition', 6),
(7, 'English Language and Literature', 7),
(8, 'Others', 8);

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

CREATE TABLE `subscription` (
  `id` int(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdOn` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `teacherclasslevelcost`
--

CREATE TABLE `teacherclasslevelcost` (
  `id` int(11) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `classLevelId` int(11) NOT NULL,
  `costPerLesson` double DEFAULT NULL,
  `currency` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `testimonial`
--

CREATE TABLE `testimonial` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `bioTitle` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `updatedOn` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `testimonial`
--

INSERT INTO `testimonial` (`id`, `name`, `image`, `bioTitle`, `description`, `createdOn`, `updatedOn`) VALUES
(1, 'John Berkings', 'https://res.cloudinary.com/dev-empty/image/upload/v1712478054/lj5qjro9mgaezlsubgrx.jpg', 'Angular CEO', 'Syntho Laboratories Ltd is the best Pharmaceutical manufacturer company in Bangladesh. We are leading pharmaceutical and medicine manufacturer company in ..', '2024-04-07 08:21:31', '2024-04-07 08:45:41'),
(3, 'Mobile', 'https://res.cloudinary.com/dev-empty/image/upload/v1712478054/lj5qjro9mgaezlsubgrx.jpg', 'Angular CEO', 'Syntho Laboratories Ltd is the best Pharmaceutical manufacturer company in Bangladesh. We are leading pharmaceutical and medicine manufacturer company in ..', '2024-04-07 08:21:31', '2024-04-08 05:56:27');

-- --------------------------------------------------------

--
-- Table structure for table `timezone`
--

CREATE TABLE `timezone` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(10) DEFAULT NULL,
  `tzIdentifier` varchar(100) DEFAULT NULL,
  `tzAbbreviation` varchar(10) DEFAULT NULL,
  `utcOffset` varchar(10) DEFAULT NULL,
  `position` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `timezone`
--

INSERT INTO `timezone` (`id`, `name`, `code`, `tzIdentifier`, `tzAbbreviation`, `utcOffset`, `position`) VALUES
(1, 'Pacific Standard Time', 'PST', 'America/Los_Angeles', 'PST', '-08:00', 1),
(2, 'Mountain Standard Time', 'MST', 'America/Denver', 'MST', '-07:00', 2),
(3, 'Eastern Standard Time', 'EST', 'America/New_York', 'EST', '-05:00', 3),
(4, 'Central Standard Time', 'CST', 'America/Chicago', 'CST', '-06:00', 4),
(5, 'Atlantic Standard Time', 'AST', 'America/Halifax', 'AST', '-04:00', 5),
(6, 'Greenwich Mean Time', 'GMT', 'Europe/London', 'GMT', '+00:00', 6),
(7, 'Central European Time', 'CET', 'Europe/Amsterdam', 'CET', '+01:00', 7),
(8, 'Indian Standard Time', 'IST', 'Asia/Calcutta', 'IST', '+05:30', 8),
(9, 'Australian Eastern Standard Time', 'AEST', 'Australia/Sydney', 'AEST', '+10:00', 9);

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `id` varchar(191) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `firstName` varchar(100) DEFAULT NULL,
  `middleName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `hashedPassword` varchar(255) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `dob` datetime DEFAULT NULL,
  `timezoneId` int(11) DEFAULT NULL,
  `countryId` int(11) DEFAULT NULL,
  `isInstructor` tinyint(1) DEFAULT NULL,
  `emailConfirmed` tinyint(1) DEFAULT NULL,
  `emailConfirmedOn` datetime DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT NULL,
  `hasAcceptedTnC` tinyint(1) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `updatedOn` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`id`, `name`, `firstName`, `middleName`, `lastName`, `email`, `hashedPassword`, `image`, `role`, `gender`, `dob`, `timezoneId`, `countryId`, `isInstructor`, `emailConfirmed`, `emailConfirmedOn`, `isActive`, `hasAcceptedTnC`, `createdOn`, `updatedOn`) VALUES
('834c71e6-faad-11ef-a4ea-0242ac110002', 'Sarah Johnson', NULL, NULL, NULL, 'sarah.j@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4WAYiHwmi6', '/images/advisor/advisor1.jpg', 'Instructor', 'Female', NULL, NULL, NULL, 1, 1, '2025-07-10 06:44:26', 1, NULL, '2025-07-10 06:44:26', '2025-07-10 06:44:26'),
('834c92b2-faad-11ef-a4ea-0242ac110002', 'Michael Chen', NULL, NULL, NULL, 'michael.c@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4WAYiHwmi6', '/images/advisor/advisor2.jpg', 'Instructor', 'Male', NULL, NULL, NULL, 1, 1, '2025-07-10 06:44:26', 1, NULL, '2025-07-10 06:44:26', '2025-07-10 06:44:26'),
('834c9580-faad-11ef-a4ea-0242ac110002', 'Emma Wilson', NULL, NULL, NULL, 'emma.w@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4WAYiHwmi6', '/images/advisor/advisor3.jpg', 'Instructor', 'Female', NULL, NULL, NULL, 1, 1, '2025-07-10 06:44:26', 1, NULL, '2025-07-10 06:44:26', '2025-07-10 06:44:26'),
('834c9868-faad-11ef-a4ea-0242ac110002', 'David Brown', NULL, NULL, NULL, 'david.b@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4WAYiHwmi6', '/images/advisor/advisor4.jpg', 'Instructor', 'Male', NULL, NULL, NULL, 1, 1, '2025-07-10 06:44:26', 1, NULL, '2025-07-10 06:44:26', '2025-07-10 06:44:26'),
('834c99a5-faad-11ef-a4ea-0242ac110002', 'Maria Garcia', NULL, NULL, NULL, 'maria.g@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4WAYiHwmi6', '/images/advisor/advisor5.jpg', 'Instructor', 'Female', NULL, NULL, NULL, 1, 1, '2025-07-10 06:44:26', 1, NULL, '2025-07-10 06:44:26', '2025-07-10 06:44:26'),
('f1a6f2ff-5d50-11f0-ab02-000af7df17d6', 'TGCR Admininistrator', 'Admin', '', 'Admin', 'admin@tgcr.net', '$2b$12$7YoSmFmfs7xqSKkB//U/Y.k2xOok6UZTGNaA6xDaLJfw.9oMuBkKq', 'https://lh3.googleusercontent.com/-inz6JHpHgS4/AAAAAAAAAAI/AAAAAAAAAAA/ALKGfkn0BF0l6D9dN0XqJtUCC_PyAc9i9Q/photo.jpg', 'Admin', 'Male', '1977-12-25 12:00:00', 1, 1, 1, 1, '2025-07-10 06:44:26', 1, 1, '2025-07-10 06:44:26', '2025-07-10 06:44:26'),
('f1aa672b-5d50-11f0-ab02-000af7df17d6', 'Yoo Honeysingh', NULL, NULL, NULL, 'tgcr.net@gmail.com', '$2b$12$kERK.Uxb3nHHxlFB0iMlnuq5omFj6362gJyyY07193jH.1TcP7s9G', 'https://res.cloudinary.com/dev-empty/image/upload/v1712139903/typ3uhxza7v9wv5w48ch.jpg', 'Admin', 'Male', NULL, NULL, NULL, 0, 0, NULL, 1, NULL, '2025-07-10 06:44:26', '2025-07-10 06:44:26'),
('f1abddea-5d50-11f0-ab02-000af7df17d6', 'John Smith', NULL, NULL, NULL, 'john.s@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4WAYiHwmi6', '/images/user1.jpg', 'Student', 'Male', NULL, NULL, NULL, 0, 1, '2025-07-10 06:44:26', 1, NULL, '2025-07-10 06:44:26', '2025-07-10 06:44:26'),
('f1abde79-5d50-11f0-ab02-000af7df17d6', 'Lisa Wang', NULL, NULL, NULL, 'lisa.w@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4WAYiHwmi6', '/images/user2.jpg', 'Student', 'Female', NULL, NULL, NULL, 0, 1, '2025-07-10 06:44:26', 1, NULL, '2025-07-10 06:44:26', '2025-07-10 06:44:26'),
('f1abdee0-5d50-11f0-ab02-000af7df17d6', 'James Wilson', NULL, NULL, NULL, 'james.w@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4WAYiHwmi6', '/images/user3.jpg', 'Student', 'Male', NULL, NULL, NULL, 0, 1, '2025-07-10 06:44:26', 1, NULL, '2025-07-10 06:44:26', '2025-07-10 06:44:26'),
('f1abdf47-5d50-11f0-ab02-000af7df17d6', 'Sofia Rodriguez', NULL, NULL, NULL, 'sofia.r@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4WAYiHwmi6', '/images/user4.jpg', 'Student', 'Female', NULL, NULL, NULL, 0, 1, '2025-07-10 06:44:26', 1, NULL, '2025-07-10 06:44:26', '2025-07-10 06:44:26'),
('f1abdfaf-5d50-11f0-ab02-000af7df17d6', 'Tom Miller', NULL, NULL, NULL, 'tom.m@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4WAYiHwmi6', '/images/user5.jpg', 'Student', 'Male', NULL, NULL, NULL, 0, 1, '2025-07-10 06:44:26', 1, NULL, '2025-07-10 06:44:26', '2025-07-10 06:44:26');

-- --------------------------------------------------------

--
-- Table structure for table `usereducationalboard`
--

CREATE TABLE `usereducationalboard` (
  `id` int(11) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `educationalBoardId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usereducationalqualification`
--

CREATE TABLE `usereducationalqualification` (
  `id` int(11) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `educationalQualificationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `userexperiencelevel`
--

CREATE TABLE `userexperiencelevel` (
  `id` int(11) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `experienceLevelId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `video`
--

CREATE TABLE `video` (
  `id` int(11) NOT NULL,
  `courseId` int(11) NOT NULL,
  `groupName` varchar(100) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `thumbImage` varchar(500) DEFAULT NULL,
  `videoUrl` varchar(500) DEFAULT NULL,
  `videoLength` varchar(20) DEFAULT NULL,
  `isPreview` tinyint(1) DEFAULT NULL,
  `shortId` int(11) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `updatedOn` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `video`
--

INSERT INTO `video` (`id`, `courseId`, `groupName`, `title`, `thumbImage`, `videoUrl`, `videoLength`, `isPreview`, `shortId`, `createdOn`, `updatedOn`) VALUES
(1, 1, 'Introduction', 'How to setup computer?', 'https://res.cloudinary.com/dev-empty/image/upload/v1710652579/rvlhltiuwjvfr9lx13vx.jpg', 'https://res.cloudinary.com/dev-empty/video/upload/v1710652558/xatwghyrdowx7wm1ewt2.mp4', '00:00:08', 1, 1, '2024-03-17 05:16:59', '2024-03-17 05:16:59'),
(8, 1, 'Introduction', 'Setep 1', 'https://res.cloudinary.com/dev-empty/image/upload/v1710652579/rvlhltiuwjvfr9lx13vx.jpg', 'https://res.cloudinary.com/dev-empty/video/upload/v1710652558/xatwghyrdowx7wm1ewt2.mp4', '00:00:08', 0, 3, '2024-03-17 05:16:59', '2024-03-17 05:16:59'),
(9, 1, 'Introduction', 'Setep 2', 'https://res.cloudinary.com/dev-empty/image/upload/v1710652579/rvlhltiuwjvfr9lx13vx.jpg', 'https://res.cloudinary.com/dev-empty/video/upload/v1710652558/xatwghyrdowx7wm1ewt2.mp4', '00:00:08', 1, 5, '2024-03-17 05:16:59', '2024-03-17 05:16:59'),
(10, 1, 'Introduction', 'Setep 3', 'https://res.cloudinary.com/dev-empty/image/upload/v1710652579/rvlhltiuwjvfr9lx13vx.jpg', 'https://res.cloudinary.com/dev-empty/video/upload/v1710652558/xatwghyrdowx7wm1ewt2.mp4', '00:00:08', 1, 2, '2024-03-17 05:16:59', '2024-03-17 05:16:59'),
(11, 1, 'Introduction', 'Setep 4', 'https://res.cloudinary.com/dev-empty/image/upload/v1710652579/rvlhltiuwjvfr9lx13vx.jpg', 'https://res.cloudinary.com/colbycloud-next-cloudinary/video/upload/q_auto/f_auto:video/v1/videos/mountain-stars?_s=vp-1.10.6', '00:00:08', 1, 10, '2024-03-17 05:16:59', '2024-03-17 05:16:59'),
(12, 2, 'Phase 1', 'Introduction', 'https://res.cloudinary.com/dev-empty/image/upload/v1713237409/o3rjz4nxiu9xzj5i3qat.jpg', 'https://res.cloudinary.com/dev-empty/video/upload/v1713237433/wvo6bepjgkg5nsgwz9bm.mp4', '00:00:08', 1, 0, '2024-04-16 03:17:27', '2024-04-16 03:17:27'),
(13, 2, 'Phase 1', 'Setup Environment', 'https://res.cloudinary.com/dev-empty/image/upload/v1713237525/srrnamqv1vqsgrq8buhz.jpg', 'https://res.cloudinary.com/dev-empty/video/upload/v1713237494/gud1w1cimli7yf23glgb.mp4', '00:00:25', 0, 1, '2024-04-16 03:20:53', '2024-04-16 03:20:53'),
(14, 6, 'Introduction', 'Introduction', 'https://res.cloudinary.com/dev-empty/image/upload/v1713248339/j1xmqfob3bmrvifyotno.jpg', 'https://res.cloudinary.com/dev-empty/video/upload/v1713248349/exuhwhbteencg7etqbl5.mp4', '00:00:10', 1, 0, '2024-04-16 06:19:19', '2024-04-16 06:19:19'),
(15, 6, 'Introduction', 'Technical Analysis', 'https://res.cloudinary.com/dev-empty/image/upload/v1713248421/wendd6igfdg6spinol2c.jpg', 'https://res.cloudinary.com/dev-empty/video/upload/v1713248398/fxuf781bz1smwrqr6hbh.mp4', '00:00:20', 0, 1, '2024-04-16 06:20:27', '2024-04-16 06:20:27'),
(16, 4, 'Introduction', 'Introduction', 'https://res.cloudinary.com/dev-empty/image/upload/v1713248471/swf357os32qf0nywkk4o.jpg', 'https://res.cloudinary.com/dev-empty/video/upload/v1713248486/i4gtg3jtg3zq4eefonp3.mp4', '00:00:06', 1, 0, '2024-04-16 06:21:33', '2024-04-16 06:21:33'),
(17, 5, 'Introduction', 'Introduction', 'https://res.cloudinary.com/dev-empty/image/upload/v1713248554/remidjexilj2nmucpdt0.jpg', 'https://res.cloudinary.com/dev-empty/video/upload/v1713248526/qg2tcp96vytoisg8mfpr.mp4', '00:00:10', 0, 1, '2024-04-16 06:22:40', '2024-04-16 06:22:40'),
(18, 3, 'Introduction', 'Introduction', 'https://res.cloudinary.com/dev-empty/image/upload/v1713248577/hcvbbktracmft2z4s0rh.jpg', 'https://res.cloudinary.com/dev-empty/video/upload/v1713248587/rtmsqdcyxvgn61u8nybf.mp4', '00:00:19', 1, 1, '2024-04-16 06:23:15', '2024-04-16 06:23:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Account_provider_providerAccountId_key` (`provider`,`providerAccountId`),
  ADD KEY `Account_userId_idx` (`userId`);

--
-- Indexes for table `asset`
--
ALTER TABLE `asset`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Asset_courseId_fkey` (`courseId`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `classlevel`
--
ALTER TABLE `classlevel`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ClassLevel_name_key` (`name`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupon`
--
ALTER TABLE `coupon`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Course_catId_fkey` (`catId`),
  ADD KEY `Course_userId_fkey` (`userId`);

--
-- Indexes for table `earning`
--
ALTER TABLE `earning`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Earning_courseId_userId_idx` (`courseId`,`userId`);

--
-- Indexes for table `educationalboard`
--
ALTER TABLE `educationalboard`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `EducationalBoard_name_key` (`name`);

--
-- Indexes for table `educationalqualification`
--
ALTER TABLE `educationalqualification`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `EducationalQualification_name_key` (`name`);

--
-- Indexes for table `enrolment`
--
ALTER TABLE `enrolment`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Enrolment_orderNumber_key` (`orderNumber`),
  ADD KEY `Enrolment_courseId_userId_idx` (`courseId`,`userId`);

--
-- Indexes for table `experiencelevel`
--
ALTER TABLE `experiencelevel`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ExperienceLevel_name_key` (`name`);

--
-- Indexes for table `favourite`
--
ALTER TABLE `favourite`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Favourite_courseId_userId_idx` (`courseId`,`userId`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedbackattribute`
--
ALTER TABLE `feedbackattribute`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedbackdetail`
--
ALTER TABLE `feedbackdetail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FeedbackDetail_feedbackId_fkey` (`feedbackId`);

--
-- Indexes for table `instructionmedium`
--
ALTER TABLE `instructionmedium`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `InstructionMedium_name_key` (`name`);

--
-- Indexes for table `instructoravailability`
--
ALTER TABLE `instructoravailability`
  ADD PRIMARY KEY (`id`),
  ADD KEY `InstructorAvailability_userId_idx` (`userId`);

--
-- Indexes for table `instructoravailabilityexceptions`
--
ALTER TABLE `instructoravailabilityexceptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `lesson`
--
ALTER TABLE `lesson`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lessonRequestId` (`lessonRequestId`);

--
-- Indexes for table `lessonrequest`
--
ALTER TABLE `lessonrequest`
  ADD PRIMARY KEY (`id`),
  ADD KEY `instructorId` (`instructorId`),
  ADD KEY `studentId` (`studentId`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `partner`
--
ALTER TABLE `partner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lessonRequestId` (`lessonRequestId`);

--
-- Indexes for table `Profile`
--
ALTER TABLE `Profile`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Profile_userId_fkey` (`userId`);

--
-- Indexes for table `progress`
--
ALTER TABLE `progress`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Progress_courseId_fkey` (`courseId`),
  ADD KEY `Progress_videoId_fkey` (`videoId`),
  ADD KEY `Progress_userId_fkey` (`userId`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Review_userId_courseId_idx` (`userId`,`courseId`),
  ADD KEY `Review_courseId_fkey` (`courseId`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Subject_name_key` (`name`);

--
-- Indexes for table `subscription`
--
ALTER TABLE `subscription`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Subscription_email_key` (`email`);

--
-- Indexes for table `teacherclasslevelcost`
--
ALTER TABLE `teacherclasslevelcost`
  ADD PRIMARY KEY (`id`),
  ADD KEY `classLevelId` (`classLevelId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `testimonial`
--
ALTER TABLE `testimonial`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `timezone`
--
ALTER TABLE `timezone`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Timezone_name_key` (`name`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `timezoneId` (`timezoneId`),
  ADD KEY `countryId` (`countryId`);

--
-- Indexes for table `usereducationalboard`
--
ALTER TABLE `usereducationalboard`
  ADD PRIMARY KEY (`id`),
  ADD KEY `educationalBoardId` (`educationalBoardId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `usereducationalqualification`
--
ALTER TABLE `usereducationalqualification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `educationalQualificationId` (`educationalQualificationId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `userexperiencelevel`
--
ALTER TABLE `userexperiencelevel`
  ADD PRIMARY KEY (`id`),
  ADD KEY `experienceLevelId` (`experienceLevelId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `video`
--
ALTER TABLE `video`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Video_courseId_fkey` (`courseId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `classlevel`
--
ALTER TABLE `classlevel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `earning`
--
ALTER TABLE `earning`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `educationalboard`
--
ALTER TABLE `educationalboard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `educationalqualification`
--
ALTER TABLE `educationalqualification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `enrolment`
--
ALTER TABLE `enrolment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `experiencelevel`
--
ALTER TABLE `experiencelevel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `favourite`
--
ALTER TABLE `favourite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `feedbackattribute`
--
ALTER TABLE `feedbackattribute`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `feedbackdetail`
--
ALTER TABLE `feedbackdetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `instructionmedium`
--
ALTER TABLE `instructionmedium`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `instructoravailability`
--
ALTER TABLE `instructoravailability`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `instructoravailabilityexceptions`
--
ALTER TABLE `instructoravailabilityexceptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lesson`
--
ALTER TABLE `lesson`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `subscription`
--
ALTER TABLE `subscription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `teacherclasslevelcost`
--
ALTER TABLE `teacherclasslevelcost`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `timezone`
--
ALTER TABLE `timezone`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `usereducationalboard`
--
ALTER TABLE `usereducationalboard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usereducationalqualification`
--
ALTER TABLE `usereducationalqualification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `userexperiencelevel`
--
ALTER TABLE `userexperiencelevel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `asset`
--
ALTER TABLE `asset`
  ADD CONSTRAINT `Asset_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `Course_catId_fkey` FOREIGN KEY (`catId`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Course_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `favourite`
--
ALTER TABLE `favourite`
  ADD CONSTRAINT `Favourite_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `feedbackdetail`
--
ALTER TABLE `feedbackdetail`
  ADD CONSTRAINT `FeedbackDetail_feedbackId_fkey` FOREIGN KEY (`feedbackId`) REFERENCES `feedback` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `Profile`
--
ALTER TABLE `Profile`
  ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `progress`
--
ALTER TABLE `progress`
  ADD CONSTRAINT `Progress_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Progress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Progress_videoId_fkey` FOREIGN KEY (`videoId`) REFERENCES `video` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `Review_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `User`
--
ALTER TABLE `User`
  ADD CONSTRAINT `User_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `country` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `User_ibfk_1` FOREIGN KEY (`timezoneId`) REFERENCES `timezone` (`id`),
  ADD CONSTRAINT `User_ibfk_2` FOREIGN KEY (`countryId`) REFERENCES `country` (`id`),
  ADD CONSTRAINT `User_timezoneId_fkey` FOREIGN KEY (`timezoneId`) REFERENCES `timezone` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `video`
--
ALTER TABLE `video`
  ADD CONSTRAINT `Video_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

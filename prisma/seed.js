const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
	// ClassLevel
	await prisma.classLevel.createMany({
		data: [
			{ id: 1, name: "Trial Class", position: 0 },
			{ id: 2, name: "Lower Primary (Age: 6 - 8)", position: 1 },
			{ id: 3, name: "Upper Primary (Age: 8 - 12)", position: 2 },
			{ id: 4, name: "Lower Secondary (Age: 12 - 15)", position: 3 },
			{ id: 5, name: "Upper Secondary (Age: 15 - 18)", position: 4 },
			{ id: 6, name: "Higher Education (Age: 18 +)", position: 5 },
		],
		skipDuplicates: true,
	});

	// Subject
	await prisma.subject.createMany({
		data: [
			{ id: 1, name: "Mathematics", position: 1 },
			{ id: 2, name: "Physics", position: 2 },
			{ id: 3, name: "Chemistry", position: 3 },
			{ id: 4, name: "Biology", position: 4 },
			{ id: 5, name: "Economics", position: 5 },
			{ id: 6, name: "English Language Acquisition", position: 6 },
			{ id: 7, name: "English Language and Literature", position: 7 },
			{ id: 8, name: "Others", position: 8 },
		],
		skipDuplicates: true,
	});

	// InstructionMedium
	await prisma.instructionMedium.createMany({
		data: [
			{ id: 1, name: "English", position: 1 },
			{ id: 2, name: "Hindi", position: 2 },
			{ id: 3, name: "Dutch", position: 3 },
		],
		skipDuplicates: true,
	});

	// EducationalQualification
	await prisma.educationalQualification.createMany({
		data: [
			{ id: 1, name: "Doctorate or Higher / PHD", position: 1 },
			{ id: 2, name: "Master’s Degree / PG", position: 2 },
			{ id: 3, name: "Bachelor’s Degree / UG", position: 3 },
			{ id: 4, name: "General Education Diploma", position: 4 },
			{ id: 5, name: "Secondary Education / High School", position: 5 },
		],
		skipDuplicates: true,
	});

	// ExperienceLevel
	await prisma.experienceLevel.createMany({
		data: [
			{ id: 1, name: "0-4 years", position: 1 },
			{ id: 2, name: "5-10 years", position: 2 },
			{ id: 3, name: "11-15 years", position: 3 },
			{ id: 4, name: "15 years and above", position: 4 },
		],
		skipDuplicates: true,
	});

	// Timezone
	await prisma.timezone.createMany({
		data: [
			{
				id: 1,
				name: "Pacific Standard Time",
				code: "PST",
				tzIdentifier: "America/Los_Angeles",
				tzAbbreviation: "PST",
				utcOffset: "-08:00",
				position: 1,
			},
			{
				id: 2,
				name: "Mountain Standard Time",
				code: "MST",
				tzIdentifier: "America/Denver",
				tzAbbreviation: "MST",
				utcOffset: "-07:00",
				position: 2,
			},
			{
				id: 3,
				name: "Eastern Standard Time",
				code: "EST",
				tzIdentifier: "America/New_York",
				tzAbbreviation: "EST",
				utcOffset: "-05:00",
				position: 3,
			},
			{
				id: 4,
				name: "Central Standard Time",
				code: "CST",
				tzIdentifier: "America/Chicago",
				tzAbbreviation: "CST",
				utcOffset: "-06:00",
				position: 4,
			},
			{
				id: 5,
				name: "Atlantic Standard Time",
				code: "AST",
				tzIdentifier: "America/Halifax",
				tzAbbreviation: "AST",
				utcOffset: "-04:00",
				position: 5,
			},
			{
				id: 6,
				name: "Greenwich Mean Time",
				code: "GMT",
				tzIdentifier: "Europe/London",
				tzAbbreviation: "GMT",
				utcOffset: "+00:00",
				position: 6,
			},
			{
				id: 7,
				name: "Central European Time",
				code: "CET",
				tzIdentifier: "Europe/Amsterdam",
				tzAbbreviation: "CET",
				utcOffset: "+01:00",
				position: 7,
			},
			{
				id: 8,
				name: "Indian Standard Time",
				code: "IST",
				tzIdentifier: "Asia/Calcutta",
				tzAbbreviation: "IST",
				utcOffset: "+05:30",
				position: 8,
			},
			{
				id: 9,
				name: "Australian Eastern Standard Time",
				code: "AEST",
				tzIdentifier: "Australia/Sydney",
				tzAbbreviation: "AEST",
				utcOffset: "+10:00",
				position: 9,
			},
		],
		skipDuplicates: true,
	});

	// Country
	await prisma.country.createMany({
		data: [
			{
				id: 1,
				iso2Code: "US",
				name: "United States",
				region: "North America",
				dialCode: "+1",
				position: 0,
			},
			{
				id: 2,
				iso2Code: "CA",
				name: "Canada",
				region: "North America",
				dialCode: "+1",
				position: 0,
			},
			{
				id: 3,
				iso2Code: "GB",
				name: "United Kingdom",
				region: "Europe",
				dialCode: "+44",
				position: 0,
			},
			{
				id: 4,
				iso2Code: "NL",
				name: "Netherlands",
				region: "Europe",
				dialCode: "+31",
				position: 1,
			},
			{ id: 5, iso2Code: "IN", name: "India", region: "Asia", dialCode: "+91", position: 1 },
		],
		skipDuplicates: true,
	});

	// EducationalBoard
	await prisma.educationalBoard.createMany({
		data: [
			{ id: 1, name: "IB", position: 1 },
			{ id: 2, name: "IGCSE", position: 2 },
			{ id: 3, name: "GCSE", position: 3 },
			{ id: 4, name: "CBSE", position: 4 },
			{ id: 5, name: "ICSE", position: 5 },
			{ id: 6, name: "Cambridge", position: 6 },
			{ id: 7, name: "AUS - Australian", position: 7 },
			{ id: 8, name: "British", position: 8 },
			{ id: 9, name: "US", position: 9 },
			{ id: 10, name: "National Curriculum", position: 10 },
			{ id: 11, name: "Others", position: 11 },
		],
		skipDuplicates: true,
	});

	// FeedbackAttribute
	await prisma.feedbackAttribute.createMany({
		data: [
			{ id: 1, name: "Punctuality", key: "PUNC", position: 1 }, // Did the lesson start on time?
			{ id: 2, name: "Tech Issues", key: "TECH", position: 2 }, // Did you experience any tech issues during the lesson?
			{ id: 3, name: "WiFi Issues", key: "WIFI", position: 3 }, // Did you experience any WiFi drops/screen freezes during the lesson?
			{ id: 4, name: "Value for Money", key: "VALU", position: 4 }, // Would you rate your lesson as value for money?
			{ id: 5, name: "Clear Instructions", key: "CLER", position: 5 }, // Were the teacher's instructions clear and easy to follow?
			{ id: 6, name: "Resource and Content Quality", key: "QUAL", position: 6 }, // How do you rate the quality of resources / content used during the lesson?
			{ id: 7, name: "Meet Expectations", key: "MEET", position: 7 }, // Did the lesson meet your expectations?
			{ id: 8, name: "Engaging Lesson", key: "ENGL", position: 8 }, // Did you find your teacher's lesson engaging enough?
			{ id: 9, name: "Teacher's Knowledge", key: "KNOW", position: 9 }, // How do you rate the teacher's knowledge of the subject?
			{ id: 10, name: "Overall Satisfaction", key: "SATS", position: 10 }, // How do you rate the overall quality and satisfaction from your lesson?
		],
		skipDuplicates: true,
	});

	// Add more seed data for other tables as needed...

	// Category
	await prisma.category.createMany({
		data: [
			{
				id: 1,
				name: "Web Development",
				slug: "web-development",
				createdOn: new Date("2024-02-06T07:17:13.567Z"),
				updatedOn: new Date("2024-02-06T07:17:13.567Z"),
			},
			{
				id: 2,
				name: "App Development",
				slug: "app-development",
				createdOn: new Date("2024-02-06T07:17:13.567Z"),
				updatedOn: new Date("2024-02-06T07:17:13.567Z"),
			},
			{
				id: 3,
				name: "Mobile",
				slug: "mobile",
				createdOn: new Date("2024-02-06T07:17:13.567Z"),
				updatedOn: new Date("2024-04-08T05:57:26.764Z"),
			},
			{
				id: 4,
				name: "IT Certifications",
				slug: "it-certifications",
				createdOn: new Date("2024-04-16T03:10:24.787Z"),
				updatedOn: new Date("2024-04-16T03:10:24.787Z"),
			},
			{
				id: 5,
				name: "Finance & Accounting",
				slug: "finance-accounting",
				createdOn: new Date("2024-04-16T06:06:21.447Z"),
				updatedOn: new Date("2024-04-16T06:06:21.447Z"),
			},
			{
				id: 6,
				name: "IT & Software",
				slug: "it-software",
				createdOn: new Date("2024-04-16T06:06:31.926Z"),
				updatedOn: new Date("2024-04-16T06:06:31.926Z"),
			},
			{
				id: 7,
				name: "Office Productivity",
				slug: "office-productivity",
				createdOn: new Date("2024-04-16T06:06:47.686Z"),
				updatedOn: new Date("2024-04-16T06:06:47.686Z"),
			},
			{
				id: 8,
				name: "Personal Development",
				slug: "personal-development",
				createdOn: new Date("2024-04-16T06:07:00.441Z"),
				updatedOn: new Date("2024-04-16T06:07:00.441Z"),
			},
			{
				id: 9,
				name: "Design",
				slug: "design",
				createdOn: new Date("2024-04-16T06:07:10.479Z"),
				updatedOn: new Date("2024-04-16T06:07:10.479Z"),
			},
			{
				id: 10,
				name: "Marketing",
				slug: "marketing",
				createdOn: new Date("2024-04-16T06:07:27.089Z"),
				updatedOn: new Date("2024-04-16T06:07:27.089Z"),
			},
			{
				id: 11,
				name: "Lifestyle",
				slug: "lifestyle",
				createdOn: new Date("2024-04-16T06:07:38.579Z"),
				updatedOn: new Date("2024-04-16T06:07:38.579Z"),
			},
			{
				id: 12,
				name: "Photography & Video",
				slug: "photography-video",
				createdOn: new Date("2024-04-16T06:07:51.034Z"),
				updatedOn: new Date("2024-04-16T06:07:51.034Z"),
			},
			{
				id: 13,
				name: "Health & Fitness",
				slug: "health-fitness",
				createdOn: new Date("2024-04-16T06:08:00.897Z"),
				updatedOn: new Date("2024-04-16T06:08:00.897Z"),
			},
			{
				id: 14,
				name: "Music",
				slug: "music",
				createdOn: new Date("2024-04-16T06:08:10.530Z"),
				updatedOn: new Date("2024-04-16T06:08:10.530Z"),
			},
			{
				id: 15,
				name: "Teaching & Academics",
				slug: "teaching-academics",
				createdOn: new Date("2024-04-16T06:08:22.773Z"),
				updatedOn: new Date("2024-04-16T06:08:22.773Z"),
			},
		],
		skipDuplicates: true,
	});

	// Coupon
	await prisma.coupon.createMany({
		data: [
			{
				id: 3,
				code: "FEB25",
				discount: 25,
				expDate: null,
				status: null,
				deletedOn: null,
				activeForFullSite: false,
				createdOn: new Date("2024-04-08T06:40:48.479Z"),
			},
		],
		skipDuplicates: true,
	});

	// Partner
	await prisma.partner.createMany({
		data: [
			{
				id: 1,
				name: "Google",
				image: "https://res.cloudinary.com/dev-empty/image/upload/v1712471902/mqxx0l2rbohkprp3xzw1.png",
				createdOn: new Date("2024-04-07T06:38:24.141Z"),
				updatedOn: new Date("2024-04-07T06:38:24.141Z"),
			},
			{
				id: 2,
				name: "MS",
				image: "https://res.cloudinary.com/dev-empty/image/upload/v1712471948/llz0bauapvvl5orjrtoz.png",
				createdOn: new Date("2024-04-07T06:39:10.350Z"),
				updatedOn: new Date("2024-04-07T06:39:10.350Z"),
			},
			{
				id: 3,
				name: "Apple",
				image: "https://res.cloudinary.com/dev-empty/image/upload/v1712471962/liykku9qtakwl4nu199g.png",
				createdOn: new Date("2024-04-07T06:39:24.023Z"),
				updatedOn: new Date("2024-04-07T06:39:24.023Z"),
			},
			{
				id: 4,
				name: "Everlane",
				image: "https://res.cloudinary.com/dev-empty/image/upload/v1713248699/lerclugqsfzslxxjbg4j.png",
				createdOn: new Date("2024-04-16T06:25:10.564Z"),
				updatedOn: new Date("2024-04-16T06:25:10.564Z"),
			},
			{
				id: 5,
				name: "Pegasus",
				image: "https://res.cloudinary.com/dev-empty/image/upload/v1713248719/rndof0zazfdwacvpwx45.png",
				createdOn: new Date("2024-04-16T06:25:26.673Z"),
				updatedOn: new Date("2024-04-16T06:25:26.673Z"),
			},
			{
				id: 6,
				name: "Comedy",
				image: "https://res.cloudinary.com/dev-empty/image/upload/v1713248735/mjlhsaokpmqi6j7rfnrw.png",
				createdOn: new Date("2024-04-16T06:25:40.444Z"),
				updatedOn: new Date("2024-04-16T06:25:40.444Z"),
			},
		],
		skipDuplicates: true,
	});

	// Testimonial
	await prisma.testimonial.createMany({
		data: [
			{
				id: 1,
				name: "John Berkings",
				image: "https://res.cloudinary.com/dev-empty/image/upload/v1712478054/lj5qjro9mgaezlsubgrx.jpg",
				bioTitle: "Angular CEO",
				description:
					"Syntho Laboratories Ltd is the best Pharmaceutical manufacturer company in Bangladesh. We are leading pharmaceutical and medicine manufacturer company in ..",
				createdOn: new Date("2024-04-07T08:21:31.106Z"),
				updatedOn: new Date("2024-04-07T08:45:41.630Z"),
			},
			{
				id: 3,
				name: "Mobile",
				image: "https://res.cloudinary.com/dev-empty/image/upload/v1712478054/lj5qjro9mgaezlsubgrx.jpg",
				bioTitle: "Angular CEO",
				description:
					"Syntho Laboratories Ltd is the best Pharmaceutical manufacturer company in Bangladesh. We are leading pharmaceutical and medicine manufacturer company in ..",
				createdOn: new Date("2024-04-07T08:21:31.106Z"),
				updatedOn: new Date("2024-04-08T05:56:27.138Z"),
			},
		],
		skipDuplicates: true,
	});

	// Course
	await prisma.course.createMany({
		data: [
			{
				id: 1,
				userId: "834c71e6-faad-11ef-a4ea-0242ac110002",
				catId: 3,
				title: "The Complete Python Bootcamp",
				slug: "the-complete-python-bootcamp",
				overview: `<p><strong>Become a Python Programmer and learn one of the employer's most requested skills of 2023!</strong></p><p>This is the&nbsp;<strong>most comprehensive, yet straightforward, course for the Python programming language on Udemy!</strong>&nbsp;Whether you have never programmed before, already know basic syntax, or want to learn about the advanced features of Python, this course is for you! In this course we will&nbsp;<strong>teach you Python 3.</strong></p><p>With&nbsp;<strong>over 100 lectures</strong>&nbsp;and more than 21 hours of video, this comprehensive course leaves no stone unturned! This course includes quizzes, tests, coding exercises and homework assignments as well as 3 major projects to create a Python project portfolio!</p><p><strong>Learn how to use Python for real-world tasks, such as working with PDF Files, sending emails, reading Excel files, Scraping websites for pieces of information, working with image files, and much more!</strong></p><p>This course will practically teach you Python, with every lecture comes a full coding screencast and a corresponding code notebook! Learn in whatever manner is best for you!</p><p>We will start by helping you get Python installed on your computer, regardless of your operating system, whether its Linux, MacOS, or Windows, we've got you covered.</p>`,
				regular_price: 100,
				before_price: 199,
				is_free: false,
				lessons: "156",
				duration: "22 hours on-demand video",
				image: "https://res.cloudinary.com/dev-empty/image/upload/v1710662546/cbkssvalvathuerbtktl.jpg",
				access_time: "Lifetime",
				requirements:
					"<ul><li>Access to a computer with an internet connection.</li><li>step 2 repeat<sup>tm</sup></li></ul>",
				what_you_will_learn: `<ul><li>You will learn how to leverage the power of Python to solve tasks.</li><li>You will build games and programs that use Python libraries.</li><li>You will be able to use Python for your work problems or personal projects.</li><li>You will create a portfolio of Python-based projects you can share.</li><li>Learn to use Python professionally, learning both Python 2 and Python 3!</li><li>Create games with Python, like Tic Tac Toe and Blackjack!</li><li>Learn advanced Python features, like the collections module, and how to work with timestamps!</li><li>Learn to use Object Oriented Programming with classes!</li><li>Understand complex topics, like decorators.</li><li>Understand how to use both the Jupyter Notebook and create .py files</li><li>Get an understanding of how to create GUIs in the Jupyter Notebook system!</li></ul>`,
				who_is_this_course_for: `<ul><li>Beginners who have never programmed before.</li><li>Programmers switching languages to Python.</li><li>Intermediate Python programmers who want to level up their skills!</li></ul>`,
				approved: true,
				in_home_page: true,
				is_class: false,
				createdOn: new Date("2024-03-11T18:12:03.503Z"),
				updatedOn: new Date("2024-03-20T07:09:13.839Z"),
			},
		],
		skipDuplicates: true,
	});

	// User
	await prisma.user.createMany({
		data: [
			{
				id: "b1e1e1e1-0000-0000-0000-000000000001",
				name: "Yoo Honeysingh",
				email: "tgcr.net@gmail.com",
				hashedPassword: "$2b$12$kERK.Uxb3nHHxlFB0iMlnuq5omFj6362gJyyY07193jH.1TcP7s9G",
				image: "https://res.cloudinary.com/dev-empty/image/upload/v1712139903/typ3uhxza7v9wv5w48ch.jpg",
				role: "Admin",
				gender: "Male",
				isInstructor: false,
				emailConfirmed: false,
				emailConfirmedOn: null,
				isActive: true,
				createdOn: new Date(),
				updatedOn: new Date(),
			},
			// Instructors
			{
				id: "834c71e6-faad-11ef-a4ea-0242ac110002",
				name: "Sarah Johnson",
				email: "sarah.j@example.com",
				hashedPassword: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4WAYiHwmi6",
				image: "/images/advisor/advisor1.jpg",
				role: "Instructor",
				gender: "Female",
				isInstructor: true,
				emailConfirmed: true,
				emailConfirmedOn: new Date(),
				isActive: true,
				createdOn: new Date(),
				updatedOn: new Date(),
			},
			{
				id: "834c92b2-faad-11ef-a4ea-0242ac110002",
				name: "Michael Chen",
				email: "michael.c@example.com",
				hashedPassword: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4WAYiHwmi6",
				image: "/images/advisor/advisor2.jpg",
				role: "Instructor",
				gender: "Male",
				isInstructor: true,
				emailConfirmed: true,
				emailConfirmedOn: new Date(),
				isActive: true,
				createdOn: new Date(),
				updatedOn: new Date(),
			},
			{
				id: "834c9580-faad-11ef-a4ea-0242ac110002",
				name: "Emma Wilson",
				email: "emma.w@example.com",
				hashedPassword: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4WAYiHwmi6",
				image: "/images/advisor/advisor3.jpg",
				role: "Instructor",
				gender: "Female",
				isInstructor: true,
				emailConfirmed: true,
				emailConfirmedOn: new Date(),
				isActive: true,
				createdOn: new Date(),
				updatedOn: new Date(),
			},
			{
				id: "834c9868-faad-11ef-a4ea-0242ac110002",
				name: "David Brown",
				email: "david.b@example.com",
				hashedPassword: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4WAYiHwmi6",
				image: "/images/advisor/advisor4.jpg",
				role: "Instructor",
				gender: "Male",
				isInstructor: true,
				emailConfirmed: true,
				emailConfirmedOn: new Date(),
				isActive: true,
				createdOn: new Date(),
				updatedOn: new Date(),
			},
			{
				id: "834c99a5-faad-11ef-a4ea-0242ac110002",
				name: "Maria Garcia",
				email: "maria.g@example.com",
				hashedPassword: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4WAYiHwmi6",
				image: "/images/advisor/advisor5.jpg",
				role: "Instructor",
				gender: "Female",
				isInstructor: true,
				emailConfirmed: true,
				emailConfirmedOn: new Date(),
				isActive: true,
				createdOn: new Date(),
				updatedOn: new Date(),
			},
			// Students
			{
				id: "b1e1e1e1-0000-0000-0000-000000000002",
				name: "John Smith",
				email: "john.s@example.com",
				hashedPassword: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4WAYiHwmi6",
				image: "/images/user1.jpg",
				role: "Student",
				gender: "Male",
				isInstructor: false,
				emailConfirmed: true,
				emailConfirmedOn: new Date(),
				isActive: true,
				createdOn: new Date(),
				updatedOn: new Date(),
			},
			{
				id: "b1e1e1e1-0000-0000-0000-000000000003",
				name: "Lisa Wang",
				email: "lisa.w@example.com",
				hashedPassword: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4WAYiHwmi6",
				image: "/images/user2.jpg",
				role: "Student",
				gender: "Female",
				isInstructor: false,
				emailConfirmed: true,
				emailConfirmedOn: new Date(),
				isActive: true,
				createdOn: new Date(),
				updatedOn: new Date(),
			},
			{
				id: "b1e1e1e1-0000-0000-0000-000000000004",
				name: "James Wilson",
				email: "james.w@example.com",
				hashedPassword: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4WAYiHwmi6",
				image: "/images/user3.jpg",
				role: "Student",
				gender: "Male",
				isInstructor: false,
				emailConfirmed: true,
				emailConfirmedOn: new Date(),
				isActive: true,
				createdOn: new Date(),
				updatedOn: new Date(),
			},
			{
				id: "b1e1e1e1-0000-0000-0000-000000000005",
				name: "Sofia Rodriguez",
				email: "sofia.r@example.com",
				hashedPassword: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4WAYiHwmi6",
				image: "/images/user4.jpg",
				role: "Student",
				gender: "Female",
				isInstructor: false,
				emailConfirmed: true,
				emailConfirmedOn: new Date(),
				isActive: true,
				createdOn: new Date(),
				updatedOn: new Date(),
			},
			{
				id: "b1e1e1e1-0000-0000-0000-000000000006",
				name: "Tom Miller",
				email: "tom.m@example.com",
				hashedPassword: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4WAYiHwmi6",
				image: "/images/user5.jpg",
				role: "Student",
				gender: "Male",
				isInstructor: false,
				emailConfirmed: true,
				emailConfirmedOn: new Date(),
				isActive: true,
				createdOn: new Date(),
				updatedOn: new Date(),
			},
		],
		skipDuplicates: true,
	});

	// Profile
	await prisma.profile.createMany({
		data: [
			{
				id: "c1e1e1e1-0000-0000-0000-000000000001",
				userId: "834c71e6-faad-11ef-a4ea-0242ac110002",
				bioTitle: "Mathematics Professor",
				bio: "Experienced math educator with 10+ years teaching experience",
				phone: "+1234567890",
				website: "www.sarahjohnson.com",
				twitter: "@sarahj_math",
				facebook: "sarahjmath",
				linkedin: "sarahjohnson",
				youtube: "sarahjmath",
				subjects: "Mathematics,Calculus,Algebra",
				updatedOn: new Date(),
			},
			{
				id: "c1e1e1e1-0000-0000-0000-000000000002",
				userId: "834c92b2-faad-11ef-a4ea-0242ac110002",
				bioTitle: "Computer Science Instructor",
				bio: "Software engineer turned educator, specialized in web development",
				phone: "+1234567891",
				website: "www.michaelchen.dev",
				twitter: "@chen_codes",
				facebook: "chentech",
				linkedin: "michaelchen",
				youtube: "chencode",
				subjects: "Programming,Web Development,Python",
				updatedOn: new Date(),
			},
			{
				id: "c1e1e1e1-0000-0000-0000-000000000003",
				userId: "834c9580-faad-11ef-a4ea-0242ac110002",
				bioTitle: "Language Arts Teacher",
				bio: "Passionate about literature and creative writing",
				phone: "+4412345678",
				website: "www.emmawilson.edu",
				twitter: "@emma_writes",
				facebook: "emmawilsonteach",
				linkedin: "emmawilson",
				youtube: "emmateaches",
				subjects: "English,Creative Writing,Literature",
				updatedOn: new Date(),
			},
			{
				id: "c1e1e1e1-0000-0000-0000-000000000004",
				userId: "834c9868-faad-11ef-a4ea-0242ac110002",
				bioTitle: "Physics Professor",
				bio: "PhD in Theoretical Physics with research background",
				phone: "+1234567892",
				website: "www.davidbrown.edu",
				twitter: "@dr_brown",
				facebook: "drbrown",
				linkedin: "davidbrownphysics",
				youtube: "physicswithbrown",
				subjects: "Physics,Quantum Mechanics,Mathematics",
				updatedOn: new Date(),
			},
			{
				id: "c1e1e1e1-0000-0000-0000-000000000005",
				userId: "834c99a5-faad-11ef-a4ea-0242ac110002",
				bioTitle: "Spanish Language Expert",
				bio: "Native Spanish speaker with teaching certification",
				phone: "+3412345678",
				website: "www.mariagarcia.es",
				twitter: "@maria_teaches",
				facebook: "mariagarciateach",
				linkedin: "mariagarcia",
				youtube: "spanishwithmaria",
				subjects: "Spanish,ESL,Language Arts",
				updatedOn: new Date(),
			},
		],
		skipDuplicates: true,
	});

	// Add more seed data for other tables as needed...
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

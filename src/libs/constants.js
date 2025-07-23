// baseURL //////////////////////////////////////////////////////////////////////////////////////////
export const baseUrl =
	typeof window !== "undefined"
		? `${window.location.origin}`
		: process.env.NODE_ENV === "production"
		? "https://tgcr.net"
		: process.env.NODE_ENV === "test"
		? "https://stg.tgcr.net"
		: "https://dev.tgcr.net";
export const baseSiteName = "tGCR | the Global Classroom {addition}";
export const baseS3 =
	process.env.NODE_ENV === "production"
		? "tgcr.net"
		: process.env.NODE_ENV === "test"
		? "stg.tgcr.net"
		: "dev.tgcr.net";
export const baseMailFrom = "tGCR Notifications";

// REGEX //////////////////////////////////////////////////////////////////////////////////////////
export const REGEX_PASSWORD =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
export const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const REGEX_PHONE = /^\+?[0-9]\d{6,15}$/;
export const REGEX_LINKEDIN =
	/^https?:\/\/(www\.)?linkedin\.com\/(in|pub|public-profile\/in|public-profile\/pub)\/[a-zA-Z0-9_-]+\/?$/;
export const REGEX_3WORDS = /^\s*(?:\S+\s+){2,}\S+\s*$/;
export const REGEX_CURRENCY = /^\d+(\.\d{0,2})?$/;

// Constants and Configuration items //////////////////////////////////////////////////////////////////

// Max file size for image uploads (in bytes)
export const PROFILE_PICTURE_MAX_SIZE = 1024 * 1024; // 1 MB
// Words in the bio for teacher's profile
export const PROFILE_BIO_MINWORDS = 20;
export const PROFILE_BIO_MAXSIZE = 4096; // 4 KB as defined in the DB schema
// Max price per lesson for teacher's profile
export const PROFILE_MAX_PRICE = 1000;
// Pagination size on teacher's search page
export const SEARCH_PAGE_SIZE = 10;
// Pagination size on admin grids
export const ADMIN_SPAGE_SIZE = 10;
// Max number of weeks for advance booking of lessons
export const LESSON_BOOKING_MAX_WEEKS = 16;
// Lesson Duration (minutes)
export const LESSON_DURATION_MINUTES = 60;

// Jitsi/JaaS Configuration items ////////////////////////////////////////////////////////////////////
// Domain Name
export const JAAS_DOMAIN = "8x8.vc";
// Maximum number of users allowed in a room
export const JAAS_MAX_USERS = 3;
// Room Reminder Time (minutes)
export const JAAS_ROOM_REMINDER_MINUTES = 60;
// Open all rooms in dev environment
export const JAAS_OPEN_ALL_ROOMS = process.env.NODE_ENV === "development" ? true : false;

// Search query params ///////////////////////////////////////////////////////////////////////////////
export const SEARCH_QPARAMS = {
	SEARCH_KEYWORD: "sk",
	CLASS_LEVEL: "cl",
	PRICE: "pr",
	EDUCATIONAL_BOARD: "eb",
	EDUCATIONAL_QUALI: "eq",
	EXPERIENCE_LEVEL: "el",
	INSTRUCTION_MED: "im",
	SORT_ORDER: "so",
	PAGE: "pg",
};

// Values for LESSON_TYPE querystring ///////////////////////////////////////////////////////////////
export const LESSON_TYPE_QVALUE = {
	Upcoming: "Upcoming",
	Completed: "Completed",
};

// Misc query params ///////////////////////////////////////////////////////////////////////////////
export const MISC_QPARAMS = {
	LESSON_TYPE: "lt",
};

import { authorize } from "@/app/api/auth/[...nextauth]/authOptions";
import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";

// Mock bcrypt
jest.mock("bcrypt", () => ({
	compare: jest.fn(),
}));

// Mock prisma
jest.mock("@/libs/prismadb", () => ({
	user: {
		findUnique: jest.fn(),
	},
}));

// Test scenarios for different credential cases
const scenarios = [
	{
		name: "missing email and password",
		credentials: { email: "", password: "" },
		expectedError: "Missing credentials",
	},
	{
		name: "missing password",
		credentials: { email: "test@example.com" },
		expectedError: "Missing credentials",
	},
	{
		name: "missing email",
		credentials: { password: "password" },
		expectedError: "Missing credentials",
	},
	{
		name: "user not found",
		credentials: { email: "test@example.com", password: "password" },
		mockUser: null,
		expectedError: "Invalid user",
	},
	{
		name: "email not confirmed",
		credentials: { email: "bhallav25@student.com", password: "Pas$w0rd" },
		mockUser: { emailConfirmed: false, isActive: true },
		expectedError:
			"Please verify your email before login. Please check your emailbox for an email from tGCR, and follow the instruction ",
	},
	{
		name: "user not active",
		credentials: { email: "bhallav25@student.com", password: "Pas$w0rd" },
		mockUser: { emailConfirmed: true, isActive: false },
		expectedError:
			"Your account has been disabled. Please get in touch with us to enable your account ",
	},
	{
		name: "incorrect password",
		credentials: { email: "bhallav25@student.com", password: "wrongpass" },
		mockUser: {
			emailConfirmed: true,
			isActive: true,
			hashedPassword: "hashed",
		},
		mockPasswordMatch: false,
		expectedError: "Invalid credentials",
	},
	{
		name: "successful login (rememberMe=false)",
		credentials: {
			email: "bhallav25@student.com",
			password: "Pas$w0rd",
			rememberMe: "false",
		},
		mockUser: {
			id: "user1",
			email: "bhallav25@student.com",
			emailConfirmed: true,
			isActive: true,
			hashedPassword: "hashed",
		},
		mockPasswordMatch: true,
		expectedResult: {
			id: "user1",
			email: "bhallav25@student.com",
			username: "testuser",
			maxAge: 24 * 60 * 60,
		},
	},
	{
		name: "successful login (rememberMe=true)",
		credentials: {
			email: "bhallav25@student.com",
			password: "Pas$w0rd",
			rememberMe: "true",
		},
		mockUser: {
			id: "user1",
			email: "bhallav25@student.com",
			username: "testuser",
			emailConfirmed: true,
			isActive: true,
			hashedPassword: "hashed",
		},
		mockPasswordMatch: true,
		expectedResult: {
			id: "user1",
			email: "bhallav25@student.com",
			username: "testuser",
			maxAge: 30 * 24 * 60 * 60,
		},
	},
];

describe("CredentialsProvider authorize", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	test.each(scenarios)("$name", async (scenario) => {
		// Setup mocks if needed
		if ("mockUser" in scenario) {
			(prisma.user.findUnique as jest.Mock).mockResolvedValue(scenario.mockUser);
		}
		if ("mockPasswordMatch" in scenario) {
			(bcrypt.compare as jest.Mock).mockResolvedValue(scenario.mockPasswordMatch);
		}

		const credentials: Record<"email" | "password" | "rememberMe", string> = {
			email: scenario.credentials.email ?? "",
			password: scenario.credentials.password ?? "",
			rememberMe: scenario.credentials.rememberMe ?? "",
		};

		if (scenario.expectedError) {
			await expect(authorize(credentials, undefined)).rejects.toThrow(scenario.expectedError);
		} else if (scenario.expectedResult) {
			const result = await authorize(credentials, undefined);
			expect(result).toMatchObject(scenario.expectedResult);
		}
	});
});

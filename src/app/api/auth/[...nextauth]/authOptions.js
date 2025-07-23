import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
// REMOVEME: import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { use } from "react";
import { signOut } from "next-auth/react";

const credentialsProvider = CredentialsProvider({
	name: "credentials",
	credentials: {
		email: { label: "email", type: "text" },
		password: { label: "password", type: "password" },
		rememberMe: { label: "Remember Me", type: "boolean" },
	},
	async authorize(credentials) {
		if (!credentials?.email || !credentials?.password) {
			throw new Error("Missing credentials");
		}

		const user = await prisma.user.findUnique({
			where: {
				email: credentials.email,
			},
		});
		if (!user) {
			throw new Error("Invalid user");
		}

		if (!user.emailConfirmed) {
			throw new Error(
				"Please verify your email before login. Please check your emailbox for an email from tGCR, and follow the instruction "
			);
		}
		if (!user.isActive) {
			throw new Error(
				"Your account has been disabled. Please get in touch with us to enable your account "
			);
		}
		const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);
		if (!isCorrectPassword) {
			throw new Error("Invalid credentials");
		}

		const maxAge = credentials.rememberMe === "true" ? 30 * 24 * 60 * 60 : 24 * 60 * 60;
		return { ...user, maxAge };
		//return { id: user["email"], email: user["email"], username: user["username"], maxAge };
	},
});

export const authorize = credentialsProvider.authorize;

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		credentialsProvider,
	],

	pages: {
		signIn: "/auth/login",
		error: "/auth/login",
	},

	debug: process.env.NODE_ENV === "development",

	session: {
		strategy: "jwt",
		maxAge: 24 * 60 * 60, // 1 day by default
	},

	callbacks: {
		async session({ session, token }) {
			if (token) {
				session.user.id = token.sub;
				session.user.username = token["username"];
				session.user.role = token.role;
				session.maxAge = token["maxAge"]; // Use maxAge from token
				session.expires = new Date(Date.now() + session.maxAge * 1000).toISOString();
				return session;
			}
			return session;
		},
		async jwt({ token, user }) {
			if (user) {
				token.sub = user.id;
				token.role = user.role;
				token["username"] = user.username;
				token["maxAge"] = user.maxAge;
			}
			return token;
		},
	},

	// events: {
	// 	async signIn(message) {
	// 		console.log("signIn", message);
	// 		// const rememberMe = localStorage.getItem("rememberMe") === "true";
	// 		// if (rememberMe) {
	// 		// 	// Extend session duration if "Remember Me" is checked
	// 		// 	message.token.expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
	// 		// }
	// 	},
	// 	// async signOut(message) {
	// 	// 	console.log("signOut", message);
	// 	// // Invalidate the token by setting its expiry to the past
	// 	// message.token.expires = new Date(0);
	// 	// },
	// 	// async createUser(message) {
	// 	// 	console.log("createUser", message);
	// 	// },
	// 	// async updateUser(message) {
	// 	// 	console.log("updateUser", message);
	// 	// },
	// 	// async linkAccount(message) {
	// 	// 	console.log("linkAccount", message);
	// 	// },
	// 	// async session(message) {
	// 	// 	console.log("session", message);
	// 	// },
	// 	// async error(message) {
	// 	// 	console.log("error", message);
	// 	// },
	// },

	secret: process.env.NEXTAUTH_SECRET,
};

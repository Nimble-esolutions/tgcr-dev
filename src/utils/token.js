// token generation and verification
// specifically used for email address confirmation
const jwt = require("jsonwebtoken");

export const generateToken = (email) => {
	const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
	return token;
};

export const decodeToken = (token) => {
	try {
		const decoded = jwt.decode(token);
		return decoded ? decoded.email : null;
	} catch (err) {
		return null;
	}
};

export const verifyToken = (token) => {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		return decoded.email;
	} catch (err) {
		return null;
	}
};

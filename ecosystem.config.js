module.exports = {
	apps: [
		{
			name: "tGCR",
			script: "npm",

			// Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
			args: "run start",
			instances: 1,
			exec_mode: "fork",
			autorestart: false,
			watch: false,
			max_memory_restart: "1G",
			env: {
				NODE_ENV: "production",
				PORT: 9991,
			},
		},
	],
};

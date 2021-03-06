module.exports = {
	apps: [
		{
			name: 'TimeBot',
			script: './build/index.js',
			log_date_format: 'HH:mm', // YYYY-MM-DD HH:mm Z
			ignoreWatch: ['node_modules', './log', '.git'],
			watch: true,
			// restart_delay: 200,

			args: ['--color'],
			output: './log/out.log',
			error: './log/error.log',
			log: './log/combined.outerr.log',
		},
	],

	// 	deploy: {
	// 		production: {
	// 			user: "SSH_USERNAME",
	// 			host: "SSH_HOSTMACHINE",
	// 			ref: "origin/master",
	// 			repo: "GIT_REPOSITORY",
	// 			path: "DESTINATION_PATH",
	// 			"pre-deploy-local": "",
	// 			"post-deploy":
	// 				"npm install && pm2 reload ecosystem.config.js --env production",
	// 			"pre-setup": "",
	// 		},
	// 	},
	// };
};

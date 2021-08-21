// pm2 ecosystem file

module.exports = {
	apps: [
		{
			name: 'spencersnyder.io',
			script: './node_modules/.bin/next',
			args: 'start',
			exec_mode: 'cluster',
			instances: 'max',
			env: {
				NODE_ENV: 'development'
			},
			env_production: {
				NODE_ENV: 'production'
			}
		}
	],
	deploy: {
		production: {
			user: 'spencer',
			host: ['spence-s-server-main'],
			ref: 'origin/master',
			repo: 'git@github.com:spence-s/spencersnyder.io',
			path: '/srv/www/spencersnyder.io',
			'pre-deploy': 'git reset --hard',
			'post-deploy':
				'source ~/.zshrc && yarn && yarn build && pm2 startOrRestart ecosystem.config.js --env production'
		}
	}
};

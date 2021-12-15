export const options = {
	detectRetina: true,
	fpsLimit: 90,
	fullScreen: true,
	background: {
		color: '#fff'
	},
	particles: {
		number: {
			value: 15,
			density: { enable: false, value_area: 800 }
		},
		color: {
			value: '#1b1e34'
		},
		shape: {
			type: 'circle',
			stroke: {
				width: 0,
				color: '#000'
			}
		},
		opacity: {
			value: 0.6,
			random: true
		},
		size: {
			value: 160,
			random: true
		},
		move: {
			enable: true,
			speed: 2,
			direction: 'none',
			random: false,
			straight: false,
			out_mode: 'out',
			bounce: false,
			attract: {
				enable: false,
				rotateX: 600,
				rotateY: 1200
			}
		}
	}
};

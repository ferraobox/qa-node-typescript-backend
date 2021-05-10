module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	reporters: [
		'default',
		[
			'jest-html-reporters',
			{
				publicPath: './reports',
				filename: 'the-pet-store-test-results.html',
				expand: true,
			},
		],
	],
};


// ref: https://umijs.org/config/
export default {
	treeShaking: true,
	plugins: [
		// ref: https://umijs.org/plugin/umi-plugin-react.html
		['umi-plugin-react', {
			antd: true,
			dva: false,
			dynamicImport: {
				loadingComponent: './Loading',
				webpackChunkName: true
			},
			title: '抽号机(By liziyi0914)',
			dll: false,

			routes: {
				exclude: [
					/components\//,
				],
			},
		}],
	],
}

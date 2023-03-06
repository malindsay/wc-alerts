import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import serve from "rollup-plugin-serve";
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import image from '@rollup/plugin-image';
import path from 'path';

const production = !process.env.ROLLUP_WATCH;
const PORT = process.env.PORT || 8888;

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/wc-alerts.js'
	},
	plugins: [
		svelte({
			compilerOptions: {
        customElement: true,
				// enable run-time checks when not in production
				dev: !production
			}
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
    image(),
		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve({ 
      verbose: false,
			contentBase: path.resolve(__dirname, './public'),
      historyApiFallback: false,
			host: 'localhost',
      port: PORT,
			headers: {
				'Access-Control-Allow-Origin': '*'
			},
			onListening: function (server) {
				console.log(`Server listening on port ${PORT}`);
			}
    }),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};

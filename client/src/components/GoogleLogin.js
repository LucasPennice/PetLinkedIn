import { FcGoogle } from 'react-icons/fc';
// import { APP_URL, LOGIN_REDIRECT_URL } from '../config/url_config';
import Logo from './Logo';

export default () => {
	const { NODE_ENV } = process.env;
	const envJson = require('../config/env_variables.json');
	const node_env = NODE_ENV || 'development';
	const env_variables = envJson[node_env];
	const { LOGIN_REDIRECT_URL } = env_variables;
	return (
		<div className="google_component_container">
			<div className="login_message">
				<Logo />
				<h2>Find work as a pet</h2>
				<hr />
				<a href={`${LOGIN_REDIRECT_URL}`}>
					<FcGoogle id="FcGoogle" /> Log in
				</a>
			</div>
		</div>
	);
};

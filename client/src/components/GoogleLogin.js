import { FcGoogle } from 'react-icons/fc';
import { APP_URL, LOGIN_REDIRECT_URL } from '../config/url_config';
import Logo from './Logo';

export default () => {
	return (
		<div className="google_component_container">
			<div className="login_message">
				<Logo />
				<h2>Find work as a pet</h2>
				<hr />
				<a href={`${APP_URL}${LOGIN_REDIRECT_URL}`}>
					<FcGoogle id="FcGoogle" /> Log in
				</a>
			</div>
		</div>
	);
};

import { Link } from 'react-router-dom';
// import { NEW_POST_URL } from '../config/url_config';

export default ({ userId }) => {
	const { NODE_ENV } = process.env;
	const envJson = require('../config/env_variables.json');
	const node_env = NODE_ENV || 'development';
	const env_variables = envJson[node_env];
	const { NEW_POST_URL } = env_variables;
	return (
		<div className="form_container">
			<form className="new_work_form" method="POST" action={NEW_POST_URL}>
				<label htmlFor="pet_name">Pet Name *</label>
				<input type="text" id="pet_name" name="pet_name" required />

				<label htmlFor="pet_service">Job *</label>
				<input type="text" id="pet_service" name="service" required />

				<label htmlFor="pet_price">Price *</label>
				<input
					type="number"
					id="pet_price"
					name="price"
					min="0"
					max="9999"
					required
				/>

				<label htmlFor="image_url">Selfie URL</label>
				<input type="text" name="image_url" id="image_url" />

				<label htmlFor="hire_redirect">Social Media URL</label>
				<input type="text" name="hire_redirect" id="hire_redirect" />

				<input type="hidden" value={userId} name="created_by" />

				<button>Create Work</button>
			</form>
			<Link to="/" className="go_back">
				Back
			</Link>
		</div>
	);
};

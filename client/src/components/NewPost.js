import { Link } from 'react-router-dom';
import { NEW_POST_URL } from '../config/url_config';

export default ({ userId }) => {
	return (
		<div className="form_container">
			<form className="new_work_form" method="POST" action={NEW_POST_URL}>
				<label htmlFor="pet_name">Pet Name</label>
				<input type="text" id="pet_name" name="pet_name" required />

				<label htmlFor="pet_service">Service</label>
				<input type="text" id="pet_service" name="service" required />

				<label htmlFor="pet_price">Price</label>
				<input
					type="number"
					id="pet_price"
					name="price"
					min="0"
					max="9999"
					required
				/>

				<label htmlFor="image_url">Pet Pic</label>
				<input type="text" name="image_url" />

				<label htmlFor="hire_redirect">Pet Page</label>
				<input type="text" name="hire_redirect" />

				<input type="hidden" value={userId} name="created_by" />

				<button>Create Work</button>
			</form>
			<Link to="/" className="go_back">
				Back
			</Link>
		</div>
	);
};

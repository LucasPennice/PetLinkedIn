import { Link } from 'react-router-dom';
import { useState } from 'react';
import { EDIT_POST_URL } from '../config/url_config';

export default ({ userId, currentlyEditingPostData }) => {
	let { hire_redirect, image_url, pet_name, service, price, _id } =
		currentlyEditingPostData;
	const [newRedirect, setNewRedirect] = useState(hire_redirect);
	const [newImage, setNewImage] = useState(image_url);
	const [newPetName, setNewPetName] = useState(pet_name);
	const [newService, setNewService] = useState(service);
	const [newPrice, setNewPrice] = useState(price);
	const [deleteButtonClass, setDeleteButtonClass] = useState('delete');
	const [confirmDeleteClass, setConfirmDeleteClass] = useState('hidden');

	return (
		<div className="form_container">
			<form
				className="new_work_form"
				method="POST"
				action={`${EDIT_POST_URL}${_id}?_method=PUT`}
			>
				<label htmlFor="pet_name">Pet Name</label>
				<input
					type="text"
					id="pet_name"
					name="pet_name"
					required
					value={newPetName}
					onChange={(e) => setNewPetName(e.target.value)}
				/>
				<label htmlFor="pet_service">Service</label>
				<input
					type="text"
					id="pet_service"
					name="service"
					required
					value={newService}
					onChange={(e) => setNewService(e.target.value)}
				/>
				<label htmlFor="pet_price">Price</label>
				<input
					type="number"
					id="pet_price"
					name="price"
					min="0"
					max="9999"
					required
					value={newPrice}
					onChange={(e) => setNewPrice(e.target.value)}
				/>
				<label htmlFor="image_url">Pet Pic</label>
				<input
					type="text"
					name="image_url"
					value={newImage}
					onChange={(e) => setNewImage(e.target.value)}
				/>
				<label htmlFor="hire_redirect">Pet Page</label>
				<input
					type="text"
					name="hire_redirect"
					value={newRedirect}
					onChange={(e) => setNewRedirect(e.target.value)}
				/>
				<input type="hidden" defaultValue={userId} name="created_by" />
				<button>Edit Post</button>
			</form>
			<Link to="/" className="go_back">
				Back
			</Link>
			<form method="POST" action={`${EDIT_POST_URL}${_id}?_method=DELETE`}>
				<div className="delete_container">
					<button
						className={deleteButtonClass}
						onClick={(e) => {
							e.preventDefault();
							setConfirmDeleteClass('confirm_delete');
							setDeleteButtonClass('hidden');
						}}
					>
						Delete
					</button>
					<div className={confirmDeleteClass}>
						<a
							href="#"
							onClick={() => {
								setConfirmDeleteClass('hidden');
								setDeleteButtonClass('delete');
							}}
						>
							o
						</a>
						<button>x</button>
					</div>
				</div>
			</form>
		</div>
	);
};

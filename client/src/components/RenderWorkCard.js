import { Link } from 'react-router-dom';

export default ({
	hire_redirect,
	pet_name,
	service,
	price,
	created_by,
	setCurrentlyEditingPostData,
	_id,
	userId,
	image_url,
	pet,
}) => {
	const style = {
		background: `url(${image_url})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
	};
	return (
		<div className="card" key={pet_name}>
			<div className="pet_img" style={style}></div>
			<div className="card_text">
				<h1>
					Name <span>{pet_name}</span>
				</h1>
				<h1>
					Service
					<span>{service}</span>
				</h1>
				<h1>
					Price <span>{price}🦴</span>
				</h1>
			</div>
			{created_by === userId ? (
				<Link
					onClick={() => {
						console.log(pet);
						setCurrentlyEditingPostData(pet);
					}}
					to={`/edit/${_id}`}
					className="edit_btn"
				>
					🖊️
				</Link>
			) : (
				<></>
			)}
			<a href={`${hire_redirect}`} className="card_hire" target="_blank">
				Hire!
			</a>
		</div>
	);
};

import LoadingIcon from './LoadingIcon';
import { Link } from 'react-router-dom';
import { renderPetCards } from '../config/functions';
export default ({ postsArray, userId, setCurrentlyEditingPostData }) => {
	return (
		<div className="main_page_container">
			{postsArray.length !== 0 ? (
				<>
					<div className="main_page_content">
						{renderPetCards(
							postsArray,
							'own',
							userId,
							setCurrentlyEditingPostData
						)}
					</div>
					<Link to="/new" className="add_service">
						Post Work
					</Link>
				</>
			) : (
				<LoadingIcon />
			)}
		</div>
	);
};

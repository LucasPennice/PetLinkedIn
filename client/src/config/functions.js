import RenderWorkCard from '../components/RenderWorkCard';

export const addHttpsToUrl = (url) => {
	let newUrl = '';
	newUrl = url.replace('https://', '');
	newUrl = newUrl.replace('www.', '');
	newUrl = 'https://www.'.concat(newUrl);

	return newUrl;
};

export const renderPetCards = (
	arr,
	renderAll = 'all',
	userId,
	setCurrentlyEditingPostData
) => {
	return arr.map((pet) => {
		let {
			hire_redirect,
			image_url,
			pet_name,
			service,
			price,
			created_by,
			_id,
		} = pet;
		const renderCondition = renderAll === 'own' ? created_by === userId : true;
		hire_redirect = addHttpsToUrl(hire_redirect);
		console.log(hire_redirect);

		if (renderCondition) {
			return (
				<RenderWorkCard
					key={`${pet_name}${service}`}
					pet_name={pet_name}
					image_url={image_url}
					service={service}
					price={price}
					created_by={created_by}
					hire_redirect={hire_redirect}
					_id={_id}
					userId={userId}
					pet={pet}
					setCurrentlyEditingPostData={setCurrentlyEditingPostData}
				/>
			);
		}
	});
};

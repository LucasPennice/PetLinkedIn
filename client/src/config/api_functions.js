import { LOGGED_STATE_URL, USER_INFO_URL, GET_POSTS_URL } from './url_config';
export const getLogInState = async (saveIsUserLogged) => {
	await fetch(LOGGED_STATE_URL)
		.then((res) => res.json())
		.then((userInfo) => {
			saveIsUserLogged(userInfo);
			// console.log(userInfo);
		});
};

export const getUserInfo = async (saveUserInfo) => {
	await fetch(USER_INFO_URL)
		.then((res) => res.json())
		.then((userInfo) => {
			saveUserInfo(userInfo);
			// console.log(userInfo);
		});
};

export const fetchWorkPosts = async (savePostsArray) => {
	await fetch(GET_POSTS_URL)
		.then((res) => res.json())
		.then((posts) => {
			savePostsArray(posts);
			// console.log(posts);
		});
};

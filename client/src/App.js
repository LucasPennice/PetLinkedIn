import { useState, useEffect } from 'react';
import styles from './styles/styles.css';
// import { LOGOUT_REDIRECT_URL } from './config/url_config';
import NavBar from './components/NavBar';
import NewPost from './components/NewPost';
import { Link, Route, Routes } from 'react-router-dom';
import GoogleLogin from './components/GoogleLogin';
import MyPosts from './components/MyPosts';
import MainPage from './components/MainPage';
import EditPost from './components/EditPost';
import {
	getLogInState,
	getUserInfo,
	fetchWorkPosts,
} from './config/api_functions';
import './App.css';

function App() {
	const [isUserLogged, setIsUserLogged] = useState(false);
	const [userInfo, setUserInfo] = useState({});
	const [currentlyEditingPostData, setCurrentlyEditingPostData] = useState({});
	const [postsArray, setPostsArray] = useState([]);
	const [menuClass, setMenuClass] = useState('app_menu hidden');
	var htmlElement = document.querySelector('html');
	//

	const { NODE_ENV } = process.env;
	const envJson = require('./config/env_variables.json');
	const node_env = NODE_ENV || 'development';
	const env_variables = envJson[node_env];
	const { LOGOUT_REDIRECT_URL } = env_variables;
	//

	useEffect(() => {
		getLogInState(setIsUserLogged)
			.then(() => getUserInfo(setUserInfo))
			.then(() => fetchWorkPosts(setPostsArray));
	}, []);

	const openMenu = () => {
		if (menuClass.includes('hidden')) {
			setMenuClass('app_menu');
			htmlElement.classList.add('block_scroll');
		}
		if (!menuClass.includes('hidden')) {
			setMenuClass('app_menu hidden');
			htmlElement.classList.remove('block_scroll');
		}
	};

	return (
		<div className="AppDiv">
			{isUserLogged === true ? (
				<>
					<NavBar userIcon={userInfo.imageUrl} openMenu={openMenu} />
					<div className={menuClass}>
						<Link to={`/myposts/${userInfo.googleId}`}>MY POSTS</Link>
						<Link to={`/`}>HOME</Link>
						<a href={LOGOUT_REDIRECT_URL}>LOGOUT</a>
					</div>
					<Routes>
						<Route
							path="/"
							element={
								<MainPage
									postsArray={postsArray}
									userId={userInfo.googleId}
									setCurrentlyEditingPostData={setCurrentlyEditingPostData}
								/>
							}
						/>
						<Route
							path="/new"
							exact
							element={<NewPost userId={userInfo.googleId} />}
						/>
						<Route
							path="/myposts/:id"
							element={
								<MyPosts
									postsArray={postsArray}
									userId={userInfo.googleId}
									setCurrentlyEditingPostData={setCurrentlyEditingPostData}
								/>
							}
						/>
						<Route
							path="/edit/:id"
							element={
								<EditPost
									userId={userInfo.googleId}
									currentlyEditingPostData={currentlyEditingPostData}
								/>
							}
						/>
					</Routes>
				</>
			) : (
				<GoogleLogin />
			)}
		</div>
	);
}

export default App;

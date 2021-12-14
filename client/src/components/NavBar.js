import Logo from './Logo';

export default ({ userIcon, openMenu }) => {
	return (
		<nav>
			<Logo />
			<div
				className="user_icon"
				style={{
					backgroundImage: `url(${userIcon})`,
					backgroundPosition: 'center',
					backgroundSize: 'cover',
				}}
				onClick={openMenu}
			></div>
		</nav>
	);
};

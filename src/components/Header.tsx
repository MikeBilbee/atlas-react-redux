//Header.tsx
import logo from "../assets/logo.png"

const Header = () => {
	return (
		<header className="sticky h-32 w-screen top-0 border-b-1 border-blue bg-off-white-light pb-8 pt-8">
			<img className="logo mx-auto w-36" src={logo} alt="logo" />
		</header>
	);
};

export default Header;
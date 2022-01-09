import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../UserContext";

// functions
import { logout } from "../api/user";

const Header = () => {
	const history = useHistory();
	const { user, setUser } = useContext(UserContext);

	const handleLogout = (e) => {
		e.preventDefault();

		logout()
			.then((res) => {
				toast.success(res.message);
				// set user to null
				setUser(null);
				// redirect the user to login
				history.push("/login");
			})
			.catch((err) => console.error(err));
	};
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
			<Link className="navbar-brand" to="/">
				You Suck At Coding
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav ml-auto">
					{!user ? (
						<>
							<li className="nav-item active">
								<Link className="nav-link" to="/signup">
									Sign Up
								</Link>
							</li>
							<li class="nav-item">
								<Link className="nav-link" to="/login">
									Login
								</Link>
							</li>
						</>
					) : (
						<li class="nav-item">
							<span
								className="nav-link"
								style={{ cursor: "pointer" }}
								onClick={handleLogout}
							>
								Logout
							</span>
						</li>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default Header;

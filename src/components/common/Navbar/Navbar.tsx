import { FC } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const NavBar: FC<any> = () => {
	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Container>
				<Navbar.Brand as={Link} to="/">
					App Name
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={Link} to="/pricing">
							Pricing
						</Nav.Link>
						<Nav.Link as={Link} to="/about">
							About
						</Nav.Link>
						<Nav.Link as={Link} to="/contact">
							Contact Us
						</Nav.Link>
						<NavDropdown title="⚙ Item One" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Some link</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">
								Another link
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">A link</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">Last link</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBar;

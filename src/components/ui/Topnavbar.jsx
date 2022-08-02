import React from 'react';
import { NavLink } from "react-router-dom";
import { Navbar , Nav , NavItem , OverlayTrigger , Popover } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarFull } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import logo from '../../assets/imgs/logo.png';
import { Search } from './../ui/Elements';



const Topnavbar = React.memo((props) => {
	const searchPopover = (
		<Popover id="search-popover">
			<Popover.Body bsPrefix="cy">
				<Search />
			</Popover.Body>
		</Popover>
	);

	return (
		<header id="topnavbar">
			<Navbar expand="lg" variant="dark">
		    	<Navbar.Brand href="/">
		    		<img src={ logo } alt="logo" />
		    	</Navbar.Brand>

		    	<Navbar.Toggle aria-controls="navbar-menu"/>
		    	
		    	<Navbar.Collapse id="navbar-menu" className="justify-content-end">
		    		<Nav className="ml-auto mr-0">
				    	<NavLink className="px-3" to="/categories/list">Categories</NavLink>
				    	<NavLink className="px-3" to="/developer">Andrea Ciardi</NavLink>
				    	<NavLink className="px-3" to="/favorites"><FontAwesomeIcon icon={ faStarFull } /></NavLink>
				    	<NavItem className="px-3 btn-link"><OverlayTrigger trigger="click" rootClose placement="bottom-start" overlay={ searchPopover }><FontAwesomeIcon icon={ faMagnifyingGlass } /></OverlayTrigger></NavItem>
				    </Nav>
		    	</Navbar.Collapse>
		    </Navbar>
		</header>
	);
});

export default Topnavbar;
// @ts-nocheck
import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import
{
	Navbar,
	Nav,
	NavItem,
	NavLink,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from "reactstrap";

import { closeSidebar, openSidebar } from "../../redux/actions/navigation";
import MenuIcon from "../Icons/HeaderIcons/MenuIcon";

import ProfileIcon from "../../assets/navbarMenus/pfofileIcons/ProfileIcon";

import s from "./Header.module.scss";
import "animate.css";
import { DEFAULT_USER } from "../../helpers/constant/image";
import { LogoutOutlined } from "@ant-design/icons";
import { buildImage, getItem, onErrorUser } from "../../services/common";

const Header = ( props ) =>
{
	const [ menuOpen, setMenuOpen ] = useState( false );
	const [ notificationsOpen, setNotificationsOpen ] = useState( false );

	const userImage = getItem( 'avatar' ) || null;

	const toggleNotifications = () =>
	{
		setNotificationsOpen( !notificationsOpen );
	}

	const toggleMenu = () =>
	{
		setMenuOpen( !menuOpen );
	}

	const toggleSidebar = () =>
	{
		if ( props.sidebarOpened )
		{
			props.dispatch( closeSidebar() );
		} else
		{
			const paths = props.location.pathname.split( '/' );
			paths.pop();
			props.dispatch( openSidebar() );
		}
	}

	const doLogout = () =>
	{
		localStorage.clear();
		window.location.href = '/login';
	}

	return (
		<Navbar className={ `${ s.root } d-print-none` }>
			<div>
				<NavLink
					onClick={ () => toggleSidebar() }
					className={ `d-md-none mr-3 ${ s.navItem }` }
					href="#"
				>
					<MenuIcon className={ s.menuIcon } />
				</NavLink>
			</div>
			{/* <Form className="d-none d-sm-block" inline>
        <FormGroup>
          <InputGroup className='input-group-no-border'>
            <Input id="search-input" placeholder="Search Dashboard" className='focus'/>
            <InputGroupAddon addonType="prepend">
              <span>
                <SearchBarIcon/>
              </span>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>1
      </Form> */}
			<Nav className="ml-auto">
				<Dropdown isOpen={ notificationsOpen } toggle={ () => toggleNotifications() } nav id="basic-nav-dropdown" className="ml-3">
					<DropdownToggle nav caret className="navbar-dropdown-toggle">
						<span style={{border: '1px solid'}} className={ `${ s.avatar } rounded-circle float-left mr-2` }>
							<img src={ userImage } alt="User" onError={ onErrorUser} />
						</span>
						<span className="small d-none d-sm-block ml-1 mr-2 body-1">{ localStorage.getItem( 'email' ) || getItem("full_name") }</span>
					</DropdownToggle>
					<DropdownMenu className="navbar-dropdown profile-dropdown" style={ { width: "194px" } }>
						<NavLink href="/profile">
							<DropdownItem className={ s.dropdownProfileItem }><ProfileIcon /><span>Profile</span></DropdownItem>
						</NavLink>
						<NavItem>
							<NavLink onClick={ () => doLogout() } href="#">
								<button className="btn btn-primary rounded-pill mx-auto mt-1" type="submit">
									<LogoutOutlined style={ { margin: '0', fontSize: '20px' } } />
									<span className="ml-1">Logout</span>
								</button>
							</NavLink>
						</NavItem>
					</DropdownMenu>
				</Dropdown>
			</Nav>
		</Navbar>
	)
}

Header.propTypes = {
	dispatch: PropTypes.func.isRequired,
	sidebarOpened: PropTypes.bool,
}

function mapStateToProps ( store )
{
	return {
		sidebarOpened: store.navigation.sidebarOpened,
		sidebarStatic: store.navigation.sidebarStatic,
	};
}

export default withRouter( connect( mapStateToProps )( Header ) );


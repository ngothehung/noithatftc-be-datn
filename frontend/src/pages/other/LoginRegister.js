import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { LoginForm } from "../../components/auth/loginForm";
import { RegisterForm } from "../../components/auth/registerForm";

const LoginRegister = ( { location } ) =>
{
	const { pathname } = location;
	const param = useParams();

	const [ type, setType ] = useState(param.type);

	
	useEffect( () =>
	{
		if(param) {
			setType( param.type);
		}
	}, [ param ] );

	return (
		<div>
			<BreadcrumbsItem to={ process.env.PUBLIC_URL + "/" }>Trang chủ</BreadcrumbsItem>
			<BreadcrumbsItem to={ process.env.PUBLIC_URL + pathname }>
				{ type === 'login' ? 'Đănh nhập' : 'Đăng ký' }
			</BreadcrumbsItem>
			<LayoutOne headerTop="visible">
				{/* breadcrumb */ }
				<Breadcrumb />
				<div className="login-register-area pt-100 pb-100">
					<div className="container">
						<div className="row">
							<div className={type === 'login' ? 'col-lg-7 ml-auto mr-auto': 'col-md-12 ml-auto mr-auto'}>
								<div className="login-register-wrapper">
								{ type === 'login' ? <LoginForm /> : <RegisterForm/> }
									
								</div>
							</div>
						</div>
					</div>
				</div>
			</LayoutOne>
		</div>
	);
};

LoginRegister.propTypes = {
	location: PropTypes.object
};

export default LoginRegister;

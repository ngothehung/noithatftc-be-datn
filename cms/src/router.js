import { CategoryForm } from "./components/Category/CategoryForm";
import { OrderForm } from "./components/Order/OrderForm";
import { ProductForm } from "./components/Products/ProductForm";
import { Permissions } from "./components/Settings/Permission/Permissions";
import { RoleForm } from "./components/Settings/Role/RoleForm";
import { Roles } from "./components/Settings/Role/Roles";
import { SlideForm } from "./components/Slide/SlideForm";
import { UserForm } from "./components/User/UserForm";
import { CategoryContainer } from "./pages/category/CategoryContainer";
import Dashboard from "./pages/dashboard/Dashboard";
import { ProductContainer } from "./pages/products/ProductContainer";
import { ProfileContainer } from "./pages/profile/ProfileContainer";

export const ROUTERS = [
	{
		path: '/dashboard',
		exact: true,
		title: 'Dashboard',
		redirectFrom: '/',
		component: Dashboard
	},
	{
		path: '/product/list',
		exact: true,
		redirectFrom: '/product',
		title: 'List product',
		component: ProductContainer,
	},
	{
		path: '/product/create',
		exact: true,
		title: 'Add new product',
		redirectFrom: null,
		component: ProductForm,
	},
	{
		path: '/product/edit/:id',
		exact: true,
		redirectFrom: null,
		title: 'Edit product',
		component: ProductForm,
	},
	{
		path: '/category/list',
		exact: true,
		redirectFrom: '/category',
		title: 'List',
		component: CategoryContainer,
	},
	{
		path: '/category/create',
		exact: true,
		redirectFrom: '/category',
		title: 'Create',
		component: CategoryForm,
	},
	{
		path: '/category/edit/:id',
		exact: true,
		redirectFrom: '/category',
		title: 'Edit',
		component: CategoryForm,
	},
]

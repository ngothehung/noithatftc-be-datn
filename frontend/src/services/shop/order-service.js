import { buildFilter, getMethod, postMethod } from '../index';

export const ORDER_SERVICE = {
	create: async (data) => {
		return await postMethod('order/store', data);
	},

	getList: async (params) => {
		let filter = buildFilter( params );
		return await getMethod('order', filter);
	},
	getListByCode: async (params) => {
		let filter = buildFilter( params );
		return await getMethod('order/show-code', filter);
	},

	show: async (id) => {
		return await getMethod('order/show/' + id);
	}
}
import { getMethod, postMethod } from "../api-service"

export const DiscountService = {
	findByCode: async (code) => {
		return await getMethod('discount/show/' + code, {});
	}
}

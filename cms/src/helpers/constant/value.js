export const INIT_PAGING  = {
	page: 1,
	page_size: 10,
	total: 0,
	total_page: 0
};

export const PAYMENT_TYPE = [
	{ value: 1, label: "Thanh toán Online ( QR code )" },
	{ value: 2, label: "THANH TOÁN TIỀN MẶT" },
]

export const PAYMENT_STATUS = [
	{ value: 0, label: "Đang sử lí" },
	{ value: 1, label: "Chưa thanh toán" },
	{ value: 2, label: "Đã thanh toán" },

]
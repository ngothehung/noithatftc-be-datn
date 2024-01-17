import React, { useEffect, useState } from "react";
import { ORDER_SERVICE,  onErrorImage, validateMessages } from "../../services";
import { Accordion, Card, Table } from "react-bootstrap";
import { customNumber } from "../../helpers/func";
import { Button, Form, Input, Modal, Pagination, message } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { toggleShowLoading } from "../../redux/actions/common";
import { INIT_PAGING } from "../../helpers/constant";
import { useForm } from "antd/es/form/Form";

const Order = (props) => {


	const dispatch = useDispatch();
	const [orders, setOrders] = useState([]);
	const [code, setCode] = useState(null);
	const [open, setOpen] = useState(false);
	const [form] = useForm();

	const { confirm } = Modal;
	const [paging, setPaging] = useState({
		page: 1,
		page_size: 10,
		total: 0,
		totalPage: 0
	});

	let user_id = localStorage.getItem('id')

	useEffect(() => {
		getOrders(paging);
	}, []);

	const getOrders = async (params) => {
		let eventKey = 0;
		dispatch(toggleShowLoading(true));
		let response;
		if (user_id) {
			response = await ORDER_SERVICE.getList({ ...params, code: code });
		} else {
			response = await ORDER_SERVICE.getListByCode({ ...params, code: code });
		}

		if (response?.status == 'success' && response?.data) {
			response.data.orders.map(item => {
				item.eventKey = eventKey;
				eventKey++;
			})
			setOrders(response?.data?.orders);
			setPaging(response?.data?.meta);
			dispatch(toggleShowLoading(false));
		}
		dispatch(toggleShowLoading(false));
	};

	const genStatus = (status) => {
		if (status === 1) return <p className="text-warning mb-0 ">Đặt hàng thành công</p>;
		else return <p className="text-danger mb-0">Hủy bỏ</p>;
	}

	const genPaymentStatus = (status) => {
		if (status === 0) return <span style={{ fontWeight: 600, fontSize: 18 }} className="text-success">Đang sử lí</span>;
		else if (status === 2) return <span style={{ fontWeight: 600, fontSize: 18 }} className="text-success">Đã thanh toán</span>;
		return <span style={{ fontWeight: 600, fontSize: 18 }} className="text-primary">Chưa thanh toán</span>;
	}

	const genPaymentType = (status) => {

		if (status === 1) return <div className="text-secondary" style={{ fontWeight: 600, fontSize: 18 }}>Thanh toán online</div>;
		return <div className="text-primary" style={{ fontWeight: 600, fontSize: 18 }}>Tiền mặt</div>;
	}

	const genShippingStatus = (status) => {
		if (status === 1) return <span style={{ fontWeight: 600, fontSize: 18 }} className="text-success">chờ duyệt</span>;
		else if (status === 2) return <span style={{ fontWeight: 600, fontSize: 18 }} className="text-warning">Đã duyệt</span>;
		else if (status === 3) return <span style={{ fontWeight: 600, fontSize: 18 }} className="text-primary">Chờ lấy hàng</span>;
		else if (status === 4) return <span style={{ fontWeight: 600, fontSize: 18 }} className="text-success">Đã giao</span>;
		else if (status === 5) return <span style={{ fontWeight: 600, fontSize: 18 }} className="text-success">Đã Giao hàng</span>;
		else if (status === 6)  return <span style={{ fontWeight: 600, fontSize: 18 }} className="text-success">Đã nhận hàng</span>;
	}

	const destroyAll = () => {
		Modal.destroyAll();
	};

	const cancelOrder = (item) => {
		console.log(item);
		updateStatus(item.id, { status: 4, note: item.note });
	}



	const [cancelButtonVisible, setCancelButtonVisible] = useState(true); // Bước 1

	const updateStatus = async (id, data) => {
		dispatch(toggleShowLoading(true));
		const response = await ORDER_SERVICE.update(id, data);
		if (response?.status === "success") {
			message.success("Cập nhật đơn hàng thành công");
			setOpen(false);
			form.resetFields();
			await getOrders(INIT_PAGING);

			// Bước 2: Ẩn nút "Hủy đơn hàng" sau khi xác nhận đơn hàng
			setCancelButtonVisible(false);
		} else {
			message.error("Cập nhật đơn hàng thất bại");
			dispatch(toggleShowLoading(false));
		}
	};

	return (
		<div className="myaccount-area pb-80 pt-50">
			<div className="container">
				<div className="row">
					<div className="ml-auto mr-auto col-lg-9">
						<div className="myaccount-wrapper">
							<div className=" w-50 mx-auto mb-2 d-flex mb-5">
								{/* <Input type="text" placeholder="Nhập mã đơn hàng" onChange={e => setCode(e?.target?.value)} /> */}
								{/* <button className="btn ml-2 text-nowrap btn-xl btn-success"
									onClick={e => {
										getOrders({ page: 1, page_size: 20, code: code })
									}}>Tìm kiếm</button> */}
							</div>
							<Accordion>
								{orders.length > 0 ?
									orders.map((item, key1) => (
										<div key={key1}>
											<Card className="single-my-account mb-20">
												<Card.Header className="panel-heading">
													<Accordion.Toggle variant="link" eventKey={String(item.eventKey)}>
														<h3 className="panel-title">
															<div className="row">
																<div className="col-sm-6">
																	Đơn hàng <b className="ml-2">#{item.code || item.id}</b>
																</div>
																<div className="col-sm-3 text-right">
																	{customNumber(item.total_price)}
																</div>
																<div className="col-sm-3 text-right">
																	{genStatus(item.status)}
																</div>
																{/* trạng thát người dùng */}
															</div>
														</h3>
													</Accordion.Toggle>
												</Card.Header>
												<Accordion.Collapse eventKey={String(item.eventKey)}>
													<Card.Body>
														<div className="myaccount-info-wrapper">
															<div className="mb-5 d-flex justify-content-between align-items-start">
																<div>
																	<h4>Tên người nhận: {item.receiver_name} - {item.receiver_phone}</h4>
																	<p><span style={{ fontWeight: 600 }}>Địa chỉ: </span>{item.receiver_address}</p>
																	<p><span style={{ fontWeight: 600 }}>Email: </span>{item.receiver_email}</p>
																</div>

																{cancelButtonVisible && item?.status === 1 && item?.shipping_status !== 5 && (
																	<button
																		className="btn btn-danger"
																		onClick={() => {
																			form.setFieldValue("id", item?.id);
																			form.setFieldValue("note", null);
																			setOpen(true);
																		}}
																	>
																		Hủy đơn hàng
																	</button>
																)}

																{
																	item?.shipping_status === 5 && <button className="btn btn-success" onClick={() => {
																		updateStatus(item?.id, { shipping_status: 6 })
																	}}>Xác nhận đơn hàng</button>
																}
																{

																}
															</div>

															<div className="text-center">
																<h4>Sản phẩm</h4>
															</div>
															<Table className={`table-striped table-hover mb-5`} responsive>
																<thead>
																	<tr>
																		<th>#</th>
																		<th className="text-nowrap">Tên sản phẩm</th>
																		<th className="text-nowrap">Số lượng</th>
																		<th className="text-nowrap">Giá</th>
																		<th className="text-nowrap">Tổng giá</th>
																	</tr>
																</thead>
																<tbody>
																	{item.transactions?.length > 0 &&
																		item.transactions.map((product, key2) => (
																			<tr key={key2}>
																				<td>
																					{key2 + 1}
																				</td>
																				<td className="d-flex align-items-center">
																					<img alt={product.name}
																						src={product.avatar}
																						onError={onErrorImage} style={{ width: '90px', height: '90px' }}
																						width={90} height={90}
																						className="mr-1" />
																					{product.name}
																				</td>
																				<td>{product.quantity}</td>
																				<td>{customNumber(product.price)}</td>
																				<td>{customNumber(product.total_price * product.quantity)}</td>
																			</tr>
																		))
																	}
																</tbody>
															</Table>
															<div className="border-top pt-md-3">
																<div className="row mb-md-3">
																	<div className="col-sm-9">
																		<span style={{ fontWeight: 600, fontSize: 16 }}>Giảm giá:</span>
																	</div>
																	<div className="col-sm-3 text-right">
																		<span style={{ fontWeight: 600, fontSize: 16 }}>{customNumber(item.total_discount) || 0}</span>
																	</div>
																</div>
																<div className="row mb-md-3 pt-md-3">
																	<div className="col-sm-9">
																		<span style={{ fontWeight: 600, fontSize: 18, color: 'red' }}>Tổng giá:</span>
																	</div>
																	<div className="col-sm-3 text-right">
																		<span style={{ fontWeight: 600, fontSize: 18, color: 'red' }}>{customNumber(item.total_price)}</span>
																	</div>
																</div>
																<div className="row mb-md-3 pt-md-3">
																	<div className="col-sm-9">
																		<span style={{ fontWeight: 600, fontSize: 18 }}>Loại thanh toán:</span>
																	</div>
																	<div className="col-sm-3 text-right">
																		{genPaymentType(item.payment_type)}
																	</div>
																</div>
																<div className="row mb-md-3 pt-md-3">
																	<div className="col-sm-9">
																		<span style={{ fontWeight: 600, fontSize: 18 }}>Trạng thái thanh toán:</span>
																	</div>
																	<div className="col-sm-3 text-right">
																		{genPaymentStatus(item.payment_status)}
																	</div>
																</div>
																<div className="row mb-md-3 pt-md-3">
																	<div className="col-sm-9">
																		<span style={{ fontWeight: 600, fontSize: 18 }}>Trạng thái giao hàng:</span>
																	</div>
																	<div className="col-sm-3 text-right">
																		{genShippingStatus(item.shipping_status)}
																	</div>
																</div>
															</div>
														</div>
													</Card.Body>
												</Accordion.Collapse>
											</Card>
										</div>
									))
									:
									<div className="text-center">
										Không có thông tin đơn hàng.
									</div>
								}
							</Accordion>
						</div>
					</div>
				</div>
				{
					paging.total > 0 &&
					<div className="mx-auto d-flex justify-content-center my-4">
						<Pagination
							onChange={e =>
								getOrders({ page: e, page_size: 20 })
							}
							pageSize={paging.page_size}
							defaultCurrent={paging.page}
							total={paging.total}
						/>
					</div>
				}

				<Modal
					open={open}
					centered={true}
					footer={null}
					closable={false}
				>
					<Form
						className='p-3'
						name='form'
						form={form}
						onFinish={cancelOrder}
						validateMessages={validateMessages}
					>
						<Form.Item name="id"
							className='mb-0 d-none h-0'>
							<Input className='d-none mb-0' placeholder='Nhập lý do hủy' />
						</Form.Item>
						<Form.Item name="note" label="Lý do hủy"
							rules={[{ required: true, }]}
							className=' d-block'>
							<Input.TextArea rows={5} maxLength={300} className=' mb-0' placeholder='Nhập lý do hủy' />
						</Form.Item>
						<div className="d-flex justify-content-end">
							<button type="button" className="btn btn-secondary mr-2"
								onClick={() => {
									form.resetFields();
									setOpen(false);
								}}>Hủy</button>
							<button type="submit" className="btn btn-danger">Xác nhận</button>
						</div>
					</Form>
				</Modal>
			</div>
		</div>
	);
}

export default Order;
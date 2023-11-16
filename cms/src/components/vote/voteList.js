import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Col, Row } from "react-bootstrap";
import moment from "moment/moment";
import { toast } from "react-toastify";
import { Container, Table } from 'reactstrap';
import Widget from '../Widget/Widget';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Pagination } from 'antd';

export default function PageVoting ()
{

	const [ paging, setPaging ] = useState( {
		page: 1,
		page_size: 20,
		total: 0
	} );

	const [ params, setParams ] = useState( {

	} );


	const [ dataList, setDataList ] = useState( [] );

	useEffect( () =>
	{
		getDataList( { page: paging.page, page_size: paging.page_size, ...params } ).then( r => { } );
	}, [] );

	const getDataList = async ( filters ) =>
	{
		// const response = await voteService.getLists( filters )
		// if ( response?.status === 'success' || response?.status === 200 )
		// {
		// 	setDataList( response.data.votes );
		// 	setPaging( response.meta )
		// }
	}

	const handleDelete = async ( id ) =>
	{
		// const response = await voteService.delete( id );
		// if ( response?.status === 'success' || response?.status === 200 )
		// {
		// 	toast( "Xóa thành công!" );
		// 	getDataList( { ...params } ).then( r => { } );
		// } else
		// {
		// 	toast( response?.error || 'error' );
		// }
	}

	return (
		<div>

			<Container>
				<Row>
					<Col>
						<Breadcrumb>
							<Breadcrumb.Item href="/user" >
								Đánh giá
							</Breadcrumb.Item>
							<Breadcrumb.Item active>Danh sách</Breadcrumb.Item>
						</Breadcrumb>
						{/* <div className={ 'd-flex justify-content-end' }>
							<Link className={ 'btn btn-sm btn-primary' } to={ '/user/create' } >Thêm mới</Link>
						</div> */}
						<div className="widget-table-overflow p-5 mt-4">
							<Table className={ `table-striped table-bordered table-hover ${ s.statesTable }` } responsive>
								<thead>
									<tr>
										<th>#</th>
										<th>Customer</th>
										<th>Product</th>
										<th>Number Vote</th>
										<th>Content</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{ dataList.length > 0 ? dataList.map( ( item, key ) =>
									{
										return (
											<tr key={ key }>
												<td className='align-middle'>{ key + 1 }</td>
												<td className='text-nowrap align-middle'>
													{ item.user?.name || 'N/A' }
													{/* <Link className={ '' }
													to={ `/vote/update/${ item._id }` } >
													
												</Link> */}
												</td>
												<td className='text-nowrap align-middle'>{ item.user?.email || 'N/A' }</td>
												<td className='text-nowrap align-middle'>{ item.room?.name || 'N/A' }</td>
												<td className='align-middle'>
													<StarIcons vote_number={ item.vote_number } />
												</td>
												<td className='text-break' style={ { maxWidth: '200px' } }>{ item.vote_content }</td>
												<td className='align-middle'>
													<Button variant="danger" size="sm"
														onClick={ () => handleDelete( item.id ) }>
														Xóa
													</Button>{ ' ' }
												</td>
											</tr>
										)
									} )
										:
										<tr>
											<td className='text-center' colSpan={ 8 }>Không có dữ liệu</td>
										</tr>
									}

								</tbody>
							</Table>
						</div>
						{
							paging?.total > 0 &&
							<div className="mx-auto d-flex justify-content-center my-4">
								<Pagination
									onChange={ e =>
										getDataList( { ...paging, page: e, ...params } )
									}
									pageSize={ paging.page_size }
									defaultCurrent={ paging.page }
									total={ paging.total }
								/>
							</div>
						}
					</Col>
				</Row>
			</Container>
		</div>
	);
}

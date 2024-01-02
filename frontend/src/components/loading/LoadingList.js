import React from 'react';
import Skeleton from 'react-loading-skeleton';
export const LoadingList = ( props ) =>
{
	let { total, height, count, className } = props;
	return (
		<>
			{
				[ ...Array( total ) ].map( ( item, key ) =>
				{
					return <div key={key} className={className}>
						<Skeleton height={ height } />
						<Skeleton count={ count } />
					</div>
				} )
			}
		</>
	)
}
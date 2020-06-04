import React from 'react';

import PageNav from '../components/PageNav';

import '../css/layout.css'

export default function Layout(props) {
	const { pages } = props;

	return (
		<div className="layout-container">
			<PageNav pages={pages} />
			<hr className="nav-divider" />
			<div className="layout-content">
				{props.children}
			</div>
		</div>
	);
}
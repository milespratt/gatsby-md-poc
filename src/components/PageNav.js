import React from 'react';
import { Link } from 'gatsby';

import "../css/page-nav.css"

export default function PageNav(props) {
	const { pages } = props;

	return (
		<nav class="page-nav">
			<h2 className="nav-title">Police Data Accessibility Project</h2>
			<div className="spacer" />
			{pages.map(page => (
				<Link
					key={page.path}
					to={page.path}
					activeClassName="active"
				>
					<h3 className="nav-link-content">{page.title.toUpperCase()}</h3>
				</Link>
			))}
		</nav>
	);
}
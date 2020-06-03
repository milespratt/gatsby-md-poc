import React from 'react';
import { Link } from 'gatsby';

import "../css/page-nav.css"

export default function PageNav(props) {
	const { pages } = props;

	return (
		<nav class="page-nav">
			{pages.map(page => (
				<Link key={page.path} to={page.path}>
					{page.title}
				</Link>
			))}
		</nav>
	);
}
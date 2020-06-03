import React from 'react';
import { Link } from 'gatsby';

export default function LinkList(props) {
	const { links } = props;

	return (
		<nav>
			{links.map(link => (
				<Link key={link.path} to={link.path}>
					{link.title}
				</Link>
			))}
		</nav>
	);
}
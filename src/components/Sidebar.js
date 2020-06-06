import React from 'react';
import { Link } from 'gatsby';

import sidebarStyles from '../css/sidebar.module.css';

function LevelComponent({ level, depth }) {
	return (
		<>
			<Link
				activeClassName={sidebarStyles.sidebar___active}
				style={{paddingLeft: (depth * 30) + 'px'}}
				to={level.path}
			>
				{level.title}
			</Link>
			{level.children.map(level => (
				<LevelComponent level={level} depth={depth + 1} />
			))}
		</>
	)
}

export default function Sidebar({ pages }) {

	// modified from https://gist.github.com/stephanbogner/4b590f992ead470658a5ebf09167b03d
	function arrangeIntoTree(pages, pathPrefix) {
		const paths = pages.sort((a, b) => a.path > b.path ? 1 : -1).map(page => page.path.slice(commonPrefix.length).split('/'));
		// Adapted from http://brandonclapp.com/arranging-an-array-of-flat-paths-into-a-json-tree-like-structure/
		let tree = [];
	
		for (let i = 0; i < paths.length; i++) {
			const path = paths[i];
			let currentLevel = tree;
			for (let j = 0; j < path.length; j++) {
				const part = path[j];
				const existingPath = findWhere(currentLevel, 'part', part);
				if (existingPath) {
					currentLevel = existingPath.children;
				} else {
					const newPart = {
						part: part,
						title: pages[i].title,
						path: (pathPrefix ? pathPrefix : '') + path.join('/'),
						children: [],
					}
					currentLevel.push(newPart);
					currentLevel = newPart.children;
				}
			}
		}
		return tree;
	
		function findWhere(array, key, value) {
			// Adapted from https://stackoverflow.com/questions/32932994/findwhere-from-underscorejs-to-jquery
			let t = 0; // t is used as a counter
			while (t < array.length && array[t][key] !== value) { t++; }; // find the index where the id is the as the aValue
	
			if (t < array.length) {
				return array[t]
			} else {
				return false;
			}
		}
	}
	// taken from https://www.w3resource.com/javascript-exercises/javascript-array-exercise-28.php
	function longestCommonPrefix(_arr) {
		const arr = _arr.concat().sort();
		const first = arr[0];
		const last = arr[arr.length - 1];
		const length = first.length;

		let i = 0;
		while (i < length && first.charAt(i) === last.charAt(i)) i++;
		
		return first.substring(0, i);
	}

	const commonPrefix = longestCommonPrefix(pages.map(page => page.path));
	const tree = arrangeIntoTree(pages, commonPrefix);

	return (
		<sidebar className={sidebarStyles.sidebar}>
			{tree.map(level => (
				<LevelComponent level={level} depth={0} />
			))}
		</sidebar>
	);
}

import React, { useEffect, useState } from 'react';

import { data } from '../../../data.js';
import { calculateGamma, calculateStatistics } from '../../utils/util.js';

import Table from '../../molecules/Table/Table';

import './HomePage.css';

const ALCOHOL = 'Alcohol';
const FLAVANOIDS = 'Flavanoids';
const GAMMA = 'Gamma';

const HomePage = () => {
	const [rowHeading, setRowHeading] = useState([]);
	const [tableOneContent, setTableOneContent] = useState([]);
	const [tableTwoContent, setTableTwoContent] = useState([]);

	useEffect(() => {
		const content = {};

		data.forEach((obj) => {
			const key = `${ALCOHOL} ${obj[ALCOHOL]}`;

			if (!content[key]) {
				content[key] = {
					[FLAVANOIDS]: [],
					[GAMMA]: [],
				};
			}
			content[key][FLAVANOIDS].push(Number(obj[FLAVANOIDS]));
			content[key][GAMMA].push(calculateGamma(obj));
		});

		const tempTableOneContent = [[`${FLAVANOIDS} Mean`], [`${FLAVANOIDS} Median`], [`${FLAVANOIDS} Mode`]];
		const tempTableTwoContent = [[`${GAMMA} Mean`], [`${GAMMA} Median`], [`${GAMMA} Mode`]];

		Object.values(content).forEach((val) => {
			calcStats(val[FLAVANOIDS], tempTableOneContent);
			calcStats(val[GAMMA], tempTableTwoContent);
		});

		setTableOneContent(tempTableOneContent);
		setTableTwoContent(tempTableTwoContent);
		setRowHeading(['Measure', ...Object.keys(content)]);
	}, []);

	const calcStats = (obj, content) => {
		const { mean, median, mode } = calculateStatistics(obj);

		content[0].push(mean);
		content[1].push(median);
		content[2].push(mode);

		return content;
	};

	return (
		<div className='homepage-container'>
			<Table rowHeading={rowHeading} tableContent={tableOneContent}></Table>
			<Table rowHeading={rowHeading} tableContent={tableTwoContent}></Table>
		</div>
	);
};

export default HomePage;

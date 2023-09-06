import './Table.css';

const Table = ({ rowHeading, tableContent }) => {
	const getRowHeading = () => rowHeading.map((heading, ix) => <th key={`${heading}-${ix}`}>{heading}</th>);

	const getRow = (row) =>
		row.map((rowVal, ix) =>
			ix === 0 ? <th key={`${rowVal}-${ix}`}>{rowVal}</th> : <td key={`${rowVal}-${ix}`}>{rowVal}</td>
		);

	const getTableContent = () =>
		tableContent.map((tableRow, ix) => <tr key={`${tableRow.join('-')}-${ix}`}>{getRow(tableRow)}</tr>);

	return (
		<div className='table-container'>
			<table>
				<thead>
					<tr>{getRowHeading()}</tr>
				</thead>
				<tbody>{getTableContent()}</tbody>
			</table>
		</div>
	);
};

export default Table;

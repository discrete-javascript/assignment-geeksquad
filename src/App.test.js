import React from 'react';
import App from './App';
import '@testing-library/jest-dom/extend-expect';
import { response } from './response';
import { render, fireEvent, cleanup } from '@testing-library/react';

const TEST_IDS = {
	RANK_ROUTE: 'route-rank',
	NAME_ROUTE: 'route-name',
	POINTS_ROUTE: 'route-points',
	AGE_ROUTE: 'route-age',
	TABLE: 'app-table',
	TBODY: 'app-tbody'
};
const TOTAL_ROWS = response.list.length;
const list = response.list;
const SORT_BY_RANK = [...list].sort((a, b) => a.rank - b.rank);
const SORT_BY_POINTS = [...list].sort((a, b) => a.points - b.points);
const SORT_BY_AGE = [...list].sort((a, b) => a.age - b.age);
const SORT_BY_NAME = [...list].sort((a, b) => {
	return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
});


describe('LeaderBoard', () => {
	let app;
	let container;
	let getByTestId;

	function validateSortByRank(SORT_BY) {
		for (let i = 0; i < TOTAL_ROWS; i++) {
			const { rank, points, name, age } = SORT_BY[i];
			const $td_rank = getByTestId(`rank-${i}`);
			expect($td_rank.textContent).toEqual(rank);
			const $td_name = getByTestId(`name-${i}`);
			expect($td_name.textContent).toEqual(name);
			const $td_points = getByTestId(`points-${i}`);
			expect($td_points.textContent).toEqual(points);
			const $td_age = getByTestId(`age-${i}`);
			expect($td_age.textContent).toEqual(age);
		}
	}

	beforeEach(() => {
		app = render(<App />);
		container = app.container;
		getByTestId = app.getByTestId;
	});

	afterEach(() => {
		cleanup();
	});

	it('should render the table and buttons', () => {
		const table = getByTestId(TEST_IDS.TABLE);
		expect(table).toBeInstanceOf(HTMLElement);
		const tbody = getByTestId(TEST_IDS.TBODY);
		expect(tbody).toBeInstanceOf(HTMLElement);
		expect(tbody.children.length).toEqual(TOTAL_ROWS);
		const Rank = getByTestId(TEST_IDS.RANK_ROUTE);
		expect(Rank).toBeInstanceOf(HTMLElement);
		const Name = getByTestId(TEST_IDS.NAME_ROUTE);
		expect(Name).toBeInstanceOf(HTMLElement);
		const Points = getByTestId(TEST_IDS.POINTS_ROUTE);
		expect(Points).toBeInstanceOf(HTMLElement);
		const Age = getByTestId(TEST_IDS.AGE_ROUTE);
		expect(Age).toBeInstanceOf(HTMLElement);
	});

	it('should Navigate to Correct Route on button click', () => {
		const Rank = getByTestId(TEST_IDS.RANK_ROUTE);
		fireEvent.click(Rank);
		expect(window.location.pathname).toEqual('/rank');

		const Name = getByTestId(TEST_IDS.NAME_ROUTE);
		fireEvent.click(Name);
		expect(window.location.pathname).toEqual('/name');

		const Points = getByTestId(TEST_IDS.POINTS_ROUTE);
		fireEvent.click(Points);
		expect(window.location.pathname).toEqual('/points');

		const Age = getByTestId(TEST_IDS.AGE_ROUTE);
		fireEvent.click(Age);
		expect(window.location.pathname).toEqual('/age');
	});

	it('should Sort by Rank', () => {
		const RANK_ROUTE = getByTestId(TEST_IDS.RANK_ROUTE);
		fireEvent.click(RANK_ROUTE);
		validateSortByRank(SORT_BY_RANK);
	});

	it('should Sort by Name', () => {
		const NAME_ROUTE = getByTestId(TEST_IDS.NAME_ROUTE);
		fireEvent.click(NAME_ROUTE);
		validateSortByRank(SORT_BY_NAME);
	});

	it('should Sort by Points', () => {
		const POINTS_ROUTE = getByTestId(TEST_IDS.POINTS_ROUTE);
		fireEvent.click(POINTS_ROUTE);
		validateSortByRank(SORT_BY_POINTS);
	});

	it('should Sort by Age', () => {
		const AGE_ROUTE = getByTestId(TEST_IDS.AGE_ROUTE);
		fireEvent.click(AGE_ROUTE);
		validateSortByRank(SORT_BY_AGE);
	});
});


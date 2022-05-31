import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import {
  render,
  screen,
  getByText,
  waitFor,
  getByRole,
  toBeInTheDocument,
  toHaveLength,
  fireEvent,
  getByTitle,
  toBeChecked,
  queryByTestId,
  waitForElementToBeRemoved,
  toHaveBeenCalledTimes,
  getAllByTestId
} from '@testing-library/react';
import App from '../public/src/components/App.jsx';
import DebtsList from '../public/src/components/DebtsList.jsx';
import Debts from '../public/src/components/Debts.jsx';
import {testInfo} from './testData.js';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {act} from 'react-dom/test-utils'

const server = setupServer(
  rest.get('/api/debts', (req, res, ctx) => {
    return res(ctx.json(testInfo))
  }),
  rest.post('/api/debts', (req, res, ctx) => {
    return res(ctx.status(201))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

beforeEach (async () => {
  render(<App url="/" />)
  await waitForElementToBeRemoved(screen.getByText("Loading..."))
})

test('App page', async () => {
  expect(screen.getByText('Debt Calculator')).toHaveTextContent("Debt Calculator");
});

test('data loaded in table', async () => {
  await waitFor(() => screen.getAllByText('CAPITAL ONE'))
  expect(screen.getAllByText('CAPITAL ONE')).toHaveLength(3);
});

test('test checkbox checked', async () => {
  await waitFor(() => screen.getByText("DISCOVERBANK"))
  let button = screen.getAllByTestId("checkbox")

  expect(screen.getByText("DISCOVERBANK")).toBeInTheDocument()
  await fireEvent.click(button[0])
  await waitFor(() => screen.getByTestId("checkedRowCount"))
  expect(screen.getByTestId("checkedRowCount")).toHaveTextContent("Check Row Count: 1")
});

// test('test add debt button', async () => {
//   await waitFor(() => screen.getByText("DISCOVERBANK"))
//   const button = screen.getByTestId("addDebt")
//   expect(screen.getByText("DISCOVERBANK")).toBeInTheDocument()
//   await fireEvent.click(button)
//   expect(button).
// });


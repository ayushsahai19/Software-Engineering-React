import Tuits from "../components/tuits";
import {screen} from "@testing-library/react";
import {render}  from "@testing-library/react";
import axios from "axios";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service"; 


const MOCKED_USERS = [
  {username: 'emily', password: 'ffzz33d', email: 'emily@paris.com', _id: '101'},
  {username: 'king', password: 'ffaa33d', email: 'emily@p.com', _id: '104'}
];

const MOCKED_TUITS = [
  {
    _id: '1001',
    postedBy: MOCKED_USERS[0],
    tuit: "emily's says hi to king"
  },
  {
    _id: '1002',
    postedBy: MOCKED_USERS[1],
    tuit: "king says hi to emily"
  }
];

test('tuit list renders static tuit array', () => {
  render(
    <HashRouter>
      <Tuits tuits={MOCKED_TUITS}/>
    </HashRouter>
  );
  const linkElement = screen.getByText(/emily's says hi to king/i);
  expect(linkElement).toBeInTheDocument();
});

test('tuit list renders async', async () => {
  const tuits = await findAllTuits();
  render(
    <HashRouter>
      <Tuits tuits={tuits}/>
    </HashRouter>
  );
  const linkElement = screen.getByText(/hi bob/i);
  expect(linkElement).toBeInTheDocument();
}); 

test('tuit list renders mocked', async () => {
  const mock = jest.spyOn(axios, 'get');
  mock.mockImplementation(() =>
                            Promise.resolve({ data: {tuits: MOCKED_TUITS} }));
  const response = await findAllTuits();
  const tuits = response.tuits;

  render(
    <HashRouter>
      <Tuits tuits={tuits}/>
    </HashRouter>
  );
  const linkElement = screen.getByText(/emily's says hi to king/i);
  expect(linkElement).toBeInTheDocument();
  mock.mockRestore();
});
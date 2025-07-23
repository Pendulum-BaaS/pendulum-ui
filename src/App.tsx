import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import Data from './components/Data';
import Users from './components/Users';
import Logs from './components/Logs';

import { Button } from '@mui/material';
import {
  StorageRounded,
  PeopleAltRounded,
  DescriptionRounded
} from '@mui/icons-material';

const App = () => {
  return (
    <>
      <h1>Welcome to your Pendulum Dashboard</h1>
      <p>Navigate through the different sections using the menu</p>
      <Router>
        <Link to='/data'>
          <Button variant='outlined'>
            <h2>Data Management</h2>
            <p>Access & manage your collection data.</p>
            <StorageRounded></StorageRounded>
          </Button>
        </Link>
        <Link to='/users'>
          <Button variant='outlined'>
            <h2>User Management</h2>
            <p>Manage user permissions & access controls for your app.</p>
            <PeopleAltRounded></PeopleAltRounded>
          </Button>
        </Link>
        <Link to='/logs'>
          <Button variant='outlined'>
            <h2>System Logs</h2>
            <p>Monitor system activity, track events, & review error logs.</p>
            <DescriptionRounded></DescriptionRounded>
          </Button>
        </Link>

        <Routes>
          <Route path='/' element={null}></Route>
          <Route path='/data' element={<Data />}></Route>
          <Route path='/users' element={<Users />}></Route>
          <Route path='/logs' element={<Logs />}></Route>
        </Routes>
      </Router>
    </>
  )
};

export default App;

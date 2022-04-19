import './App.css';
import Chats from './Chats';
import Grid from "@mui/material/Grid"
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';

function App() {
  const [logged, setLogged] = useState(true)
  return (
    <div className="App">
      <header className="header">
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <h1>Chatter</h1>
          <Tooltip title="Account management">
            <IconButton>
              <AccountCircleIcon fontSize='large' />
            </IconButton>
          </Tooltip>
        </Grid>
      </header>
      <body className="body">
        {logged ? <Chats /> : <h1>Please log in</h1>}
      </body>
    </div>
  );
}

export default App;

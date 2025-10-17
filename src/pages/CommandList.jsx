import { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { NavLink } from "react-router";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function Home() {
  const { isAuthenticated, logout, token } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  let navigate = useNavigate();

  const getHistory = async (e) => {
    e.preventDefault();
    
    await axios.get("http://localhost:8000/api/bot/history/list/", {headers:{
      'Authorization': `Token ${token}`
    }})
    .then(function (response) {
        setHistory(response.data);
    }).catch(function (error) {
      setHistory([]);
      console.log(JSON.parse(error.request.response).message);
      if (error.response.status === 401) {
        logout();
        navigate('/', { replace: true });
      }
    });     
  };

  const goToCommand = () => {
    navigate("/commands/create");
  }

  useEffect(() => {
    getHistory(new Event('init'));
  }, []);

  return (
    <div className="page-container">
      <h2>Commands History <Button variant="contained" onClick={goToCommand}>New</Button></h2>
      

      {history.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Raspberry</TableCell>
                <TableCell>Coomand</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell><NavLink to={`/commands/view/${row.id}`} end>{row.raspberry_name}</NavLink></TableCell>
                  <TableCell>{row.command_name}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.created_at}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No history available.</p>
      )}
    </div>
  )
}

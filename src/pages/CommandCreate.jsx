import Button from '@mui/material/Button';
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from "react-router";
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function Command() {
    const { isAuthenticated, logout, token } = useContext(AuthContext);
    let navigate = useNavigate();

    const [raspberries, setRasberries] = useState([]);
    const [commands, setCommands] = useState([]);

    const [formData, setFormData] = useState({
        raspberry_slug: '',
        command_slug: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const goToCommands = () => {
        navigate("/commands/");
    }

    const getRaspberries = async (e) => {
        e.preventDefault();
        
        await axios.get("http://localhost:8000/api/bot/raspberries/list/", {headers:{
        'Authorization': `Token ${token}`
        }})
        .then(function (response) {
            setRasberries(response.data);
        }).catch(function (error) {
            setRasberries([]);
            console.log(JSON.parse(error.request.response).message);
        });     
    };

    const getCommands = async (e) => {
        e.preventDefault();
        
        await axios.get("http://localhost:8000/api/bot/commands/list/", {headers:{
        'Authorization': `Token ${token}`
        }})
        .then(function (response) {
            setCommands(response.data);
        }).catch(function (error) {
            setCommands([]);
            console.log(JSON.parse(error.request.response).message);
        });     
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        await axios.post("http://localhost:8000/api/bot/history/", formData, {headers:{
            'Authorization': `Token ${token}`
        }})
        .then(function (response) {
            if (response.data) {
                navigate('/commands/view/' + response.data.id);
            }
            setFormData({ raspberry_slug: '', command_slug: '' });
        }).catch(function (error) {
            console.log(JSON.parse(error.request.response).message);
            setFormData({ raspberry_slug: formData.raspberry_slug, command_slug: formData.command_slug });
            if (error.response.status === 401) {
                logout();
                navigate('/', { replace: true });
            }
        });     
    };

    useEffect(() => {
        getRaspberries(new Event('init'));
        getCommands(new Event('init'));
    }, []);

    return (
        <div className="page-container">
                <h2>Commands Create <Button variant="contained" color="primary" onClick={goToCommands}>Back</Button></h2>
                <Box sx={{ '& > :not(style)': { m: 1, width: '100%' } }} noValidate autoComplete="off">
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 250 }}>
                        <InputLabel id="label-raspberry">Rasberry</InputLabel>
                        <Select labelId="label-raspberry" id="input-raspberry" name="raspberry_slug" value={formData.raspberry_slug} onChange={handleChange}>
                            {
                                raspberries.map((rasp) => (
                                    <MenuItem key={rasp.id} value={rasp.slug}>{rasp.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 500 }}>
                        <InputLabel id="label-command">Command</InputLabel>
                        <Select labelId="label-command" id="input-command" name="command_slug" value={formData.command_slug} onChange={handleChange}>
                            {
                                commands.map((com) => (
                                    <MenuItem key={com.id} value={com.slug}>{com.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>  
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 100 }}>
                        <Box sx={{ '& > :not(style)': { m: 1, width: '100%' } }} noValidate autoComplete="off">
                            <Button variant="contained" color="success" onClick={handleSubmit}>Send</Button>
                        </Box>
                    </FormControl>
                </Box>
        </div>
    )
}

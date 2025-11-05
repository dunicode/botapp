import { useParams } from 'react-router';
import { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router";
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function CommandView() {
    const { isAuthenticated, logout, token } = useContext(AuthContext);
    const { historyId } = useParams();
    const [history, setHistory] = useState(null);
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();

    const getHistory = async () => {
        try {
            const url = import.meta.env.VITE_SERVER_URL;
            const response = await axios.get(
                `${url}/api/bot/history/${historyId}/`,
                {
                    headers: { 'Authorization': `Token ${token}` }
                }
            );
            
            setHistory(response.data);            
        } catch (error) {
            console.error('Error fetching history:', error);
            if (error.response) {
                console.log('Error details:', error.response.data);
            }
            console.log(error.response.status)
            if (error.response.status == 401) {
                logout();
                navigate('/', { replace: true });
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getHistory(); // Ejecutar inmediatamente
        
        const intervalId = setInterval(getHistory, 5000);
        
        return () => clearInterval(intervalId);
    }, [historyId, token]);

    if (loading) {
        return (
            <div className="page-container">
                <h2>Cargando historia...</h2>
            </div>
        )
    }

    if (!history) {
        return <div>No se pudo cargar la historia</div>;
    }

    const goToCommands = () => {
        navigate("/commands/");
    }

    return (
        <div className="page-container">
            <h2>Commands View {historyId} <Button variant="contained" onClick={goToCommands}>Back</Button></h2>
            <p>Raspberry: {history.raspberry_name}</p>
            <p>Command: {history.command_name}</p>
            <p>Exec: {history.command_comm}</p>
            <p>Status: {history.status}</p>
            <p>Result: {history.result || 'Sin resultado'}</p>
            
        </div>
    )
}

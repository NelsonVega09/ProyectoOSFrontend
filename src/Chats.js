import Grid from "@mui/material/Grid"
import { useState } from "react";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import AddCommentIcon from '@mui/icons-material/AddComment';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'

function Chats() {
    const [rooms, setRooms] = useState([0, 1, 2, 3, 4])
    const [messages, setMessages] = useState([0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1])
    const [contacts, setContacts] = useState([0, 1, 2])
    const [roomName, setRoomName] = useState("RoomName")
    const [message, setMessage] = useState('')

    return (
        <Stack direction="horizontal" divider={<Divider orientation="vertical" flexItem />} className="App">
            <Stack divider={<Divider orientation="horizontal" flexItem />} className="rooms">
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <h2>Rooms</h2>
                    <Tooltip title="Create new room">
                        <IconButton>
                            <AddCommentIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
                {rooms.map((room) => (
                    <Grid item direction="column" justifyContent="space-between" alignItems="center">
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <AccountCircleIcon />
                            <h3>Room name</h3>
                        </Grid>
                        <h3>Last message...</h3>
                    </Grid>
                ))}
            </Stack>
            <Grid item direction="column" justifyContent="space-between" alignItems="center" className="messages">
                <h2 className="roomTitle">{roomName}</h2>
                <Container  className="roomMessages">
                    <Stack spacing={2}>
                        {messages.map((message) => (
                            message === 0 ?
                                <Paper variant="outlined" className="messageOut">
                                    <h3>This is a message {message}</h3>
                                </Paper>
                                :
                                <Paper variant="outlined" className="messageIn">
                                    <h3>This is a message {message}</h3>
                                </Paper>
                        ))}
                    </Stack>
                </Container>
                <Grid container direction="row" justifyContent="space-between" alignItems="center" className="roomSendBar">
                    <Tooltip title="Add image">
                        <IconButton>
                            <AddPhotoAlternateIcon />
                        </IconButton>
                    </Tooltip>
                    <TextField variant="outlined" className="TextField" size="small" />
                    <Tooltip title="Send message">
                        <IconButton>
                            <SendIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </Stack>
    );
}

export default Chats;
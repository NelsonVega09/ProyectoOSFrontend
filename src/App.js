import './App.css';
import Paper from '@mui/material/Paper'
import Grid from "@mui/material/Grid"
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu'
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { useState } from "react";
import AddCommentIcon from '@mui/icons-material/AddComment';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import EditNotificationsIcon from '@mui/icons-material/EditNotifications';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import axios from 'axios'
import { wait } from '@testing-library/user-event/dist/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import CardActionArea from '@mui/material/CardActionArea';
import Card from '@mui/material/Card'

function App() {
  //INNER DATA
  const [userId, setUserId] = useState(0)
  const [logged, setLogged] = useState(false)
  const [roomId, setRoomId] = useState(0)
  const [roomName, setRoomName] = useState("RoomName")
  const [contactId, setContactId] = useState(0)
  const [reminderId, setReminderId] = useState(0)
  const [messageId, setMessageId] = useState(0)
  const [menuPoint, setMenuPoint] = useState({ x: 0, y: 0 })

  //DISPLAY
  const [rooms, setRooms] = useState([])
  const [messages, setMessages] = useState([])
  const [reminders, setReminders] = useState([])
  const [contacts, setContacts] = useState([])
  const [alert, setAlert] = useState('')
  const [preview, setPreview] = useState()

  //POPUPS
  const [menu, setMenu] = useState(null)
  const [messageMenu, setMessageMenu] = useState(false)

  const [popupUL, setPopupUL] = useState(false) //name, phone
  const [popupUA, setPopupUA] = useState(false) //name, phone
  const [popupUE, setPopupUE] = useState(false) //userId, name, phone

  const [popupCL, setPopupCL] = useState(false) //userId
  const [popupCA, setPopupCA] = useState(false) //userId, name, phone
  const [popupCE, setPopupCE] = useState(false) //contId, name, phone

  const [popupRL, setPopupRL] = useState(false) //userId
  const [popupRA, setPopupRA] = useState(false) //userId, motive, date
  const [popupRE, setPopupRE] = useState(false) //remindId, motive, date

  //get salas : userId
  const [popupSA, setPopupSA] = useState(false) //roomT, name, userId, date
  const [popupSE, setPopupSE] = useState(false) //roomId, name

  //send message: nameMessage, userId, salaId, message
  //get messages: roomId

  const [popupM, setPopupM] = useState(false) //General use popup for success/failure alerts

  const [popupP, setPopupP] = useState(false)

  //FORMS
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [motive, setMotive] = useState('')
  const [date, setDate] = useState('')
  const [sala, setSala] = useState('chat')
  const [message, setMessage] = useState('')
  const [file, setFile] = useState()

  //MENU
  const openMenu = (event) => {
    setMenu(event.currentTarget);
  }

  const closeMenu = () => {
    setMenu(null)
  }

  const openMessageMenu = (event) => {
    setMenuPoint({ x: event.pageX, y: event.pageY })
    setMessageMenu(true)
  }

  const closeMessageMenu = (event) => {
    setMessageMenu(false)
  }

  //OPEN POPUPS
  //USER
  const handleOpenDialogUL = () => {
    setPopupUL(true)
  }
  const handleOpenDialogUA = () => {
    setPopupUA(true)
  }
  const handleOpenDialogUE = () => {
    setPopupUE(true)
  }
  //CONTACT
  const handleOpenDialogCL = () => {
    handleGetContacts()
    setPopupCL(true)
  }
  const handleOpenDialogCA = () => {
    setPopupCA(true)
  }
  const handleOpenDialogCE = () => {
    setPopupCE(true)
  }
  //REMINDER
  const handleOpenDialogRL = () => {
    handleGetReminders()
    setPopupRL(true)
  }
  const handleOpenDialogRA = () => {
    setPopupRA(true)
  }
  const handleOpenDialogRE = () => {
    setPopupRE(true)
  }
  //ROOM(SALA)
  const handleOpenDialogSA = () => {
    handleGetContacts()
    setPopupSA(true)
  }
  const handleOpenDialogSE = () => {
    setPopupSE(true)
  }
  //ALERT
  const handleOpenDialogM = () => {
    setPopupM(true)
  }
  const handleOpenDialogP = () => {
    setPopupP(true)
  }

  //CLOSE POPUPS
  //USER
  const handleCloseDialogUL = () => {
    setPopupUL(false)
  }
  const handleCloseDialogUA = () => {
    setPopupUA(false)
  }
  const handleCloseDialogUE = () => {
    setPopupUE(false)
  }
  //CONTACT
  const handleCloseDialogCL = () => {
    setPopupCL(false)
  }
  const handleCloseDialogCA = () => {
    setPopupCA(false)
  }
  const handleCloseDialogCE = () => {
    setPopupCE(false)
  }
  //REMINDER
  const handleCloseDialogRL = () => {
    setPopupRL(false)
  }
  const handleCloseDialogRA = () => {
    setPopupRA(false)
  }
  const handleCloseDialogRE = () => {
    setPopupRE(false)
  }
  //ROOM(SALA)
  const handleCloseDialogSA = () => {
    setPopupSA(false)
  }
  const handleCloseDialogSE = () => {
    setPopupSE(false)
  }
  //ALERT
  const handleCloseDialogM = () => {
    setPopupM(false)
  }
  const handleCloseDialogP = () => {
    setPopupP(false)
  }

  //HANDLES FORM DATA
  const handleChangeName = (event) => {
    setName(event.target.value)
  }

  const handleChangePhone = (event) => {
    setPhone(event.target.value)
  }

  const handleChangeMotive = (event) => {
    setMotive(event.target.value)
  }

  const handleChangeDate = (event) => {
    setDate(event.target.value)
  }

  const handleChangeSala = (event) => {
    setSala(event.target.value)
  }

  const handleChangeMessage = (event) => {
    setMessage(event.target.value)
  }

  const handleChangeFile = (event) => {
    setFile(event.target.files[0])
    setPreview(URL.createObjectURL(event.target.files[0]))
  }

  const handleGetMessages = () => {
    axios.get("http://localhost:8080/mensaje/get/" + roomId.toString()).then((response) => {
      wait()
      setMessages(response.data)
      wait()
      setMessage('')
    })
  }

  const handleSignIn = () => {
    axios.get("http://localhost:8080/usuario/sign-in/" + name + "/" + phone).then((response) => {
      const data = response.data
      if (data) {
        setLogged(true)
        setUserId(data.id_usuario)
        handleGetRooms()
        handleCloseDialogUL()
      } else {
        setAlert("Sign in failed. Check your info")
        handleOpenDialogM()
      }
    })
  }

  const handleSignUp = () => {
    axios.post("http://localhost:8080/usuario/sign-up", { "nombre": name, "telefono": phone }).then((response) => {
      setAlert(response.data)
      if (response.status === 200) {
        handleCloseDialogUA()
      }
    })
  }

  const handleEditProfile = () => {
    axios.put("http://localhost:8080/usuario/modify", { "id_usuario": userId, "nombre": name, "telefono": phone }).then((response) => {
      setAlert(response.data)
      handleOpenDialogM()
    })
  }

  const handleGetReminders = () => {
    axios.get("http://localhost:8080/recordatorio/get/" + userId.toString()).then((response) => {
      setReminders(response.data)
    })
  }

  const handleAddReminder = () => {
    const dateData = date.split('T')
    const dateFormat = dateData[0] + " " + dateData[1] + ":00"
    axios.post("http://localhost:8080/recordatorio/create", { "id_usuario": userId, "motivo": motive, "fecha": dateFormat }).then((response) => {
      setAlert(response.data)
      handleGetReminders()
      handleOpenDialogM()

    })
  }

  const handleEditReminder = () => {
    axios.put("http://localhost:8080/recordatorio/modify", { "id_recordatorio": reminderId, "motivo": motive, "fecha": date }).then((response) => {
      setAlert(response.data)
      handleGetReminders()
      handleOpenDialogM()
    })
  }

  const handleGetContacts = () => {
    axios.get("http://localhost:8080/usuario/get/" + userId.toString()).then((response) => {
      setContacts(response.data)
    })
  }

  const handleAddContact = () => {
    axios.post("http://localhost:8080/contacto/create", { "id_usuario": userId, "nombre_contacto": name, "numero": phone }).then((response) => {
      setAlert(response.data)
      handleGetContacts()
      handleOpenDialogM()
    })
  }

  const handleEditContact = () => {
    axios.put("http://localhost:8080/contacto/modify", { "id_contacto": contactId, "nombre_contacto": name, "numero_contacto": phone }).then((response) => {
      setAlert(response.data)
      handleGetContacts()
      handleOpenDialogM()
    })
  }

  const handleGetRooms = () => {
    axios.get("http://localhost:8080/sala/get/" + userId.toString()).then((response) => {
      setRooms(response.data)
    })
  }

  const handleAddRoom = () => {
    axios.post("http://localhost:8080/sala/create", { "nombre_tipo_sala": sala, "nombre_sala": name, "id_usuario": userId, "fecha": date }).then((response) => {
      setAlert(response.data)
      handleGetRooms()
      handleOpenDialogM()
    })
  }

  const handleEditRoom = () => {
    axios.put("http://localhost:8080/sala/modify", { "id_sala": roomId, "nombre_sala": name }).then((response) => {
      setAlert(response.data)
      handleGetRooms()
      handleOpenDialogM()
    })
  }

  const handleSendMessageNormal = () => {
    axios.post("http://localhost:8080/mensaje/send/normal", { "id_usuario": userId, "id_sala": roomId, "nombre_msj": "normal", "texto": message }).then((response) => {
      handleGetMessages()
    })
  }

  const handleSendMessageMultimedia = () => {
    axios.post("http://localhost:8080/mensaje/send/multimedia", { "id_usuario": userId, "id_sala": roomId, "nombre_msj": "normal", "texto": message }).then((response) => {
      handleGetMessages()
    })
  }

  const handleSignOut = () => {
    setLogged(false)
    setRooms([])
    setMessages([])
    setContacts([])
    setReminders([])
  }

  return (
    <div className="App">
      <header className="header">
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <h1>Chatter</h1>
          <Tooltip title="Account management">
            <IconButton onClick={openMenu}>
              <AccountCircleIcon fontSize='large' />
            </IconButton>
          </Tooltip>
          <Menu anchorEl={menu} keepMounted open={Boolean(menu)} onClose={closeMenu}>
            {logged ?
              <Stack direction="column" justifyContent="center" alignItems="center" divider={<Divider orientation="vertical" flexItem />}>
                <Button onClick={handleOpenDialogRL}>Reminders</Button>
                <Button onClick={handleOpenDialogCL}>Contacts</Button>
                <Button onClick={handleOpenDialogUE}>Edit profile</Button>
                <Button onClick={handleSignOut}>Sign out</Button>
              </Stack>
              :
              <Stack direction="column" justifyContent="center" alignItems="center" divider={<Divider orientation="vertical" flexItem />}>
                <Button onClick={handleOpenDialogUA}>Sign Up</Button>
                <Button onClick={handleOpenDialogUL}>Sign In</Button>
              </Stack>
            }
          </Menu>
        </Grid>
      </header>
      <body className="body">

        <Dialog onClose={handleCloseDialogRL} open={popupRL}>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={1} className="popup">
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <DialogTitle>Reminders</DialogTitle>
              <Tooltip title="Add reminder">
                <IconButton onClick={handleOpenDialogRA}>
                  <AddAlertIcon />
                </IconButton>
              </Tooltip>
            </Stack>
            {reminders.map((reminder) => (
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <h3>{reminder.motivo}</h3>
                <Tooltip title="Modify reminder">
                  <IconButton onClick={(e) => {
                    setReminderId(reminder.id_recordatorio)
                    handleOpenDialogRE()
                  }}>
                    <EditNotificationsIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            ))}
          </Stack>
        </Dialog>

        <Dialog onClose={handleCloseDialogRA} open={popupRA}>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={1} className="popup">
            <DialogTitle>Add reminder</DialogTitle>
            <h3>Motive</h3>
            <TextField onChange={handleChangeMotive} />
            <h3>Date</h3>
            <TextField
              type="datetime-local"
              onChange={handleChangeDate}
            />
            <Button onClick={handleAddReminder}>Confirm</Button>
          </Stack>
        </Dialog>

        <Dialog onClose={handleCloseDialogRE} open={popupRE}>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={1} className="popup">
            <DialogTitle>Add reminder</DialogTitle>
            <h3>Motive</h3>
            <TextField onChange={handleChangeMotive} />
            <h3>Date</h3>
            <TextField onChange={handleChangeDate} />
            <Button onClick={handleEditReminder}>Confirm</Button>
          </Stack>
        </Dialog>

        <Dialog onClose={handleCloseDialogUL} open={popupUL}>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={1} className="popup">
            <DialogTitle>Sign In</DialogTitle>
            <h3>Name</h3>
            <TextField onChange={handleChangeName} />
            <h3>Number</h3>
            <TextField onChange={handleChangePhone} />
            <Button onClick={handleSignIn}>Confirm</Button>
          </Stack>
        </Dialog>

        <Dialog onClose={handleCloseDialogUA} open={popupUA}>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={1} className="popup">
            <DialogTitle>Sign Up</DialogTitle>
            <h3>Name</h3>
            <TextField onChange={handleChangeName} />
            <h3>Number</h3>
            <TextField onChange={handleChangePhone} />
            <Button onClick={handleSignUp}>Confirm</Button>
          </Stack>
        </Dialog>

        <Dialog onClose={handleCloseDialogUE} open={popupUE}>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={1} className="popup">
            <DialogTitle>Edit Profile</DialogTitle>
            <h3>Name</h3>
            <TextField onChange={handleChangeName} />
            <h3>Number</h3>
            <TextField onChange={handleChangePhone} />
            <Button onClick={handleEditProfile}>Confirm</Button>
          </Stack>
        </Dialog>

        <Dialog onClose={handleCloseDialogCL} open={popupCL}>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={1} className="popup">
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <DialogTitle>Contacts</DialogTitle>
              <Tooltip title="Add reminder">
                <IconButton onClick={handleOpenDialogCA}>
                  <AddReactionIcon />
                </IconButton>
              </Tooltip>
            </Stack>
            {contacts.map((contact) => (
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <h3>{contact.nombre}</h3>
                <h3>....</h3>
                <h3>{contact.telefono}</h3>
                <Tooltip title="Modify contact">
                  <IconButton onClick={(e) => {
                    setContactId(contact.id_usuario)
                    handleOpenDialogCE()
                  }}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            ))}
          </Stack>
        </Dialog>

        <Dialog onClose={handleCloseDialogCA} open={popupCA}>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={1} className="popup">
            <DialogTitle>Add Contact</DialogTitle>
            <h3>Name</h3>
            <TextField onChange={handleChangeName} />
            <h3>Number</h3>
            <TextField onChange={handleChangePhone} />
            <Button onClick={handleAddContact}>Confirm</Button>
          </Stack>
        </Dialog>

        <Dialog onClose={handleCloseDialogCE} open={popupCE}>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={1} className="popup">
            <DialogTitle>Edit Contact</DialogTitle>
            <h3>Name</h3>
            <TextField onChange={handleChangeName} />
            <h3>Number</h3>
            <TextField onChange={handleChangePhone} />
            <Button onClick={handleEditContact}>Confirm</Button>
          </Stack>
        </Dialog>

        <Dialog onClose={handleCloseDialogSA} open={popupSA}>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={1} className="popup">
            <DialogTitle>Add Room</DialogTitle>
            <h3>Type</h3>
            <Select defaultValue={"chat"} onChange={handleChangeSala}>
              <MenuItem value="grupo">Group chat</MenuItem>
              <MenuItem value="chat">Direct chat</MenuItem>
            </Select>
            {sala === "chat" ?
              <Stack direction="column" justifyContent="center" alignItems="center" spacing={1} className="popup">
                <h3>Contacts</h3>
                <Select onChange={handleChangeName}>
                  {contacts.map((contact) => (
                    <MenuItem value={contact.nombre}>{contact.nombre}</MenuItem>
                  ))}
                </Select>
              </Stack>
              :
              <Stack direction="column" justifyContent="center" alignItems="center" spacing={1} className="popup">
                <h3>Name</h3>
                <TextField onChange={handleChangeName} />
              </Stack>
            }
            <Button onClick={handleAddRoom}>Confirm</Button>
          </Stack>
        </Dialog>

        <Dialog onClose={handleCloseDialogSE} open={popupSE}>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={1} className="popup">
            <DialogTitle>Edit Room</DialogTitle>
            <h3>Name</h3>
            <TextField onChange={handleChangeName} />
            <Button onClick={handleEditRoom}>Confirm</Button>
          </Stack>
        </Dialog>

        <Dialog onClose={handleCloseDialogM} open={popupM}>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={1} className="popup">
            <DialogTitle>{alert}</DialogTitle>
          </Stack>
        </Dialog>

        <Dialog onClose={handleCloseDialogP} open={popupP}>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={1} className="popup">
            <DialogTitle>File upload</DialogTitle>
            {file ?
              file.type.includes('image') ?
                <img src={preview} width="400" />
                :
                <h3>{file.name}</h3>
              :
              <h3>You can preview your file here</h3>}
            <Button
              variant="contained"
              component="label"
            >
              Upload File
              <input
                type="file"
                hidden
                onChange={handleChangeFile}
              />
            </Button>
            <Button onClick={handleSendMessageMultimedia}>Confirm</Button>
          </Stack>
        </Dialog>

        <Stack direction="horizontal" divider={<Divider orientation="vertical" flexItem />} className="chats">
          <Stack divider={<Divider orientation="horizontal" flexItem />} className="rooms">
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
              <h2>Rooms</h2>
              <Tooltip title="Create new room">
                <IconButton onClick={handleOpenDialogSA}>
                  <AddCommentIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            {rooms.map((room) => (
              <Stack direction="row" justifyContent="flex-start" alignItems="center">
                <Tooltip title="Open room">
                  <IconButton onClick={(e) => {
                    setMessages([])
                    setRoomId(room.id_sala)
                    handleGetMessages()
                    setRoomName(room.nombre)
                  }}>
                    <AccountCircleIcon />
                  </IconButton>
                </Tooltip>
                <h3>{room.nombre}</h3>
                <Tooltip title="Edit room">
                  <IconButton onClick={(e) => {
                    setRoomId(room.id_sala)
                    setMessages([])
                    handleGetMessages()
                    handleOpenDialogSE()
                  }}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            ))}
          </Stack>
          <Stack divider={<Divider orientation="horizontal" flexItem />} className="messages" justifyContent="center" direction="column" alignItems="center">
            <Stack className="messagesTitle" justifyContent="center" direction="row" alignItems="center">
              <h3>{roomName} ({roomId})</h3>
            </Stack>
            <Stack spacing={1} className="roomMessages">
              {messages.map((message) => (
                <Grid container direction="column" justifyContent="center" alignItems={message.id_usuario_msj.id_usuario === userId ? "flex-end" : "flex-start"} className="message">
                  <Card variant="outlined" className={message.id_usuario_msj.id_usuario === userId ? "messageOut" : "messageIn"}>
                    <CardActionArea onClick={openMessageMenu}>
                      {message.id_tipo_msj.nombre === "normal" ? <h3>{message.texto}</h3> : <h3>[multimedia]</h3>}
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
              {messageMenu ?
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                  <Tooltip title="Edit message">
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete message">
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
                :
                <div></div>
              }
            </Stack>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" className="roomSendBar">
              <Tooltip title="Add image">
                <IconButton onClick={handleOpenDialogP}>
                  <AddPhotoAlternateIcon />
                </IconButton>
              </Tooltip>
              <TextField variant="outlined" className="TextField" size="small" onChange={handleChangeMessage} />
              <Tooltip title="Send message">
                <IconButton onClick={handleSendMessageNormal}>
                  <SendIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Stack>
        </Stack>
      </body>
    </div>
  );
}

export default App;

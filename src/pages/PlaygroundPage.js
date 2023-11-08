import { useEffect, useRef, useState, forwardRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Navbar from "../components/Navbar";
import Editor from "../components/Editor";

import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Container } from "@mui/material";

import { initSocket } from "../socket";
import socketEvents from "../socketEvents";

const drawerWidth = 240;

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const colortheme = createTheme({
    palette: {
        black: {
            main: "#1f1f1f",
        },
    },
});

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(" ")[0][0]}`,
    };
}

const Playground = (props) => {
    const { state } = useLocation();
    const { roomId } = useParams();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const [avatarList, setAvatarList] = useState([]);
    const [alertContent, setAlertContent] = useState("");

    const socketRef = useRef(null);
    const FRONTEND_URL = `https://${process.env.FRONTEND_HOST}.onrender.com`;

    // The useRef Hook allows you to persist values between renders. useRef is powerful
    // because it's persisted between renders. Unlike useState, useRef doesn't cause a
    // component to re-render when the value or state changes.

    const onPlusClick = (e) => {
        console.log(e);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAlertOpen = () => {
        setAlertOpen(true);
    };

    const handleAlertClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlertOpen(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`${FRONTEND_URL}/new/${roomId}`);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
            setOpen(false);
        }, 2000);
    };

    const currentUsername = state.username;

    const renderedAvatarList = avatarList.map((avatar) => (
        <Avatar key={avatar.socketId} {...stringAvatar(avatar.username)} />
    ));

    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();

            socketRef.current.on("connect_error", (err) => handleErrors(err));
            socketRef.current.on("connect_failed", (err) => handleErrors(err));

            function handleErrors(e) {
                console.log("Socket Error: ", e);
                navigate("/");
            }

            socketRef.current.emit(socketEvents.JOIN, {
                roomId,
                currentUsername,
            });

            socketRef.current.on(socketEvents.JOINED, ({ clients, username, socketId }) => {
                if (username !== currentUsername) {
                    setAlertContent(`${username} joined the room`);
                    handleAlertOpen();
                    console.log(`${username} joined`);
                }
                setAvatarList(clients);
                console.log(clients);
            });

            socketRef.current.on(socketEvents.DISCONNECTED, ({ socketId, username }) => {
                setAlertContent(`${username} left the room`);
                handleAlertOpen();
                setAvatarList((prev) => {
                    return prev.filter((client) => client.socketId !== socketId);
                });
            });
        };
        init();

        return () => {
            // Destructor
            socketRef.current.disconnect();
            socketRef.current.off(socketEvents.JOINED);
            socketRef.current.off(socketEvents.DISCONNECTED);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ThemeProvider theme={colortheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <Navbar></Navbar>
                <Box
                    component="nav"
                    sx={{
                        width: { sm: drawerWidth - 100 },
                        flexShrink: { sm: 0 },
                        zIndex: "0",
                    }}
                    aria-label="mailbox folders">
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: "none", sm: "block" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: drawerWidth - 100,
                                alignItems: "center",
                                backgroundColor: "#1f1f1f",
                                borderRight: "groove",
                                borderRightWidth: "thin",
                                borderRightColor: "#9d9696",
                            },
                        }}
                        open>
                        <Toolbar />
                        <>
                            <Stack
                                direction="column"
                                spacing={2}
                                paddingTop="15px"
                                sx={{ alignItems: "center" }}>
                                {renderedAvatarList}
                                <IconButton onClick={onPlusClick}>
                                    <Avatar
                                        sx={{
                                            bgcolor: "#bdbdbd30",
                                            borderColor: "#9d9696",
                                            borderWidth: "thin",
                                        }}>
                                        +
                                    </Avatar>
                                </IconButton>
                            </Stack>

                            <Dialog open={open} onClose={handleClose}>
                                <Container
                                    sx={{
                                        backgroundColor: "#1b1b1b",
                                    }}>
                                    <DialogTitle sx={{ color: "white" }}>Add New User</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText sx={{ color: "white" }}>
                                            Copy & Share the link with your fellow programmers,
                                            teammates, or mentors. They can join your coding session
                                            using this link.
                                        </DialogContentText>
                                        <DialogContentText>
                                            {/* <Link>
                                                <a
                                                    href={`http://localhost:3000/new/${roomId}`}
                                                >
                                                    Copy Link To Share
                                                </a>
                                            </Link> */}
                                        </DialogContentText>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="Email Address"
                                            type="email"
                                            fullWidth
                                            variant="standard"
                                            sx={{ color: "white" }}
                                            color="primary"
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} sx={{ color: "white" }}>
                                            Cancel
                                        </Button>
                                        <Button onClick={copyToClipboard} sx={{ color: "white" }}>
                                            {copied ? "Copied!" : "Copy Link"}
                                        </Button>
                                    </DialogActions>
                                </Container>
                            </Dialog>
                        </>
                    </Drawer>
                </Box>

                <Editor socketRef={socketRef} roomId={roomId}></Editor>

                <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
                    <Alert onClose={handleAlertClose} severity="success" sx={{ width: "100%" }}>
                        {alertContent}
                    </Alert>
                </Snackbar>
            </Box>
        </ThemeProvider>
    );
};

export default Playground;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import { IconButton } from "@mui/material";

const drawerWidth = 240;
function stringToColor(string) {
    return "#d19e8b";  // TODO - ADD Multi Colour
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(" ")[0][0]}`,
    };
}

function SideBar(props) {
    const [open, setOpen] = useState(false);
    const { roomId } = useParams();
    const [avatarList, setAvatarList] = useState([{ socketId: 1, username: props.user }]);

    const renderedAvatarList = avatarList.map((avatar) => (
        <Avatar key={avatar.socketId} {...stringAvatar(avatar.username)} />
    ));

    const { clients } = props;

    if (clients) {
        clients.push({ socketId: 1, username: props.user });
    }

    console.log(clients);
    useEffect(() => {
        if (clients) {
            setAvatarList(props.clients);
        }
    }, []);

    const onPlusClick = (e) => {
        console.log(e);
        setOpen(true);
    };

    const { window } = props;
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <Box
                component="nav"
                sx={{
                    width: { sm: drawerWidth - 100 },
                    flexShrink: { sm: 0 },
                    zIndex: "0",
                }}
                aria-label="sidebar avatars">
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
                    </>
                </Drawer>
            </Box>
        </>
    );
}

export default SideBar;

import { Container } from "@mui/system";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { themeLayout } from "../styles/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Header from "../components/Header";
import { CssTextField } from "../styles/styles";

import { Grid, Stack, Typography, Button, Box } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";

const Invite = () => {
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { roomId } = useParams();

    const sendDetails = () => {
        if (username === "") {
            alert("Please Enter Valid Username");
        } else {
            setIsLoading(true);
            navigate(`/playground/${roomId}`, {
                state: {
                    username,
                    roomId,
                },
            });
            setIsLoading(false);
        }
    };

    return (
        <ThemeProvider theme={themeLayout}>
            <CssBaseline />
            <Header />
            <Container>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        minHeight: "600px",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    <Grid
                        container
                        spacing={6}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            maxWidth: "1300px",
                            padding: "50px",
                            justifyContent: "center",
                        }}>
                        <Grid
                            item
                            xs={12}
                            md={7}
                            sx={{
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                            <Typography
                                variant="h3"
                                fontWeight={700}
                                sx={{
                                    paddingBottom: "7px",
                                    fontFamily: "Rajdhani",
                                }}>
                                Playground Invite
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    opacity: "0.9",
                                    paddingBottom: "30px",
                                    fontFamily: "Rajdhani",
                                }}>
                                Your friend has invited you to their coding playground. Kindly enter
                                your username below to get started. Happy Coding!
                            </Typography>

                            <Stack direction="row" spacing={2}>
                                <CssTextField
                                    fullWidth
                                    variant="outlined"
                                    label="Type a username"
                                    id="custom-css-outlined-input"
                                    inputProps={{ color: "white" }}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && sendDetails()}
                                />
                                <Button
                                    variant="contained"
                                    startIcon={<CodeIcon />}
                                    sx={{
                                        width: "300px",
                                        fontSize: "16px",
                                        fontFamily: "Rajdhani",
                                    }}
                                    onClick={(e) => {
                                        sendDetails();
                                    }}
                                    disabled={isLoading}>
                                    {isLoading ? "Creating..." : "Join Playground"}
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Invite;

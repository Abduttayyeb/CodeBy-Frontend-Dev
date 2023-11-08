import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

import { Grid, Typography, Button, Box } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import circleImg from "../assets/images/circleGradient.jpg";
import { CssTextField } from "../styles/styles";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BACKEND_URL = `https://${process.env.BACKEND_HOST}.onrender.com`;

const Hero = () => {
    const [alertOpen, setAlertOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [alertContent, setAlertContent] = useState("");
    const [username, setUsername] = useState("");

    const navigate = useNavigate();
    let roomId;

    const handleAlertOpen = () => {
        setAlertOpen(true);
    };

    const handleAlertClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlertOpen(false);
    };

    const createPlayground = async () => {
        if (username === "") {
            setAlertContent(`Kindly enter a valid username`);
            handleAlertOpen();
        } else {
            // Send a request to backend for room creation
            setIsLoading(true);
            roomId = nanoid();
            try {
                console.log("Making request to create playground");

                await axios.post(`${BACKEND_URL}/create-room`, {
                    username,
                    roomId,
                });

                setIsLoading(false);
            } catch (err) {
                console.error(err);

                setIsLoading(false);

                setAlertContent(`Something went wrong. Please try again.`);
                handleAlertOpen();
            }

            navigate(`/playground/${roomId}`, {
                state: {
                    username,
                    roomId,
                },
            });
        }
    };

    return (
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
                }}>
                <Grid item xs={12} md={7}>
                    <Typography
                        variant="h3"
                        fontWeight={700}
                        sx={{ paddingBottom: "7px", fontFamily: "Rajdhani" }}>
                        Intelligent. Interactive.
                    </Typography>
                    <Typography
                        variant="h3"
                        fontWeight={700}
                        sx={{
                            paddingBottom: "15px",
                            fontFamily: "Rajdhani",
                            textDecoration: "underline",
                            color: "#327bee",
                        }}>
                        Collaboration
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            opacity: "0.9",
                            paddingBottom: "30px",
                            fontFamily: "Rajdhani",
                        }}>
                        Empower your team to build better, faster, together. Conduct technical
                        interviews like never before and Streamline your remote interviewing process
                    </Typography>

                    <Stack direction="row" spacing={2}>
                        <CssTextField
                            fullWidth
                            variant="outlined"
                            label="Type a username"
                            id="custom-css-outlined-input"
                            inputProps={{ color: "white" }}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && createPlayground()}
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
                                createPlayground();
                            }}
                            disabled={isLoading}>
                            {isLoading ? "Creating..." : "Share Code"}
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={5}>
                    <img src={circleImg} alt="My Team" style={{ width: "100%" }} />
                </Grid>

                <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
                    <Alert onClose={handleAlertClose} severity="success" sx={{ width: "100%" }}>
                        {alertContent}
                    </Alert>
                </Snackbar>
            </Grid>
        </Box>
    );
};

export default Hero;

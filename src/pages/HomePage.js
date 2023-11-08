import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import Hero from "../components/Hero";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { themeLayout } from "../styles/styles";

const Home = () => {
    return (
        <>
            <ThemeProvider theme={themeLayout}>
                <CssBaseline />
                <Header />
                <Hero />
                <Footer />
            </ThemeProvider>
        </>
    );
};

export default Home;

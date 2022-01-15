import React from "react";
import "../css/Image.css";
import {Link} from "react-router-dom";
import {Button, ButtonGroup, Chip, Grid, IconButton, Paper,} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {createTheme} from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ContentCopyIcon from "@material-ui/icons/FileCopy";
import BackIcon from "@material-ui/icons/ArrowBack";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Typography from "@material-ui/core/Typography";
import {animated, useSpring} from "react-spring";
import useIntersectionObserver from "../hooks/use-intersection-observer";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Fade = React.forwardRef(function Fade(props, ref) {
    const {in: open, children, onEnter, onExited, ...other} = props;
    const style = useSpring({
        from: {opacity: 0},
        to: {opacity: open ? 1 : 0},
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

const theme = createTheme();
const chipStyle = {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
        margin: theme.spacing(4),
    },
};
const paperStyle = {
    padding: 30,
    margin: "auto",
    maxWidth: 1200,
    flexGrow: 1,
    bgcolor: "background.paper",
    boxShadow: 28,
    p: 4,
};

function Images({data}) {
    const downloadImage = async () => {
        try {
            const response = await fetch(data.imageUrl);
            const blob = await response.blob();
            // convert the blob to Data String Url
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement("a");
            a.style = "display: none";
            document.body.appendChild(a);
            a.href = url;
            a.download = data.title;
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            alert("Something Went Wrong... Unable to Download Images");
        }
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selected, setSelected] = React.useState(false);
    const ref = React.useRef();
    const [isVisible, setIsVisible] = React.useState(false);
    const [openSnackbar, setSnackbarOpen] = React.useState(false);
    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarOpen(false);
    };

    useIntersectionObserver({
        target: ref,
        onIntersect: ([{isIntersecting}], observerElement) => {
            if (isIntersecting) {
                setIsVisible(true);
                observerElement.unobserve(ref.current);
            }
        },
    });
    let img = new Image();
    img.url = data.imageUrl;
    // console.log(img);
    return (
        <div id="fleximg" className="image">
            <div className="image__header" id="btn">
                <Button
                    id="Favorite fav"
                    variant="contained"
                    size="small"
                    disableElevation
                    className={selected ? "image__button like" : "image__button"}
                    onClick={() => {
                        setSelected(!selected);
                        var element = document.getElementById("Favorite");
                        if (selected) element.classList.add("like");
                        else element.classList.remove("like");
                    }}
                >
                    <FavoriteIcon id="Favorite" fontSize="small"/>
                </Button>
                <div className="pad"></div>
                <Button
                    variant="contained"
                    size="small"
                    id="copy"
                    disableElevation
                    className="image__button"
                    title="Copy to Clipboard"
                    onClick={() => {
                        setSnackbarOpen(true);
                        navigator.clipboard.writeText(data.downloadUrl);
                    }}
                >
                    <ContentCopyIcon fontSize="small"/>
                </Button>
            </div>

            <div id="img" ref={ref}>
                {isVisible && (
                    <img
                        src={data.imageUrl}
                        onClick={handleOpen}
                        alt=""
                        // onLoad={imageLoaded}
                        className="image__img point"
                    />
                )}
            </div>

            <Modal
                style={{overflow: "scroll"}}
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Paper className="paper" style={paperStyle}>
                    <Fade in={open}>
                        <Grid container direction="column" justifyContent="center">
                            <Grid
                                className="paper__title"
                                container
                                item
                                direction="row"
                                alignItems="stretch"
                                justifyContent="space-between"
                            >
                                <Grid item>
                                    <Typography
                                        id="spring-modal-title"
                                        variant="h4"
                                        component="h2"
                                        gutterBottom
                                    >
                                        {data.title}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <ButtonGroup variant="outlined">
                                        <Button
                                            id="Favorite"
                                            variant="outlined"
                                            size="small"
                                            disableElevation
                                            className={
                                                selected ? "image__button like" : "image__button"
                                            }
                                            onClick={() => {
                                                setSelected(!selected);
                                                var element = document.getElementById("Favorite");
                                                if (selected) element.classList.add("like");
                                                else element.classList.remove("like");
                                            }}
                                        >
                                            <FavoriteIcon id="Favorite" fontSize="small"/>
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            disableElevation
                                            className="image__button"
                                            title="Copy to Clipboard"
                                            onClick={() => {
                                                setSnackbarOpen(true);
                                                navigator.clipboard.writeText(data.downloadUrl);
                                            }}
                                        >
                                            <ContentCopyIcon id="Copy URL" fontSize="small"/>
                                        </Button>{" "}
                                    </ButtonGroup>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                item
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item>
                                    <img src={data.imageUrl} alt="" className="image__img"/>
                                </Grid>
                            </Grid>

                            <div style={{height: "20px"}}/>
                            <Grid
                                className="paper__description"
                                container
                                item
                                direction="row"
                                alignItems="stretch"
                                justifyContent="space-between"
                            >
                                <Grid item>
                                    <Typography
                                        id="spring-modal-title"
                                        variant="h6"
                                        component="h2"
                                        gutterBottom
                                        color={"textSecondary"}
                                    >
                                        <CalendarIcon fontSize="small"/> Captured on {data.date}
                                    </Typography>
                                </Grid>{" "}
                                <Grid item>
                                    <ButtonGroup>
                                        <Button
                                            onClick={downloadImage}
                                            variant="contained"
                                            color="success"
                                            disableElevation
                                            className="download"
                                            title="Download Photo"
                                        >
                                            Download
                                        </Button>
                                    </ButtonGroup>
                                </Grid>
                            </Grid>
                            <Grid item className="paper__description">
                                <Typography
                                    id="spring-modal-title"
                                    gutterBottom={true}
                                    variant="h6"
                                    component="div"
                                >
                                    Description
                                </Typography>
                                <Typography
                                    id="spring-modal-description"
                                    variant="body1"
                                    gutterBottom
                                    color={"textSecondary"}
                                >
                                    {data.description}{" "}
                                </Typography>
                            </Grid>

                            {data.keywords && (
                                <Grid item>
                                    <div style={{height: "20px"}}/>
                                    <Typography
                                        id="spring-modal-title"
                                        gutterBottom={true}
                                        variant="h6"
                                        component="div"
                                    >
                                        Keywords
                                    </Typography>
                                    <div style={chipStyle}>
                                        {data.keywords.map((key, i) => {
                                            return (
                                                <Link to={`/s/${key}`}>
                                                    {" "}
                                                    <Chip
                                                        key={i}
                                                        className="image__tags"
                                                        label={key}
                                                        onClick={handleClose}
                                                    />
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </Grid>
                            )}
                            <IconButton
                                aria-label="back"
                                className="back__button"
                                size="large"
                                onClick={handleClose}
                            >
                                <BackIcon fontSize="inherit"/>
                            </IconButton>
                        </Grid>
                        <Snackbar
                            open={openSnackbar}
                            autoHideDuration={2000}
                            onClose={handleSnackbarClose}
                        >
                            <Alert onClose={handleSnackbarClose} severity="success">
                                ✔ Copied to Clipboard
                            </Alert>
                        </Snackbar>
                    </Fade>
                </Paper>
            </Modal>
            {/*<div className="image__footer">*/}
            <div id="title" className="image__footer">
                {" "}
                <div className="image__footerLeft">
                    <h4 className="image__footerLeftName">{data.title}</h4>
                </div>
            </div>
            <div id="dlbtn" className="image__footer">
                <Button
                    onClick={downloadImage}
                    variant="contained"
                    size="small"
                    disableElevation
                    className="image__button bottem__right"
                    title="Download Photo"
                >
                    <ArrowDownwardIcon fontSize="small"/>
                </Button>
            </div>
            {/*</div>*/}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity="success">
                    ✔ Copied to Clipboard
                </Alert>
            </Snackbar>
            <div className="img__spacing"></div>
        </div>
    );
}

export default Images;

import React from "react";
import "../css/Image.css";
import {Link} from "react-router-dom";
import {Button, ButtonGroup, Chip, Grid, Paper} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {createTheme} from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ContentCopyIcon from "@material-ui/icons/FileCopy";
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

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     // justifyContent: 'center',
//     flexWrap: "wrap",
//     "& > *": {
//       margin: theme.spacing(0.5),
//     },
//   },
// }));
const theme = createTheme();
const chipStyle = {
    display: "flex",
    // justifyContent: 'center',
    flexWrap: "wrap",
    "& > *": {
        margin: theme.spacing(4),
    },
};
const paperStyle = {
    // width: 900,
    // p: 2,
    padding: 30,
    margin: "auto",
    maxWidth: 1200,
    flexGrow: 1,
    // position: "absolute",
    // top: "50%",
    // left: "50%",
    // overflow: "scroll",
    // display: "block",
    // transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 28,
    p: 4,
};

function Images({data}) {
    // // console.log(data);
    // const downloadFile = () => {
    //     window.location.href = data.downloadUrl;
    //     // FileSaver.saveAs(data.downloadUrl);
    // };
    const downloadImage = async () => {
        try {
            const response = await fetch(data.downloadUrl);
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
    const [loading, setLoading] = React.useState(true);
    const counter = React.useRef(0);
    const imageLoaded = () => {
        setLoading(false);
    };
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
        <div className="image">
            <div className="image__header">
                <Button
                    id="Favorite"
                    // onClick={handleFavoriteSwitch}
                    variant="contained"
                    size="small"
                    disableElevation
                    className="image__button"
                    // selected={selected}
                    className={selected ? "like" : ""}
                    onClick={() => {
                        setSelected(!selected);
                        var element = document.getElementById("Favorite");
                        if (selected) element.classList.add("like");
                        else element.classList.remove("like");
                    }}
                >
                    <FavoriteIcon id="Favorite" fontSize="small"/>
                </Button>
                &nbsp; &nbsp; &nbsp;
                {/*<Tooltip  placement="top" title="✔ Copied to Clipboard">*/}
                <Button
                    variant="contained"
                    size="small"
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
                {/*</Tooltip>*/}
            </div>
            <div
                ref={ref}
                className="image-container"
                style={{display: loading ? "block" : "none", paddingBottom: 0.75}}
            ></div>

            {isVisible && (
                <div className={{display: loading ? "none" : "block"}}>
                    <img
                        src={data.imageUrl}
                        onClick={handleOpen}
                        alt=""
                        onLoad={imageLoaded}
                        className="image__img point"
                    />
                </div>
            )}

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
                <Paper style={paperStyle}>
                    <Fade in={open}>
                        {/*<Box>*/}
                        <Grid
                            container
                            // sx={{padding:20,}}
                            // spacing={1}
                            // md={6}
                            // xs={12}
                            direction="column"
                            justifyContent="center"
                        >
                            {/*<Paper Elevation={0} style={{height: '100%',}}>*/}
                            <Grid
                                container
                                item
                                // sx={{
                                //   p: 2,
                                //   height: '100%',
                                //   pt: "30px",
                                //   pb: "30px",
                                // }}
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
                                            className="image__button"
                                            className={selected ? "like" : ""}
                                            onClick={() => {
                                                setSelected(!selected);
                                                var element = document.getElementById("Favorite");
                                                if (selected) element.classList.add("like");
                                                else element.classList.remove("like");
                                            }}
                                        >
                                            <FavoriteIcon id="Favorite" fontSize="small"/>
                                        </Button>
                                        {/*<Tooltip  placement="top" title="✔ Copied to Clipboard">*/}
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
                            {/*</Paper>*/}

                            {/*</Tooltip>*/}

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
                                            // onClick={downloadImage}
                                            onClick={downloadImage}
                                            variant="contained"
                                            color="success"
                                            // size="small"
                                            disableElevation
                                            className="image__button download"
                                            title="Download Photo"
                                        >
                                            Download
                                        </Button>
                                    </ButtonGroup>
                                </Grid>
                            </Grid>
                            <Grid item>
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
                                            // console.log("Entered");
                                            // Return the element. Also pass key
                                            return (
                                                <Link to={`/s/${key}`}>
                                                    {" "}
                                                    <Chip
                                                        key={i}
                                                        // component="a" history.push(`/s/${key}`)
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
            <div className="image__footer">
                <a href={data.imageUrl} target="_blank" className="image__footerLeft">
                    {/*<Avatar src={data.imageUrl}>{data.title}</Avatar>*/}
                    <h4 className="image__footerLeftName">{data.title}</h4>
                </a>
                {/*<a href={data.downloadUrl} download="" target="" rel="noopener noreferrer" title="Download photo">*/}
                <Button
                    // onClick={downloadImage}
                    onClick={downloadImage}
                    variant="contained"
                    size="small"
                    disableElevation
                    className="image__button"
                    title="Download Photo"
                >
                    <ArrowDownwardIcon fontSize="small"/>
                </Button>
                {/*</a>*/}
            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity="success">
                    ✔ Copied to Clipboard
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Images;

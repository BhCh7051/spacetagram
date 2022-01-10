import React from "react";
import "../css/Image.css";
import {Avatar, Button, Grid, Paper, ButtonGroup} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ContentCopyIcon from "@material-ui/icons/FileCopy";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
// import Button from '@material-ui/core/Button';
import Modal from "@material-ui/core/Modal";
import {saveAs} from "file-saver";
import PropTypes from "prop-types";
import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";
// import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
// web.cjs is required for IE11 support
import {animated, useSpring} from "react-spring";
// web.cjs is required for IE11 support
import ImageLightbox from "./ImageLightbox";

var FileSaver = require("file-saver");
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

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const paperStyle = {
  // width: 900,
  // p: 2,
  padding: 20,
  margin: "auto",
  maxWidth: 1200,
  flexGrow: 1,
  // position: "absolute",
  // top: "50%",
  // left: "50%",
  // overflow: "scroll",
  // display: "block",
  // transform: "translate(-50%, -50%)",
  // bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Image({data}) {
  const downloadFile = () => {
    // window.location.href = data.downloadUrl;
    FileSaver.saveAs(data.downloadUrl);
  };
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
      alert("Something Went Wrong... Unable to Download Image");
    }
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selected, setSelected] = React.useState(false);
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
          <FavoriteIcon id="Favorite" fontSize="small" />
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
                navigator.clipboard.writeText(data.downloadUrl);
              }}
          >
            <ContentCopyIcon fontSize="small"/>
          </Button>
          {/*</Tooltip>*/}
        </div>
        <button onClick={handleOpen}>clickme</button>
        <img src={data.imageUrl} alt="" className="image__img"/>

        <ImageLightbox key={data.imageUrl} data={data}/>
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
                  spacing={2}
                  direction="column"
                  justifyContent="center"
              >
                <div>
                  <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                  >
                    <Grid item>
                      <Typography
                          id="spring-modal-title"
                          variant="h6"
                          component="h2"
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
                              navigator.clipboard.writeText(data.downloadUrl);
                            }}
                        >
                          <ContentCopyIcon id="Copy URL" fontSize="small"/>
                        </Button>{" "}
                      </ButtonGroup>
                      <Button
                          // onClick={downloadImage}

                          onClick={downloadFile}
                          variant="contained"
                          color="success"
                          // size="small"
                          disableElevation
                          // className="image__button"
                          title="Download Photo"
                      >
                        Download <ArrowDownwardIcon fontSize="small"/>
                      </Button>
                    </Grid>
                  </Grid>

                  {/*</Tooltip>*/}
                </div>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                  <Grid item>
                    <img src={data.imageUrl} alt="" className="image__img"/>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography id="spring-modal-title" variant="h6" component="h2">
                    {data.date}
                  </Typography>
                </Grid>{" "}
                <Grid item>
                  <Typography id="spring-modal-title" variant="h6" component="h2">
                    Description
                  </Typography>
                  <Typography id="spring-modal-description" sx={{mt: 2}}>
                    {data.description}{" "}
                  </Typography>
                </Grid>
              </Grid>
              {/*</Box>*/}
            </Fade>
          </Paper>
        </Modal>
        <div className="image__footer">
          <a href={data.profileUrl} target="_blank" className="image__footerLeft">
            <Avatar src={data.userImageUrl}>{data.title}</Avatar>
            <h4 className="image__footerLeftName">{data.title}</h4>
          </a>
          {/*<a href={data.downloadUrl}  download="" target="_blank" rel="noopener noreferrer" title="Download photo">*/}
          <Button
              // onClick={downloadImage}
              onClick={downloadFile}
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
      </div>
  );
}

export default Image;

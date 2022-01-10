import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// web.cjs is required for IE11 support
import {useSpring, animated} from "react-spring";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ContentCopyIcon from "@material-ui/icons/FileCopy";
import Image from "./Image";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ImageLightbox({data}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selected, setSelected] = React.useState(false);

  return (
      <div>
        {/*<Button onClick={handleOpen}>Open modal</Button>*/}
        <Modal
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
          <Fade in={open}>
            <Box sx={style}>
              <div className="image__header">
                <Typography id="spring-modal-title" variant="h6" component="h2">
                  {data.title}
                </Typography>
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
                      navigator.clipboard.writeText(data.downloadUrl);
                    }}
                >
                  <ContentCopyIcon fontSize="small"/>
                </Button>
                {/*</Tooltip>*/}
              </div>
              <img src={data.imageUrl} alt="" className="image__img"/>

              <Typography id="spring-modal-title" variant="h6" component="h2">
                {data.date}
              </Typography>
              <Typography id="spring-modal-title" variant="h6" component="h2">
                Description
              </Typography>
              <Typography id="spring-modal-description" sx={{mt: 2}}>
                {data.description}{" "}
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div>
  );
}

export default ImageLightbox;

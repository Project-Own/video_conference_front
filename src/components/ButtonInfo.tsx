import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core/SvgIcon/SvgIcon.js";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttons: {
      maxheight: "44px",
      minWidth: "44px",
      minHeight: "44px",
      maxWidth: "44px",
      background: "#FFFFFF",
      boxShadow: "0px 4px 6px 2px rgba(0, 0, 0, 0.30)",
      mixBlendMode: "overlay",
      borderRadius: "14px",
      "&:hover": {
        color: "white",
      },
    },
  })
);

interface IconInterface {
  iconActive: OverridableComponent<SvgIconTypeMap>;
  iconPassive: OverridableComponent<SvgIconTypeMap>;
  handleActiveToggle: () => void;
  handlePassiveToggle: () => void;
}

const ButtonInfo = (props: IconInterface) => {
  const [toggle, settoggle] = useState(false);
  const classes = useStyles();
  const { iconActive, iconPassive, handleActiveToggle, handlePassiveToggle } =
    props;

  const IconComp = toggle ? iconActive : iconPassive;
  // console.log(iconObj.icon.active);

  useEffect(() => {
    if (toggle) {
      handleActiveToggle();
    } else {
      handlePassiveToggle();
    }
  }, [handleActiveToggle, handlePassiveToggle, toggle]);

  return (
    <Button onClick={() => settoggle(!toggle)} className={classes.buttons}>
      <IconComp />
    </Button>
  );
};

export default ButtonInfo;

import Button from "@material-ui/core/Button";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { SvgIconTypeMap } from "@material-ui/core/SvgIcon/SvgIcon.js";

interface IconInterface {
  iconActive: OverridableComponent<SvgIconTypeMap>;
  iconPassive: OverridableComponent<SvgIconTypeMap>;
  state: boolean;
  handleToggle: () => void;
  iconOfLeft: boolean;
}

const ButtonInfo = (props: IconInterface) => {
  const { iconActive, iconPassive, state, handleToggle, iconOfLeft } = props;
  // console.log(iconName);
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      buttons: {
        maxheight: "44px",
        minWidth: "44px",
        minHeight: "44px",
        maxWidth: "44px",
        background: state ? "#FFFFFF" : iconOfLeft ? "#8b0000" : "#32CD32",
        color: state ? "rgb(52,52,52)" : "white",
        boxShadow: "0px 4px 6px 2px rgba(0, 0, 0, 0.30)",
        mixBlendMode: "overlay",
        borderRadius: "14px",
        "&:hover": {
          color: "white",
        },
      },
    })
  );
  const classes = useStyles();

  const IconComp = state ? iconActive : iconPassive;

  return (
    <Button onClick={() => handleToggle()} className={classes.buttons}>
      <IconComp />
    </Button>
  );
};

export default ButtonInfo;

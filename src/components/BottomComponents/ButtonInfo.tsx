import { SvgIconComponent } from "@mui/icons-material";
import { Button } from "@mui/material";

interface IconInterface {
  iconActive: SvgIconComponent;
  iconPassive: SvgIconComponent;
  state: boolean;
  handleToggle: () => void;
  iconOfLeft: boolean;
}

const ButtonInfo = (props: IconInterface) => {
  const { iconActive, iconPassive, state, handleToggle, iconOfLeft } = props;
  // console.log(iconName);

  const IconComp = state ? iconActive : iconPassive;

  return (
    <Button
      onClick={() => handleToggle()}
      variant="contained"
      color={state ? "success" : iconOfLeft ? "primary" : "secondary"}
      sx={{
        // maxheight: "44px",
        minWidth: "44px",
        // minHeight: "44px",
        maxWidth: "44px",

        boxShadow: "0px 4px 6px 2px rgba(0, 0, 0, 0.30)",
        // mixBlendMode: "overlay",
        borderRadius: "2em",
      }}
    >
      <IconComp />
    </Button>
  );
};

export default ButtonInfo;

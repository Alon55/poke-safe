import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import poke from "../assets/poke.png";
import {
  styled,
  alpha,
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  useMediaQuery,
  IconButton
} from "@mui/material";

export default function Header(props) {
  const { handleSearch, searchKey } = props;

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#20837F" }}>
      <Toolbar>
        <img src={poke} alt="logo poke" style={{ width: 35 }} />
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block", marginLeft: 10 } }}
        >
          POKE SAFE
        </Typography>
        <SearchInput>
          <StyledInputBase
            value={searchKey}
            placeholder="Search for your favorite Pokémon…"
            onChange={(e) => handleSearch(e.target.value)}
            startAdornment={
              <IconButton aria-label="delete" onClick={() => handleSearch('')}>
                <ClearIcon
                  fontSize="small"
                  sx={{ color: "#fff" }}
                />
              </IconButton>
            }
          />
        </SearchInput>
      </Toolbar>
    </AppBar>
  );
}

const SearchInput = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  margin: "auto 20px",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  return {
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: "5px 0px 5px",
      transition: "width 0.5s",
      width: isMobile ? "68vw" : "30vw",
      "&:focus": {
        width: isMobile ? "70vw" : "40vw",
      },
    },
  };
});

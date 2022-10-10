import React, { useState, useEffect } from "react";
import { Send, Settings } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import logo from "../assets/logo.png";
import {
  styled,
  alpha,
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputBase,
  Switch,
  SpeedDial,
  SpeedDialAction,
  useMediaQuery,
} from "@mui/material";

export default function Header(props) {
  const [newApiKey, setNewApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const { apiKey, handleApiKey, handleDateFormat, handleApperance } = props;

  useEffect(() => {
    !Boolean(apiKey) && setLoading(false);
  }, [apiKey]);

  const handleNewKey = () => {
    setLoading(true);
    handleApiKey(newApiKey);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#09CB9F" }}>
      <Toolbar>
        <img src={logo} alt="logo" />
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block", marginLeft: 10 } }}
        >
          SUPER HOST
        </Typography>
        <SearchInput>
          <StyledInputBase
            placeholder="Insert your API key…"
            onChange={(e) => setNewApiKey(e.target.value)}
            endAdornment={
              <LoadingButton
                size="small"
                loading={loading}
                onClick={handleNewKey}
                loadingPosition="center"
                variant="text"
                sx={{ minWidth: "40px" }}
                startIcon={
                  <Send
                    fontSize="small"
                    sx={{
                      color: "#fff",
                      transform: "rotate(-30deg)",
                      ...((loading || !Boolean(newApiKey.length)) && {
                        display: "none",
                      }),
                    }}
                  />
                }
              />
            }
          />
        </SearchInput>
        <Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }}>
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: "absolute", top: -28, right: 0 }}
            icon={<Settings fontSize="large" />}
            direction="down"
            FabProps={{
              sx: {
                alignSelf: "end",
                boxShadow: "none",
                backgroundColor: "#09CB9F !important",
              },
            }}
          >
            <SpeedDialAction
              icon={
                <div style={{ width: 300, height: 100, borderRadius: 10 }}>
                  <p>Date format</p>
                  <div style={{ pointerEvents: "auto" }}>
                    <span>dd/mm/yyyy</span>
                    <Switch
                      defaultChecked
                      color="default"
                      onChange={handleDateFormat}
                    />
                    <span>mm.dd.yyyy</span>
                  </div>
                </div>
              }
              sx={{
                width: 300,
                height: 100,
                borderRadius: 5,
                pointerEvents: "none",
              }}
            />
            <SpeedDialAction
              icon={
                <div style={{ width: 300, height: 100, borderRadius: 10 }}>
                  <p>Appearance</p>
                  <div style={{ pointerEvents: "auto" }}>
                    <span>Dark</span>
                    <Switch
                      defaultChecked
                      color="default"
                      onChange={handleApperance}
                    />
                    <span>Light</span>
                  </div>
                </div>
              }
              sx={{
                width: 300,
                height: 100,
                borderRadius: 5,
                pointerEvents: "none",
              }}
            />
          </SpeedDial>
        </Box>
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
      padding: "5px 0px 5px 20px",
      transition: "width 0.5s",
      width: isMobile ? "40vw" : "22vw",
      "&:focus": {
        width: isMobile ? "45vw" : "30vw",
      },
    },
  };
});

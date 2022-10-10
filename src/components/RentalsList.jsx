import React, { useState, useEffect } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  ListSubheader,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Chip,
  Divider,
} from "@mui/material";
import noData from "../assets/noData.png";
import moment from "moment";

export default function NestedList(props) {
  const [rentalsList, setentalsList] = useState([]);
  const [calenderEvents, setCalenderEvents] = useState([]);
  const [openCollapse, setOpenCollapse] = useState(false);
  const [apiKeyForEvent, setApiKeyForEvent] = useState("");
  const { apiKey, dateFormat, darkMode, handleApiKey } = props;

  const regionNames = new Intl.DisplayNames("en", { type: "region" });
  const currencyNames = new Intl.DisplayNames("en", { type: "currency" });

  useEffect(() => {
    if (Boolean(apiKey)) {
      fetch("https://eric.hosthub.com/api/2019-03-01/rentals", {
        method: "GET",
        headers: {
          Authorization: apiKey,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setentalsList([...data.data]);
          setApiKeyForEvent(apiKey);
          handleApiKey("");
        })
        .catch((error) => {
          setentalsList([]);
          handleApiKey("");
          console.error("Error:", error);
        });
    }
  }, [apiKey, handleApiKey]);

  const handleCollapse = (id) => {
    setCalenderEvents([]);
    if (id !== openCollapse) {
      setOpenCollapse(id);
      fetch(
        `https://eric.hosthub.com/api/2019-03-01/rentals/${id}/calendar-events`,
        {
          method: "GET",
          headers: {
            Authorization: apiKeyForEvent,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setCalenderEvents(data.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else setOpenCollapse(false);
  };

  return (
    <div
      style={{
        paddingTop: "100px",
        height: "100vh",
        backgroundColor: darkMode && "gray",
      }}
    >
      {" "}
      {rentalsList.length ? (
        <List
          component="nav"
          subheader={
            <ListSubheader
              sx={{
                padding: "0px 10%",
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: darkMode && "gray",
              }}
              component="div"
            >
              <b>My Rentals</b>{" "}
              <span>
                Last update: {moment().format(dateFormat)} &emsp;{" "}
                {moment().format("hh:mm")}
              </span>
            </ListSubheader>
          }
        >
          {rentalsList.map((rental) => (
            <div key={rental.id}>
              <ListItemButton
                style={{ padding: "10px 10%" }}
                onClick={() => handleCollapse(rental.id)}
              >
                <ListItemIcon>
                  <Chip
                    sx={{ marginRight: 5 }}
                    label={rental.status}
                    color={rental.status === "active" ? "success" : "default"}
                    variant="outlined"
                  />
                </ListItemIcon>
                <ListItemText primary={rental.name} />
                {openCollapse === rental.id ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                in={openCollapse === rental.id}
                timeout="auto"
                unmountOnExit
              >
                <List
                  sx={{
                    width: "80vw",
                    margin: "auto",
                    bgcolor: darkMode && "lightgray",
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  subheader={
                    <>
                      <ListSubheader
                        sx={{ bgcolor: darkMode && "lightgray" }}
                        component="div"
                        id="nested-list-subheader"
                      >
                        Country:{" "}
                        {rental.country && regionNames.of(rental.country)}{" "}
                        &emsp;&emsp; Currency:{" "}
                        {rental.currency && currencyNames.of(rental.currency)}
                      </ListSubheader>

                      <ListSubheader
                        sx={{ bgcolor: darkMode && "lightgray" }}
                        component="div"
                        id="nested-list-subheader"
                      >
                        Upcoming Calendar Events:
                      </ListSubheader>
                    </>
                  }
                >
                  {calenderEvents.length ? (
                    calenderEvents.map((calenderEvent) => (
                      <p key={calenderEvent.id} style={{ marginLeft: '25px' }}>
                        📆 <b>{calenderEvent.guest_name || "Guest"}</b> <br />
                        from:{" "}
                        {moment(calenderEvent.date_from).format(
                          dateFormat
                        )}{" "}
                        to: {moment(calenderEvent.date_to).format(dateFormat)}
                      </p>
                    ))
                  ) : (
                    <img
                      src={noData}
                      style={{ borderRadius: "50px" }}
                      alt="no data"
                    />
                  )}
                </List>
              </Collapse>
              <Divider />
            </div>
          ))}
        </List>
      ) : (
        <h1 style={{ padding: "40px", textAlign: "center" }}>
          👆 Please insert valid API key
        </h1>
      )}
    </div>
  );
}

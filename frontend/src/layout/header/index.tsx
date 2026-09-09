import { Fragment, useState, useEffect } from "react";
import { AppBar, Box, Typography } from "@mui/material";

function CurrentTime() {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>{time}</div>;
}

function Header() {
  return (
    <Fragment>
      <AppBar
        position="fixed"
        sx={{
          zIndex: 1300,
          boxShadow: "none",
          height: "64px"
        }}
      >
        <Box
          sx={{
            px: 3,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Typography variant="body2"><CurrentTime /></Typography>
        </Box>
      </AppBar>
    </Fragment>
  );
};

export default Header;
import React from "react";
import { AppBar, Button, Toolbar, Typography} from "@mui/material";
import { Box } from "@mui/system";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

function NavBar({token, setToken, children}) {


  return (
    <>
    <Box sx={{display: 'flex'}} >
        <AppBar component="nav" sx={{backgroundColor: "rgb(18, 18, 18)"}} >
          <Toolbar>
              <Typography sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}>
              <Button sx={{color: '#fff'}} >
                <EmojiEventsIcon sx={{width: 50, height: 50}} />
              TORNEO DEPORTIVO
              </Button>
            </Typography>
            <Box sx={{displayP: {xs: "none", sm: "block"}}} >
              {!token ?  <> <Button sx={{color: "#fff"}} >
                Register
              </Button>
              <Button sx={{ color: "#fff"}} >
                Login
              </Button> </> : <> <Button> Hola </Button> </>}
            </Box>
          </Toolbar>
        </AppBar>
    </Box>
      {children}
    </>
 )
}

export {NavBar};

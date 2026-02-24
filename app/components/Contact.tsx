import * as React from 'react'
import { Paper, Box, Card, CardActions, CardContent, Button, Typography, Stack } from '@mui/material'

export const Contact: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100vw',
        height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
        overflow: 'hidden',
        marginTop: 0, // To offset the fixed header
      }}
    >
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100%',
          objectFit: 'cover',
          margin: 0,
          zIndex: 0,
        }}
      >
        <source src="/vid/programming-vid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Content overlay */}
      <Box
        component="section"
        className="app-section"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          position: 'relative',
          zIndex: 1,
          maxWidth: '90%',
          margin: '0 auto',
        }}
      >
        <h1 style={{ color: '#fff', fontSize: '3rem', textAlign: 'center', fontFamily: 'var(--font-permanent-marker)' }}>Contact Me</h1>
        Leave a message.
        <Paper>
          <Stack direction="row">
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                  Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                  be•nev•o•lent
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
                <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                  Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                  be • nev • o • lent
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
                <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Stack>
        </Paper>
      </Box>
    </Box>
  )
}

export default Contact

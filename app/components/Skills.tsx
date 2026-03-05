'use client'

import * as React from 'react'
import { styled } from '@mui/material/styles'
import { Paper, Box, Card, CardActions, CardContent, Button, Typography, Stack, Grid } from '@mui/material'
import Image from 'next/image'
import Rating from '@mui/material/Rating'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.09) !important',
  backdropFilter: 'blur(5px)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderBottom: 'none',
  display: 'flex',
  flex: '1 1 auto',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
}))

const CardStyled = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.09) !important',
  backdropFilter: 'blur(5px)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderBottom: 'none',
  display: 'flex',
  flex: '1 1 auto',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.primary,
}))

interface SkillRating {
  js: number | undefined
  typescript: number | undefined
  react: number | undefined
  nodejs: number | undefined
  html5: number | undefined
  sass: number | undefined
  css3: number | undefined
  mongodb: number | undefined
  sqlserver: number | undefined
  mysql: number | undefined
  webpack: number | undefined
  php: number | undefined
  markdown: number | undefined
  gulp: number | undefined
}
export const Skills: React.FC = () => {
  const [value, setValue] = React.useState<SkillRating>({
    js: 4,
    typescript: 4,
    react: 4,
    nodejs: 3.5,
    html5: 5,
    sass: 4.2,
    css3: 5,
    mongodb: 3.5,
    sqlserver: 3.5,
    mysql: 3.5,
    webpack: 4.5,
    php: 3,
    markdown: 4.5,
    gulp: 4.5,
  })
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100vw',
        minHeight: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
        overflow: 'hidden',
        marginTop: 0, // To offset the fixed header
        backgroundColor: '#0a0a0a', // Black background as fallback for video
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
          backgroundColor: '#0a0a0a',
        }}
      >
        <source src="/vid/programming-vid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Content overlay */}
      <Box
        sx={{
          display: 'block',
          textAlign: 'center',
          minHeight: '100%',
          position: 'relative',
          zIndex: 1,
          maxWidth: '90%',
          margin: '0 auto',
          paddingTop: '100px',
        }}
      >
        <h2 style={{ color: '#fff', fontSize: '6rem', fontFamily: 'var(--font-permanent-marker)' }}>My Skills</h2>
        <h3 style={{ fontFamily: 'var(--font-caveat)', fontSize: '4.5rem' }}>Primary Stack</h3>
        <p>These are the tools I work with the most</p>
        <Grid container spacing={2} sx={{ my: 2, width: '100%' }}>
          <Grid size={12}>
            {/* <Item> */}
            <CardStyled sx={{ width: '100%', height: '100%' }}>
              <CardContent>
                <Grid container spacing={4} sx={{ mb: 2, width: '100%' }}>
                  <Grid size={3} sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <CardStyled sx={{ width: '100%', height: '100%' }}>
                      <CardContent>
                        <Stack spacing={2}>
                          <img src="/img/skills/js-logo.jpg" alt="JavaScript" width={120} height={120} />
                          <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', borderRadius: '100px', p: 0.5, alignItems: 'center' }}>
                            <Rating name="js" precision={0.5} value={value.js} readOnly />
                          </Box>
                        </Stack>
                      </CardContent>
                    </CardStyled>
                  </Grid>
                  <Grid size={3} sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <CardStyled sx={{ width: '100%', height: '100%' }}>
                      <CardContent>
                        <Stack spacing={2}>
                          <img src="/img/skills/typescript.png" alt="TypeScript" width={120} height={120} />
                          <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', borderRadius: '100px', p: 0.5, alignItems: 'center' }}>
                            <Rating name="typescript" precision={0.5} value={value.typescript} readOnly />
                          </Box>
                        </Stack>
                      </CardContent>
                    </CardStyled>
                  </Grid>
                  <Grid size={3} sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'column' }}>
                    <CardStyled sx={{ width: '100%', height: '100%' }}>
                      <CardContent sx={{ alignItems: 'center', display: 'flex' }}>
                        <Stack spacing={2} alignContent={'center'}>
                          <img src="/img/skills/reactjs.png" alt="React" width={120} height={120} />
                          <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', borderRadius: '100px', p: 0.5, alignItems: 'center' }}>
                            <Rating name="react" precision={0.5} value={value.react} readOnly />
                          </Box>
                        </Stack>
                      </CardContent>
                    </CardStyled>
                  </Grid>
                  <Grid size={3} sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', justifyItems: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                    <CardStyled sx={{ width: '100%', height: '100%' }}>
                      <CardContent>
                        <Stack spacing={2} alignContent={'center'}>
                          <img src="/img/skills/node-logo-dark.svg" alt="Node.js" width={120} height={120} />
                          <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', borderRadius: '100px', p: 0.5, alignItems: 'center' }}>
                            <Rating name="nodejs" precision={0.5} value={value.nodejs} readOnly />
                          </Box>
                        </Stack>
                      </CardContent>
                    </CardStyled>
                  </Grid>
                </Grid>

                <Grid container spacing={4} sx={{ mb: 2, width: '100%' }}>
                  <Grid size={3} sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <CardStyled sx={{ width: '100%', height: '100%' }}>
                      <CardContent>
                        <Stack spacing={2}>
                          <img src="/img/skills/dmHTML5_Logo_512.png" alt="JavaScript" width={120} height={120} />
                          <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', borderRadius: '200px', p: 0.5, alignItems: 'center' }}>
                            <Rating name="js" precision={0.5} value={value.html5} readOnly />
                          </Box>
                        </Stack>
                      </CardContent>
                    </CardStyled>
                  </Grid>

                  <Grid size={3} sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'column' }}>
                    <CardStyled sx={{ width: '100%', height: '100%' }}>
                      <CardContent sx={{ alignItems: 'center', display: 'flex' }}>
                        <Stack spacing={2} alignContent={'center'}>
                          <img src="/img/skills/css3.svg" alt="CSS3" width={120} height={120} />
                          <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', borderRadius: '200px', p: 0.5, alignItems: 'center' }}>
                            <Rating name="CSS3" precision={0.5} value={value.css3} readOnly />
                          </Box>
                        </Stack>
                      </CardContent>
                    </CardStyled>
                  </Grid>
                  <Grid size={3} sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'column' }}>
                    <CardStyled sx={{ width: '100%', height: '100%' }}>
                      <CardContent>
                        <Stack spacing={2} sx={{ justifyContent: 'flex-end', height: '170px' }}>
                          <img src="/img/skills/Sass-150.png" alt="SASS" width={120} height={120} />
                          <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', borderRadius: '200px', p: 0.5, alignItems: 'center' }}>
                            <Rating name="SASS" precision={0.5} value={value.sass} readOnly />
                          </Box>
                        </Stack>
                      </CardContent>
                    </CardStyled>
                  </Grid>
                  <Grid size={3} sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', justifyItems: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                    <CardStyled sx={{ width: '100%', height: '100%' }}>
                      <CardContent>
                        <Stack spacing={2} alignContent={'center'}>
                          <img src="/img/skills/angular_gradient.png" alt="angularjs" width={120} height={120} />
                          <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', borderRadius: '100px', p: 0.5, alignItems: 'center' }}>
                            <Rating name="MongoDB" precision={0.5} value={value.mongodb} readOnly />
                          </Box>
                        </Stack>
                      </CardContent>
                    </CardStyled>
                  </Grid>
                </Grid>
              </CardContent>
            </CardStyled>
            {/* </Item> */}
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2, width: '100%' }}>
          <Grid size={6}>
            {/*  <Item> {/* Item is Styled Paper */}
            <CardStyled sx={{ width: '100%', height: '100%' }}>
              <CardContent>
                <Typography variant="h3" component="div" sx={{ color: '#f7f7f7', fontFamily: 'var(--font-caveat)', fontSize: '4.5rem' }} gutterBottom>
                  Database
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, color: '#f7f7f7' }}>
                  I have experience working with various database systems, including both SQL and NoSQL databases. I am proficient in designing, implementing, and managing
                  databases to ensure efficient data storage and retrieval.
                </Typography>
                <Grid container spacing={2} sx={{ my: 2 }}>
                  <Grid size={{ md: 4, xs: 12 }}>
                    <CardStyled sx={{ width: '100%', height: '100%' }}>
                      <CardContent sx={{ alignItems: 'center', display: 'flex', color: '#f7f7f7' }}>
                        <Stack spacing={2} alignContent={'center'}>
                          <img src="/img/skills/mongodb.png" alt="MongoDB" style={{ width: '100%', height: 118 }} />
                          <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', borderRadius: '200px', p: 0.5, alignItems: 'center' }}>
                            <Rating name="CSS3" precision={0.5} value={value.mongodb} readOnly />
                          </Box>
                        </Stack>
                      </CardContent>
                    </CardStyled>
                  </Grid>
                  <Grid size={4}>
                    <CardStyled sx={{ width: '100%', height: '100%' }}>
                      <CardContent sx={{ alignItems: 'center', display: 'flex', color: '#f7f7f7' }}>
                        <Stack spacing={2} alignContent={'center'}>
                          <img src="/img/skills/mysql.jpg" alt="mysql" style={{ width: '100%', height: 118 }} />
                          <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', borderRadius: '200px', p: 0.5, alignItems: 'center' }}>
                            <Rating name="CSS3" precision={0.5} value={value.mongodb} readOnly />
                          </Box>
                        </Stack>
                      </CardContent>
                    </CardStyled>
                  </Grid>
                  <Grid size={4}>
                    <CardStyled sx={{ alignItems: 'center', display: 'flex', color: '#f7f7f7' }}>
                      <CardContent sx={{ alignItems: 'center', display: 'flex' }}>
                        <Stack spacing={2} alignContent={'center'}>
                          <img src="/img/skills/sql-server.jpg" alt="sql server" style={{ width: '100%', height: 118 }} />
                          <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', borderRadius: '200px', p: 0.5, alignItems: 'center' }}>
                            <Rating name="CSS3" precision={0.5} value={value.mongodb} readOnly />
                          </Box>
                        </Stack>
                      </CardContent>
                    </CardStyled>
                  </Grid>
                </Grid>
              </CardContent>
            </CardStyled>
            {/* </Item> */}
          </Grid>

          <Grid size={6}>
            {/* <Item> Item is Styled Paper */}
            <CardStyled sx={{ width: '100%', height: '100%' }}>
              <CardContent>
                <Typography variant="h3" component="div" sx={{ color: '#f7f7f7', fontFamily: 'var(--font-caveat)', fontSize: '4.5rem' }} gutterBottom>
                  Additional Skills
                </Typography>

                <Typography variant="body2" sx={{ mb: 2, color: '#f7f7f7' }}>
                  This is a list of my extra skills and technologies that I have experience with. While they may not be part of my primary stack, I am familiar with these tools and
                  can utilize them effectively when needed.
                </Typography>

                <Grid container spacing={2} sx={{ my: 2 }}>
                  <Grid size={{ md: 3, xs: 12 }}>
                    <CardStyled sx={{ width: '100%', height: '100%' }}>
                      <CardContent sx={{ alignItems: 'center', display: 'flex', color: '#f7f7f7' }}>
                        <Stack spacing={2} alignContent={'center'}>
                          <img src="/img/skills/gulp.svg" alt="gulp" style={{ width: '100%', height: 'auto' }} />
                          <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', borderRadius: '200px', p: 0.5, alignItems: 'center' }}>
                            <Rating name="CSS3" precision={0.5} value={value.gulp} readOnly />
                          </Box>
                        </Stack>
                      </CardContent>
                    </CardStyled>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12 }}>
                    <CardStyled sx={{ width: '100%', height: '100%' }}>
                      <CardContent sx={{ alignItems: 'center', display: 'flex', color: '#f7f7f7' }}>
                        <Stack spacing={2} alignContent={'center'}>
                          <img src="/img/skills/markdown-150.png" alt="markdown" style={{ width: '100%', height: 'auto' }} />
                          <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', borderRadius: '200px', p: 0.5, alignItems: 'center' }}>
                            <Rating name="CSS3" precision={0.5} value={value.markdown} readOnly />
                          </Box>
                        </Stack>
                      </CardContent>
                    </CardStyled>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12 }}>
                    <CardStyled sx={{ alignItems: 'center', display: 'flex', color: '#f7f7f7' }}>
                      <CardContent sx={{ alignItems: 'center', display: 'flex' }}>
                        <Stack spacing={2} alignContent={'center'}>
                          <img src="/img/skills/php.png" alt="php" style={{ width: '100%', height: 'auto' }} />
                          <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', borderRadius: '200px', p: 0.5, alignItems: 'center' }}>
                            <Rating name="CSS3" precision={0.5} value={value.php} readOnly />
                          </Box>
                        </Stack>
                      </CardContent>
                    </CardStyled>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12 }}>
                    <CardStyled sx={{ alignItems: 'center', display: 'flex', color: '#f7f7f7' }}>
                      <CardContent sx={{ alignItems: 'center', display: 'flex' }}>
                        <Stack spacing={2} alignContent={'center'}>
                          <span style={{ display: 'flex', alignItems: 'center', height: 77.63 }}>
                            <img src="/img/skills/webpack.png" alt="webpack" style={{ width: 128, height: 'auto' }} />
                          </span>
                          <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', borderRadius: '200px', p: 0.5, alignItems: 'center' }}>
                            <Rating name="CSS3" precision={0.5} value={value.webpack} readOnly />
                          </Box>
                        </Stack>
                      </CardContent>
                    </CardStyled>
                  </Grid>
                </Grid>
              </CardContent>
            </CardStyled>
            {/* </Item> */}
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Skills

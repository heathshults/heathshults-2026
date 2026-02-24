import * as React from 'react'
import { Paper, Box, Card, CardActions, CardContent, Button, Typography, Stack, Container } from '@mui/material'

export const Portfolio: React.FC = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    blogUrl: '',
    technologiesUsed: '',
  })
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errors: string[] = []
    const trimmedName = formData.name.trim()

    if (!/^[A-Za-z][A-Za-z\s'-]{2,29}$/.test(trimmedName)) {
      errors.push('Name must be 3-30 characters and contain only letters, spaces, apostrophes, or hyphens.')
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.push('Email must be a valid email address.')
    }

    const phoneDigits = formData.phone.replace(/\D/g, '')
    if (phoneDigits.length !== 10 || phoneDigits[0] === '0' || phoneDigits[0] === '1' || phoneDigits[9] === '0') {
      errors.push('Phone must be a valid US number, not starting with 0 or 1, and not ending with 0.')
    }

    try {
      const url = new URL(formData.blogUrl.trim())
      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        errors.push('Blog URL must start with http or https.')
      }
    } catch {
      errors.push('Blog URL must be a valid URL.')
    }

    if (errors.length > 0) {
      console.warn('Validation failed:', errors)
      return
    }
  }
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4, paddingTop: '100px' }}>
      <Paper>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontFamily: 'var(--font-caveat)', color: '#f7f7f7' }}>
          Portfolio
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: '#f7f7f7' }}>
          Here are some of the projects I&apos;ve worked on. Each project showcases my skills and experience in various technologies and domains.
        </Typography>
        <form>
          <Stack spacing={2} sx={{ mb: 4 }}>
            <input name="name" type="text" placeholder="Name" onChange={changeHandler} />
            <input name="email" type="email" placeholder="email" onChange={changeHandler} />
            <input name="phone" type="phone" placeholder="phone" onChange={changeHandler} />
            <input name="blogUrl" type="url" placeholder="Blog Url" onChange={changeHandler} />
            <button type="submit" onClick={handleSubmit}>
              Enter
            </button>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}

export default Portfolio

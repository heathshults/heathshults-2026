import Home from '@comp/Home'
import { notFound } from 'next/navigation'

interface SectionPageProps {
  params: Promise<{
    section: string
  }>
}

const validSections = new Set(['home', 'me', 'skills', 'portfolio', 'contact'])

export default async function SectionPage({ params }: SectionPageProps) {
  const { section } = await params

  if (!validSections.has(section)) {
    notFound()
  }

  return <Home />
}

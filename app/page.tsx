import Home from '@comp/Home'

export interface PageProps {
  data?: object[]
}

export default function Page({}: PageProps) {
  return <Home />
}

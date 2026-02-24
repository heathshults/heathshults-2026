import Header from '@comp/Header'

export interface PageProps {
  data?: object[]
}

export default function Page({}: PageProps) {
  return <Header />
}

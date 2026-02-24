export default interface MePageData {
  id: number
  datecreated: Date
  datemodified: Date
  pagename: string
  description: string
  keywords: string[]
  author: string
  content: string
  timeline: Timeline[]
}

export interface Timeline {
  id: number
  date: string
  title: string
  icon: Icon
  techstack?: string[]
  description: string
  jobtitle?: string
  dotcolor?: string
  dotvariant?: string
}

export enum Icon {
  School = 'school',
  WorkIcon = '<WorkIcon />',
}

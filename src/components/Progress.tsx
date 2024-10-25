'use client'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

export default function Progress() {
  return (
    <ProgressBar
      color="#a534eb"
      options={{ showSpinner: false }}
      shallowRouting
    />
  )
}

import { Suspense } from 'react'
import { MomoCallbackHandler } from './momo-callback-handler'

export default function MomoCallbackHandlerWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MomoCallbackHandler />
    </Suspense>
  )
}

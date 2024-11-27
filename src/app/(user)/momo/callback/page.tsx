import { MomoCallbackHandler } from './momo-callback-handler'

export default function MomoCallbackPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">MoMo Payment Callback</h1>
      <MomoCallbackHandler />
    </div>
  )
}

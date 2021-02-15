export function FullPageErrorFallback({ error }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  )
}

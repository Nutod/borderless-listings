import Loading from './Loading'

export function FullPageSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loading text="Bootstrapping Application" />
    </div>
  )
}

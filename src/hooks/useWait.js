import React from 'react'

export function useWait(delay = 1000) {
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    let id = window.setTimeout(() => setShow(previous => !previous), delay)

    return () => window.clearTimeout(id)
  }, [delay])

  return show
}

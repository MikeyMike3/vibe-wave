import { useState } from 'react'

export const RepeatButton = () => {
    const [repeat, setRepeat] = useState(0);

  return (
    <button>{repeat}</button>
  )
}

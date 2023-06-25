import '../App.css'

export default function ComponentMap({mapping, values, visible=true, hidden=false}) {
  if (!visible) return undefined

  return (
    <>
      {values.map( mapping )}
    </>
  )
}
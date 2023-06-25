import './SplitLayout.css'

export default function SplitLayout({children, minWidth="30%"}) {
  return <div className="row">{children.map((child, index)=>(child.type.name === "SplitColumn" ? <div key={index}>{child}</div> : <SplitColumn key={index} minWidth={minWidth}>{child}</SplitColumn>))}</div>
}

export function SplitColumn({children, minWidth="30%"}) {
  return <div className="column" style={{minWidth: minWidth}}>{children}</div>
}
import React from "react";

class BeforeUnload extends React.Component{
  constructor(props){
    super(props);
    this.onUnload = this.onUnload.bind(this)
  }

  onUnload(e){
    this.props.unloadHandler()
  }

  render(){
    return undefined
  }

  componentDidMount(){
    window.addEventListener("beforeunload", this.onUnload);
  }

  componentWillUnmount(){
    window.removeEventListener("beforeunload", this.onUnload);
  }
}
 
export default BeforeUnload;
import React from "react"

// TODO(bengreenier): denote that these will be settings
interface IProps {
  username: string
}

// export the Example class as default
//
// TODO(bengreenier): make clear that the root component MUST be default exported
export default class Example extends React.Component<IProps> {
  // specify react default props
  public static defaultProps = {
    username: "human"
  } as IProps

  // specify react render behavior
  public render() {
    // say hello to the user!
    return <h1>{`Hello ${this.props.username}`}</h1>
  }
}

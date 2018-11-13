import React from "react"

/**
 * In overlayed, properties are parsed from settings (from the broadcasters file)
 * and are passed to the extension via props
 */
interface IProps {
  /**
   * The username which we'll display
   */
  username: string
}

// export the Example class as default
//
// note: this must be the default export, as the overlayed loader is currently only
// able to load default exports, and the export must be a React component
export default class Example extends React.Component<IProps> {
  // specify react default props
  // note: this is currently necessary even though we specify a default value in
  // package.json#contributes as well - both are needed
  public static defaultProps = {
    username: "human"
  } as IProps

  // specify react render behavior
  public render() {
    // say hello to the user!
    return <h1>{`Hello ${this.props.username}`}</h1>
  }
}

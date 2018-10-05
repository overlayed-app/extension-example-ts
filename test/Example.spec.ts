import React from "react"
import renderer from "react-test-renderer"
import Example from "../src/index"

import includeCommonTests from "@overlayed-app/common-ext-tests"

includeCommonTests(`${__dirname}/../src/index`)

// test the Example component
describe("Example", () => {
  // this test does snapshot testing to ensure the component renders properly
  // see https://jestjs.io/docs/en/tutorial-react for more info
  test("renders greeting", () => {
    // render the Example component, with default props
    let comp = renderer.create(React.createElement(Example))

    // we use the 'as' cast to avoid nullchecks below
    let tree = comp.toJSON() as renderer.ReactTestRendererJSON

    // snapshot test default props
    expect(tree).toMatchSnapshot()

    // render the Example component, with given props
    comp = renderer.create(React.createElement(Example, { username: "test" }))
    tree = comp.toJSON() as renderer.ReactTestRendererJSON

    // snapshot test given props
    expect(tree).toMatchSnapshot()
  })
})

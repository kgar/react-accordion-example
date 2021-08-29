# React Accordion Example

This is an example of a reusable accordion component, based on the article [Compound Components in React](https://www.smashingmagazine.com/2021/08/compound-components-react/), converted to TypeScript and adjusted so that only one section is open at a time.

This example shows how to use the Context API, component child mapping, and component cloning to inject component-specific metadata into components. In this case, to detect which accordion segment is currently selected, the Accordion.Item components each are given an index dynamically so that it's not a burden to consuming code to keep track of indexes.
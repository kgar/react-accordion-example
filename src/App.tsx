import React, { useState } from 'react'
import Accordion from './components/Accordion';
import faqData from './data.json';

function App() {
  return (
    <Accordion>
      <Accordion.Title>Frequently Asked Questions</Accordion.Title>
      <Accordion.Frame>
        {faqData.map((item) => (
          <Accordion.Item key={item.id}>
            <Accordion.ItemHeader>{item.header}</Accordion.ItemHeader>
            <Accordion.Body>{item.body}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion.Frame>
    </Accordion>
  )
}

export default App

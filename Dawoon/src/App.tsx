import React, { useRef } from 'react'
import Container from './components/Container'
import Item from './components/Item'

function App() {
  const ref = useRef<HTMLDivElement>
  return (
    <div className="App">
      <Container>
        <Item ref={ref}>1</Item>
        <Item>2</Item>
        <Item>3</Item>
        <Item>4</Item>
      </Container>
    </div>
  )
}

export default App

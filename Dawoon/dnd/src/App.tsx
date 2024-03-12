import React, { useEffect } from 'react'
import Container from './components/Container'
import Item from './components/Item'
import useDrag from './hooks/useDrag'

function App() {
  const { addItem, item } = useDrag()
  useEffect(
    () =>
      ['1 🐟', '2 🐠', '3 🐡', '4 🦐', '5 🦑', '6 🐙'].forEach((i, index) => {
        addItem((ref) => (
          <Item key={i} ref={(el) => (ref.current[index] = el)}>
            {i}
          </Item>
        ))
      }),
    [],
  )

  return (
    <div className="App">
      <Container>{item}</Container>
    </div>
  )
}

export default App

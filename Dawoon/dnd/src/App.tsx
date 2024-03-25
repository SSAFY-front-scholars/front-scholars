import React, { useEffect } from 'react';

import Container from './components/Container';
import Item from './components/Item';
import useDrag from './hooks/useDrag';
import Drop from './components/Drop';

function App() {
  const { addItem, item } = useDrag();
  /*
  useEffect(
    () =>
      ['1 🐟', '2 🐠', '3 🐡', '4 🦐', '5 🦑', '6 🐙'].forEach((i, index) => {
        addItem((ref) => (
          <Item key={i} ref={ref}>
            {i}
          </Item>
        ));
      }),
    [],
  );
  */

  return (
    <div className="App">
      <Drop>
        {['🐟', '🐠', '🐡', '🦐', '🦑', '🐙', '🦞', '🦀', '🐳', '🐋', '🐬'].map((e, i) => (
          <Item key={e}>
            {i} {e}
          </Item>
        ))}
      </Drop>
    </div>
  );
}

export default App;

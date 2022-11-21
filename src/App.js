import React, { useState } from 'react';
import './App.css';
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const MovableItem = ({ setIsFirstColumn }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'Our first type',
    item: { name: 'Any custom name' },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult && dropResult.name === 'Column 1') {
        setIsFirstColumn(true)
      } else {
        setIsFirstColumn(false);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={drag} className='movable-item' style={{ opacity }}>
      Epson TM-T88IV
    </div>
  )
}

const Column = ({ children, className, title }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'Our first type',
    drop: () => ({ name: 'Some name' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div ref={drop} className={className}>
      {title}
      {children}
    </div>
  )
}

const App = () => {
  const [isFirstColumn, setIsFirstColumn] = useState(true);

  const Item = <MovableItem setIsFirstColumn={setIsFirstColumn} />;

  return (
    <div className="container">
      <DndProvider backend={HTML5Backend}>
        <Column title='Printers' className='column first-column'>
          {isFirstColumn && Item}
        </Column>
        <Column title='Drag and drop here to add a printer / NKDS' className='column second-column'>
          {!isFirstColumn && Item}
        </Column>
      </DndProvider>
    </div>
  );
}

export default App;
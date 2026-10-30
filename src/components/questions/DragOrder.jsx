import { useEffect, useState } from 'react';
import {
  DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors,
} from '@dnd-kit/core';
import {
  SortableContext, verticalListSortingStrategy, useSortable, arrayMove, sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { shuffleDifferent } from '../../utils/shuffle';
import { play } from '../../audio/sounds';

// Drag the steps into the correct order. Works with mouse, touch and keyboard.
// question.items must be written in the CORRECT order; they are shuffled for display.

function SortItem({ id, position, locked }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id, disabled: locked });

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`sort-item ${isDragging ? 'is-dragging' : ''} ${locked ? 'is-locked' : ''}`}
      {...attributes}
      {...listeners}
    >
      <span className="sort-item__num">{position}</span>
      <span className="sort-item__text">{id}</span>
      <span className="sort-item__grip" aria-hidden="true">⠿</span>
    </li>
  );
}

export default function DragOrder({ question, onChange, locked }) {
  const [order, setOrder] = useState(() => shuffleDifferent(question.items));

  // Report the current order so the Check button is enabled straight away
  useEffect(() => { onChange(order); }, [order]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd({ active, over }) {
    play('drop');
    if (!over || active.id === over.id) return;
    setOrder((items) => arrayMove(items, items.indexOf(active.id), items.indexOf(over.id)));
  }

  return (
    <>
      <h2 className="prompt">{question.prompt}</h2>
      <p className="hint">Drag the steps into the right order</p>
      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCenter} 
        onDragEnd={handleDragEnd} 
        onDragStart={() => play('pickup')}
      >
        <SortableContext items={order} strategy={verticalListSortingStrategy}>
          <ol className="sort-list">
            {order.map((item, i) => (
              <SortItem key={item} id={item} position={i + 1} locked={locked} />
            ))}
          </ol>
        </SortableContext>
      </DndContext>
    </>
  );
}

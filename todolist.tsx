import React from 'react';
import {useState} from "react";
import './App.css';

function TodoList() {
  const [items, setItems] = useState([
    {
      id: 1,
      label: "Compra pane",
      completed: false,
    },
    {
      id: 2,
      label: "Passeggiata cane",
      completed: false,
    },
  ]);

  const [newItemLabel, setNewItemLabel] = useState("");

  function modificaNuovoElemento(event: { target: { value: React.SetStateAction<string>; }; }) {
    setNewItemLabel(event.target.value);
  }

  function aggiungiElemento(event: { preventDefault: () => void; }) {
    event.preventDefault();

    if (newItemLabel.trim() === "") {
      return;
    }

    const newItem = {
      id: Date.now(),
      label: newItemLabel,
      completed: false,
    };

    setItems([...items, newItem]);
    setNewItemLabel("");
  }

  function completo(itemId: number) {
    setItems(
      items.map((item) => {
        if (item.id === itemId) {
          return { ...item, completed: true };
        }
        return item;
      })
    );
  }

  function eliminaElemento(itemId: number) {
    setItems(items.filter((item) => item.id !== itemId));
  }

  return (
    <div className="todo-list">
      <form onSubmit={aggiungiElemento}>
        <input type="text" placeholder="Add a new item" value={newItemLabel} onChange={modificaNuovoElemento}/>
        <button>Add</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input type="checkbox" checked={item.completed} onChange={() => completo(item.id)}/>
            {item.completed === true ? (
              <span className="completed">
                <del>{item.label}</del>
              </span>
            ) : (
              <span>{item.label}</span>
            )}
            <button onClick={() => eliminaElemento(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

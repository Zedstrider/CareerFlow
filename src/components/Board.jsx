import { useState } from 'react';
import initialData from '../data/initialData';
import Column from './Column';

export default function Board() {
// Initialize state with starting data
  const [data, setData] = useState(initialData);
  const columnKeys = Object.keys(data);
  return (
    // 'h-full' = height: 100% (fills the parent)
    // 'overflow-x-auto' = overflow-x: auto (adds a scrollbar if columns squish)
    <div className="flex p-4 h-full overflow-x-auto space-x-4">
      {columnKeys.map((key) => (
        <Column 
           key={key}               
           title={key}             // "wishlist", "applied", etc.
           jobs={data[key]} // Access the array using bracket notation
        />
      ))}
    </div>
  );
}
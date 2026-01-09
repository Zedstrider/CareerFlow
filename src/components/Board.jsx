import initialData from '../data/initialData';
import Column from './Column';

export default function Board() {
  const columnKeys = Object.keys(initialData);

  return (
    // 'flex' = display: flex (lays children out in a row)
    // 'h-full' = height: 100% (fills the parent)
    // 'overflow-x-auto' = overflow-x: auto (adds a scrollbar if columns squish)
    <div className="flex p-4 h-full overflow-x-auto space-x-4">
      {columnKeys.map((key) => (
        <Column 
           key={key}               // React needs a unique ID for lists
           title={key}             // "wishlist", "applied", etc.
           jobs={initialData[key]} // Access the array using bracket notation!
        />
      ))}
    </div>
  );
}
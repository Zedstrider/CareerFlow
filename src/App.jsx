import Board from './components/Board';

export default function App() {
  return (
    <div className="h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm border-b">
        <h1 className="text-xl font-bold text-gray-800">CareerFlow 🌊</h1>
      </div>

      {/* The Kanban Board */}
      <Board />
      
    </div>
  )
}
export default function App() {
  return (
    // 'flex' = display: flex
    // 'justify-center' = justify-content: center (aligns items horizontally)
    // 'h-screen' = height: 100vh (full viewport height)
    // 'bg-gray-100' = background-color: #f3f4f6 (a light grey)
    <div className="flex justify-center h-screen bg-gray-100 pt-10">
      
      {/* 'text-3xl' = font-size: 1.875rem (large text) */}
      {/* 'font-bold' = font-weight: 700 */}
      {/* 'text-blue-600' = color: #2563eb (a nice medium blue) */}
      <h1 className="text-3xl font-bold text-blue-600">
        CareerFlow Setup Complete! 🚀
      </h1>
      
    </div>
  )
}
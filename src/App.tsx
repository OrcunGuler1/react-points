import React, { useState } from 'react'

type Point = {
  x: number
  y: number
}

function App() {
  const [points, setPoints] = useState<Point[]>([])
  const [removedPoints, setRemovedPoints] = useState<Point[]>([])
  const handleMouseClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    setPoints(prev => [...prev, { x: clientX, y: clientY }])
  }

  const handleUndo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setPoints(prev => {
      const lastPoint = prev[prev.length - 1]
      setRemovedPoints(prev => [...new Set([...prev, lastPoint])])
      return prev.slice(0, -1)
    })
  }
  const handleRedo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setRemovedPoints(prev => {
      const lastPoint = prev[prev.length - 1]
      setPoints(prev => [...prev, lastPoint])
      return prev.slice(0, -1)
    })
  }
  return (
    <div className="App" onClick={handleMouseClick}>
      <button
        onClick={handleUndo}
        disabled={points.length === 0}
        className="undo"
      >
        Undo
      </button>
      <button
        onClick={handleRedo}
        disabled={removedPoints.length === 0}
        className="redo"
      >
        Redo
      </button>
      {points.map((point, i) => (
        <div
          key={i}
          className="point"
          style={{
            left: point.x,
            top: point.y,
          }}
        ></div>
      ))}
    </div>
  )
}

export default App

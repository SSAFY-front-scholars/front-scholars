import React, { MutableRefObject, ReactElement, useEffect, useRef, useState } from 'react'

const useDrag = () => {
  const [item, setItem] = useState<ReactElement[]>([])
  const dragRef = useRef<EventTarget | null>()
  const ref = useRef<HTMLDivElement[]>([])

  const addItem = (
    callback: (ref: MutableRefObject<HTMLDivElement[] | null[]>) => ReactElement,
  ) => {
    setItem((item) => [...item, callback(ref)])
  }

  const insertItem = (source: number, index: number) => {
    if (source == -1 || index == -1) return
    if (source == index) return
    if (source > index) {
      ref.current = [
        ...ref.current.slice(0, index),
        ...ref.current.splice(source, 1),
        ...ref.current.slice(index),
      ]
      setItem((item) => [...item.slice(0, index), ...item.splice(source, 1), ...item.slice(index)])
    } else {
      ref.current = [
        ...ref.current.slice(0, source),
        ...ref.current.slice(source + 1, index),
        ...ref.current.splice(source, 1),
        ...ref.current.slice(index - 1),
      ]
      setItem((item) => [
        ...item.slice(0, source),
        ...item.slice(source + 1, index),
        ...item.splice(source, 1),
        ...item.slice(index - 1),
      ])
    }
  }

  useEffect(() => {
    const handleDragStart = (e: DragEvent) => {
      dragRef.current = e.target
    }

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault()
    }

    const handleDragEnd = (e: DragEvent) => {
      dragRef.current = null
    }

    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      const source = ref.current.findIndex((el) => el == dragRef.current)
      const target = ref.current.findIndex((el) => el == e.target)
      if (e.target instanceof HTMLDivElement) {
        const rect = e.target.getBoundingClientRect()
        if ((e.clientY - rect.top) / rect.height >= 0.5) {
          insertItem(source, target + 1)
        } else {
          insertItem(source, target)
        }
      }
    }

    ref.current.forEach((el) => {
      el.addEventListener('dragstart', handleDragStart)
      el.addEventListener('dragover', handleDragOver)
      el.addEventListener('drop', handleDrop)
      el.addEventListener('dragend', handleDragEnd)
    })

    return () => {
      ref.current.forEach((el) => {
        el.removeEventListener('dragstart', handleDragStart)
        el.removeEventListener('dragover', handleDragOver)
        el.removeEventListener('drop', handleDrop)
        el.removeEventListener('dragend', handleDragEnd)
      })
    }
  }, [item])

  return { addItem, item }
}

export default useDrag

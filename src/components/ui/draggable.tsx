"use client";

import React, { useState, useRef, ReactNode, MouseEvent, useEffect } from "react";

interface DraggableProps {
  children: ReactNode;
  className?: string;
  initialPosition?: { x: number; y: number };
  dragHandleSelector?: string;
  bounds?: { top: number; left: number; right: number; bottom: number } | null;
}

export function Draggable({
  children,
  className = "",
  initialPosition = { x: 0, y: 0 },
  dragHandleSelector = ".drag-handle",
  bounds = null,
}: DraggableProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const elementStartPos = useRef({ x: 0, y: 0 });
  const draggableRef = useRef<HTMLDivElement>(null);

  // Handle mouse down on the drag handle
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    // Check if we're clicking on the drag handle
    const targetElement = e.target as HTMLElement;
    const isDragHandle = targetElement.closest(dragHandleSelector);
    if (!isDragHandle) return;

    // Prevent default events
    e.preventDefault();
    e.stopPropagation();

    // Store the initial mouse position
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    
    // Store the initial element position
    elementStartPos.current = { ...position };
    
    setIsDragging(true);
  };

  // Add global event listeners when dragging starts
  useEffect(() => {
    if (!isDragging) return;

    // Handle mouse movement during drag
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      // Calculate how far the mouse has moved from the initial position
      const deltaX = e.clientX - dragStartPos.current.x;
      const deltaY = e.clientY - dragStartPos.current.y;
      
      // Calculate the new position by adding the delta to the initial element position
      let newX = elementStartPos.current.x + deltaX;
      let newY = elementStartPos.current.y + deltaY;

      // Apply bounds if provided
      if (bounds && draggableRef.current) {
        const width = draggableRef.current.offsetWidth;
        const height = draggableRef.current.offsetHeight;

        // Allow partial visibility when dragged to edges
        // At least 100px of the element should remain visible
        const minVisibleHeight = 50;
        const minVisibleWidth = 100;

        newX = Math.max(bounds.left, Math.min(bounds.right - minVisibleWidth, newX));
        newY = Math.max(bounds.top, Math.min(bounds.bottom - minVisibleHeight, newY));
      }

      setPosition({ x: newX, y: newY });
    };

    // Handle mouse up to end dragging
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    // Add event listeners to the document
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Cleanup when dragging ends or component unmounts
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, bounds]);

  return (
    <div
      ref={draggableRef}
      className={`absolute ${className} ${isDragging ? "cursor-grabbing" : ""}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isDragging ? "none" : "transform 0.1s ease-out",
        userSelect: "none",
        width: "100%",
        maxWidth: "560px",
        zIndex: isDragging ? 40 : 30,
        touchAction: "none",
      }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
} 
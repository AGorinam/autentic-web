"use client";

import { useState, useRef, ReactNode, MouseEvent, useEffect } from "react";

interface DraggableProps {
  children: ReactNode;
  className?: string;
  initialPosition?: { x: number; y: number };
  dragHandleSelector?: string;
  bounds?: { top: number; left: number; right: number; bottom: number } | null;
}

export function DraggableFixed({
  children,
  className = "",
  initialPosition = { x: 0, y: 0 },
  dragHandleSelector = ".drag-handle",
  bounds = null,
}: DraggableProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const draggableRef = useRef<HTMLDivElement>(null);

  // Function to handle mouse down on the drag handle
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check if the click is on the drag handle
    if (dragHandleSelector) {
      const targetElement = e.target as HTMLElement;
      const isDragHandle = targetElement.closest(dragHandleSelector);
      if (!isDragHandle) return;
    }

    // Calculate the offset from the click point to the top-left of the element
    const boundingRect = draggableRef.current?.getBoundingClientRect();
    if (boundingRect) {
      dragOffset.current = {
        x: e.clientX - boundingRect.left,
        y: e.clientY - boundingRect.top,
      };
    }

    setIsDragging(true);
  };

  // Use global event listeners to handle mouse movement and release
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      e.preventDefault();

      // Calculate the new position
      let newX = e.clientX - dragOffset.current.x;
      let newY = e.clientY - dragOffset.current.y;

      // Apply bounds if provided
      if (bounds && draggableRef.current) {
        const width = draggableRef.current.offsetWidth;
        const height = draggableRef.current.offsetHeight;

        newX = Math.max(bounds.left, Math.min(bounds.right - width, newX));
        newY = Math.max(bounds.top, Math.min(bounds.bottom - height, newY));
      }

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    // Add event listeners when dragging starts
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Cleanup event listeners
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
        zIndex: isDragging ? 100 : 10,
        width: "100%", // Ensure the width is properly set
        maxWidth: "560px",
      }}
    >
      <div 
        className={dragHandleSelector.replace('.', '')} 
        onMouseDown={handleMouseDown}
        style={{ cursor: "grab" }}
      >
        {/* This will be replaced by the drag handle element */}
      </div>
      {children}
    </div>
  );
} 
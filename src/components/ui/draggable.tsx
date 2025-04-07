"use client";

import React, { useState, useRef, ReactNode, MouseEvent, useEffect, forwardRef, useImperativeHandle } from "react";

interface DraggableProps {
  children: ReactNode;
  className?: string;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  minSize?: { width: number; height: number };
  maxSize?: { width: number; height: number };
  dragHandleSelector?: string;
  bounds?: { top: number; left: number; right: number; bottom: number } | null;
  resizable?: boolean;
  onResize?: (size: { width: number; height: number }) => void;
}

export interface DraggableRef {
  resetSize: () => void;
  resetPosition: () => void;
}

export const Draggable = forwardRef<DraggableRef, DraggableProps>(({
  children,
  className = "",
  initialPosition = { x: 0, y: 0 },
  initialSize = { width: 560, height: 450 },
  minSize = { width: 430, height: 300 },
  maxSize = { width: 1000, height: 800 },
  dragHandleSelector = ".drag-handle",
  bounds = null,
  resizable = false,
  onResize,
}, ref) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const elementStartPos = useRef({ x: 0, y: 0 });
  const resizeStartSize = useRef({ width: 0, height: 0 });
  const draggableRef = useRef<HTMLDivElement>(null);

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    resetSize: () => {
      setSize(initialSize);
    },
    resetPosition: () => {
      setPosition(initialPosition);
    }
  }));

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

  // Handle resize start
  const handleResizeStart = (e: MouseEvent<HTMLDivElement>, direction: string) => {
    if (!resizable) return;

    e.preventDefault();
    e.stopPropagation();

    // Store the initial mouse position
    dragStartPos.current = { x: e.clientX, y: e.clientY };

    // Store the initial element size
    resizeStartSize.current = { ...size };

    setIsResizing(true);
    setResizeDirection(direction);
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

  // Add global event listeners when resizing starts
  useEffect(() => {
    if (!isResizing || !resizeDirection) return;

    // Handle mouse movement during resize
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      // Calculate how far the mouse has moved from the initial position
      const deltaX = e.clientX - dragStartPos.current.x;
      const deltaY = e.clientY - dragStartPos.current.y;

      // Calculate new size based on resize direction
      let newWidth = resizeStartSize.current.width;
      let newHeight = resizeStartSize.current.height;

      if (resizeDirection.includes('e')) {
        newWidth = Math.max(minSize.width, Math.min(maxSize.width, resizeStartSize.current.width + deltaX));
      }

      if (resizeDirection.includes('s')) {
        newHeight = Math.max(minSize.height, Math.min(maxSize.height, resizeStartSize.current.height + deltaY));
      }

      setSize({
        width: newWidth,
        height: newHeight
      });
    };

    // Handle mouse up to end resizing
    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeDirection(null);
    };

    // Add event listeners to the document
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Cleanup when resizing ends or component unmounts
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, resizeDirection, minSize, maxSize]);

  // Update size callback when resizing
  useEffect(() => {
    if (onResize) {
      onResize(size);
    }
  }, [size, onResize]);

  return (
    <div
      ref={draggableRef}
      className={`absolute ${className} ${isDragging ? "cursor-grabbing" : ""} ${resizable ? "group" : ""}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isDragging || isResizing ? "none" : "transform 0.1s ease-out",
        userSelect: "none",
        width: `${size.width}px`,
        height: `${size.height}px`,
        maxWidth: "100%",
        zIndex: isDragging || isResizing ? 40 : 30,
        touchAction: "none",
        overflow: "hidden",
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="w-full h-full">
        {children}
      </div>

      {/* Resize handles */}
      {resizable && (
        <>
          {/* East resize handle */}
          <div
            className="absolute top-0 right-0 w-3 h-full cursor-e-resize hover:bg-blue-400/20"
            onMouseDown={(e) => handleResizeStart(e, 'e')}
          />

          {/* South resize handle */}
          <div
            className="absolute bottom-0 left-0 w-full h-3 cursor-s-resize hover:bg-blue-400/20"
            onMouseDown={(e) => handleResizeStart(e, 's')}
          />

          {/* Southeast resize handle */}
          <div
            className="absolute bottom-0 right-0 w-8 h-8 cursor-se-resize hover:bg-blue-400/20 flex items-end justify-end p-2"
            onMouseDown={(e) => handleResizeStart(e, 'se')}
          >
            <svg
              width="10"
              height="10"
              className="opacity-60 group-hover:opacity-100 transition-opacity"
              viewBox="0 0 10 10"
              fill="currentColor"
            >
              <path d="M8 8H10V10H8V8ZM4 8H6V10H4V8ZM0 8H2V10H0V8ZM8 4H10V6H8V4ZM8 0H10V2H8V0Z" />
            </svg>
          </div>

          {/* Indicator during resize */}
          {isResizing && (
            <div className="absolute -top-7 right-0 bg-black/80 text-white text-xs rounded px-2 py-1 pointer-events-none">
              {Math.round(size.width)} × {Math.round(size.height)}
            </div>
          )}
        </>
      )}
    </div>
  );
});

Draggable.displayName = "Draggable";

"use client";

// React
import React, { useState, useEffect, useRef, KeyboardEvent } from "react";

// Types
import { AutoSuggestProps } from "./AutoSuggest.types";

/**
 * AutoSuggest component for displaying suggestions based on user input.
 *
 * @param {AutoSuggestProps} props - The properties for the AutoSuggest component.
 * @returns {JSX.Element} The rendered AutoSuggest component.
 */
export default function AutoSuggest({
  value,
  onChange,
  suggestions,
  isLoading = false,
  showSuggestions,
  onFocus,
  onBlur,
  onSelect,
  placeholder = "Search...",
}: AutoSuggestProps) {
  // State to manage the active suggestion index
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isVisible, setIsVisible] = useState(showSuggestions);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Animate visibility with delay on hide
  useEffect(() => {
    if (showSuggestions) {
      setIsVisible(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    } else {
      timeoutRef.current = setTimeout(() => setIsVisible(false), 150);
    }
  }, [showSuggestions]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % suggestions.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev <= 0 ? suggestions.length - 1 : prev - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0) {
          onSelect(suggestions[activeIndex]);
        }
        break;
      case "Escape":
        onBlur();
        break;
    }
  };

  useEffect(() => {
    setActiveIndex(-1); // Reset when suggestions change
  }, [suggestions]);

  return (
    <div className="mb-4 relative">
      <div>
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <img
            src="magnifying-glass-solid.svg"
            className="h-5 w-5"
            alt="Search Icon"
          />
        </div>
        <input
          className={`pl-11 w-full bg-white border border-white text-black text-sm p-3 focus:border-blue-500 transition-property:border-radius ease-in-out duration-500 ${
            suggestions.length > 0 && showSuggestions
              ? "rounded-t-xl"
              : "rounded-xl"
          }`}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={() => setTimeout(onBlur, 200)}
          onKeyDown={handleKeyDown}
        />
        {isLoading && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <img
              src="loading.svg"
              className="animate-spin duration-10 h-7 w-7 text-blue-500"
              alt="Loading"
            />
          </div>
        )}
      </div>
      <ul
        ref={listRef}
        className={`
          absolute w-full z-10 max-h-60 overflow-auto bg-white shadow-md rounded-b-xl
          transform transition-all duration-250 ease-in-out
          ${
            isVisible
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0 pointer-events-none"
          }
        `}
      >
        {suggestions.map((item, i) => (
          <li
            key={item.id}
            className={`p-2 text-left text-black cursor-pointer transition-colors duration-100 ${
              i === activeIndex ? "bg-blue-600 text-white" : "bg-white"
            } ${i === suggestions.length - 1 ? "rounded-b-xl" : ""}`}
            onMouseDown={() => onSelect(item)}
            onMouseEnter={() => setActiveIndex(i)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

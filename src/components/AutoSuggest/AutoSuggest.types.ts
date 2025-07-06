export type Suggestion = {
  id: string | number;
  label: string;
};

export type AutoSuggestProps = {
  value: string;
  onChange: (value: string) => void;
  suggestions: Suggestion[];
  isLoading?: boolean;
  showSuggestions: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onSelect: (suggestion: Suggestion) => void;
  placeholder?: string;
};

export type Forum = {
  id: number;
  name: string;
  description: string;
  image: string;
};

export type ForumButtonProps = {
  buttonType: 'approve' | 'reject';
};
export type SearchComponentProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showSuggestions: boolean;
  setShowSuggestions: (value: boolean) => void;
  forums: Forum[];
};

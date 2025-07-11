export type Forum = {
  id: number;
  name: string;
  description: string;
  image: string;
};

export type ForumButtonProps = {
  buttonType: 'approve' | 'reject';
};

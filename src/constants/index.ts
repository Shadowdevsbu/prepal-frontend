import { Forum } from '@/app/admin/manage-forums/types';

export const forums: Forum[] = [
  {
    id: 1,
    name: 'Introduction to Phy101',
    description: `Hey there! So you're about to start PHY101? Buckle up — this course is going to change the way you look at the world. Physics isn't just about numbers, equations, or labs. See more...`,
    image: '/phy.jpg',
  },
  {
    id: 2,
    name: 'Operations Research Crash Course',
    description:
      'Operations Research is the science of decision-making, using mathematical models and analytical methods to solve complex problems. It helps optimize resources, streamline operations, and improve outcomes in business, engineering, logistics, and beyond.',
    image: '/OR.jpg',
  },
  {
    id: 3,
    name: 'Database Design: How to create ERDs',
    description:
      'Database Design teaches you how to structure data efficiently and visually represent it using Entity-Relationship Diagrams (ERDs). ERDs help map out entities, relationships, and attributes to build a solid foundation for any database system.',
    image: '/database.jpg',
  },
];

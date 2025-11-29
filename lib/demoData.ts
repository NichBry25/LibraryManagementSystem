export type BookStatus = "available" | "borrowed" | "reserved" | "lost";

export type DemoBook = {
  id: number;
  title: string;
  author: string;
  category: string;
  yearPublished: number;
  branch: string;
  isDigital: boolean;
  status: BookStatus;
};

export const demoBooks: DemoBook[] = [
  {
    id: 1,
    title: "Introduction to Databases",
    author: "Jane Doe",
    category: "Computer Science",
    yearPublished: 2022,
    branch: "Main Campus",
    isDigital: false,
    status: "available",
  },
  {
    id: 2,
    title: "Modern Python",
    author: "Alex Smith",
    category: "Computer Science",
    yearPublished: 2020,
    branch: "Science Library",
    isDigital: true,
    status: "available",
  },
  {
    id: 3,
    title: "Civil Engineering Basics",
    author: "Y. Chen",
    category: "Engineering",
    yearPublished: 2019,
    branch: "Engineering Library",
    isDigital: false,
    status: "borrowed",
  },
];

export const demoCategories = [
  "All categories",
  "Computer Science",
  "Engineering",
  "Mathematics",
  "Fiction",
];

export const demoBranches = [
  "Main Campus",
  "Science Library",
  "Engineering Library",
];

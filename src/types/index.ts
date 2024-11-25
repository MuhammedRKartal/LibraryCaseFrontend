export type BookType = {
  id: number;
  name: string;
  author: string;
  publishYear: string;
  publisher: string;
  rating: number | null;
};

export type MemberType = {
  id: number;
  name: string;
  age: number;
  gender: string;
  country: string;
};

export type BorrowedItemType = {
  id: number;
  memberId: number;
  bookId: number;
  returned: boolean;
  borrowedAt: string;
  returnedAt: string | null;
  rating: number | null;
  book: BookType;
};

export type BookDetailsType = {
  id: number;
  name: string;
  author: string;
  publishYear: string;
  publisher: string;
  rating: number | null;
  currentOwner: MemberType | null;
};

export type MemberDetailsType = {
  id: number;
  name: string;
  age: number;
  gender: string;
  country: string;
  borrows: {
    past: BorrowedItemType[];
    present: BorrowedItemType[];
  };
};

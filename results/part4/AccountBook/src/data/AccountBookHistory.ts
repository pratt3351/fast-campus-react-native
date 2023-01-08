export type AccountBookHisotry = {
  id?: number;
  type: '사용' | '수입';
  price: number;
  comment: string;
  date: number;
  createdAt: number;
  updatedAt: number;
  photoUrl: string | null;
};

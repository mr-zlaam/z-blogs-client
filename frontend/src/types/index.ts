export interface UserRegisterTypes {
  username: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface UserLoginTypes {
  email: string;
  password: string;
}
export interface UserUpdateTypes {
  username: string;
  fullName: string;
  email: string;
  role: "admin" | "sub-admin" | "user";
}
export interface UserDataTypes {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
export interface BlogDataTypes {
  _id: string;
  blogTitle: string;
  blogSlug: string;
  blogDescription: string;
  blogThumbnail: string;
  blogAuthor: string;
  blogThumbnailAuthor: string;
  isPublic: true | false;
  createdAt: string;
  updatedAt: string;
}
export interface BlogTypes {
  success?: boolean;
  statusCode?: number;
  message?: string;
  optMessage?: string | null;
  data?: BlogDataTypes[];
}
export interface PaginationTypes {
  currentPage: number;
  totalPages: number;
  totalPublicBlogs: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
export interface PublicBlogDataTypes {
  publicBlogsList: BlogDataTypes[];
  pagination: PaginationTypes;
}
export interface PublicBLogTypes {
  success: boolean;
  statusCode: number;
  message: string;
  optMessage: string | null;
  data: PublicBlogDataTypes;
}

export interface UserRegisterTypes {
  username: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface UserLoginTypes {
  usernameORmail: string;
  password: string;
}
export interface UserUpdateTypes {
  username: string;
  fullName: string;
  email: string;
}
export interface UserUpdateRoleType {
  role: "ADMIN" | "MODERATOR" | "USER";
}

export interface UserDataTypes {
  uid: string;
  username: string;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
export interface AuthorType {
  uid: string;
  fullName: string;
  username: string;
  email: string;
  role: UserUpdateRoleType;
  blogPosts: [];
}
export interface BlogDataTypes {
  blogId: string;
  blogTitle: string;
  blogSlug: string;
  blogDescription: string;
  blogThumbnail: string;
  author: AuthorType;
  blogThumbnailAuthor: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}
// token payload
export interface PayLoadType {
  uid: string;
  username: string;
  email: string;
  fullName: string;
  role: "ADMIN" | "MODERATOR" | "USER";
  tokenVersion?: number;
}
export interface BlogTypes {
  success?: boolean;
  statusCode?: number;
  message?: string;
  optMessage?: string | null;
  data?: {
    blogs: BlogDataTypes[];
  };
}
export interface PaginationTypes {
  currentPage: number;
  totalPages: number;
  totalPublicBlogs: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
export interface PublicBlogDataTypes {
  blogs: BlogDataTypes[];
  pagination: PaginationTypes;
}
export interface PublicBLogTypes {
  success: boolean;
  statusCode: number;
  message: string;
  optMessage: string | null;
  data: PublicBlogDataTypes;
}
export interface CurrentUserTypes {
  uid: string;
  username: string;
  email: string;
  fullName: string;
  role: "ADMIN" | "MODERATOR" | "USER";
}

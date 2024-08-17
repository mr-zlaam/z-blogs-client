export interface UserData {
  uid: string;
  username: string;
  fullName: string;
  email: string;
  password: string;
  role: "ADMIN" | "MODERATOR" | "USER";
  tokenVersion: number;

  otp?: string | null;
  otpExpiry?: Date | null;
  isVerfied: boolean;
  otpRequestCount?: number | null;
  lastOtpRequest?: Date | null;
  cooldownExpiry?: Date | null;

  createdAt: Date;
  updatedAt: Date;
}

export interface SearchQueryType {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    users: UserData[]; // Changed from searchUserData to searchUsers
  };
  metaData: {
    totalUsers: number; // Moved totalUsers inside metaData
    totalPages: number; // Moved totalPages inside metaData
    currentPage: number; // Moved currentPage inside metaData
    pagination: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
  optMessage: string;
}
//BlogTypes
export interface BlogDataTypes {
  blogTitle?: string;
  blogSlug?: string;
  blogDescription?: string;
  blogThumbnail?: string;
  blogThumbnailAuthor?: string;
  isPublic?: boolean;
}
//Payload type to save data along with token

export interface PayLoadType {
  uid: string;
  username: string;
  email: string;
  fullName: string;
  role: "ADMIN" | "MODERATOR" | "USER";
  tokenVersion?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T | null;
  error: string | null;
}

export interface IUser {
  id: string;
  email: string;
  name?: string | null;
  role: 'STUDENT' | 'TEACHER' | 'EMPLOYER' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
}

export interface IRadarCoordinate {
  competenceArea: string; // Ví dụ: "Tìm kiếm và xử lý dữ liệu"
  score: number;          // 0 đến 100
  level: 'BASIC' | 'INTERMEDIATE' | 'ADVANCED' | 'HIGHLY_ADVANCED';
}

export interface ICATResult {
  theta: number; // Năng lực ước lượng qua mô hình IRT
  proficiencyLevel: 'BASIC' | 'INTERMEDIATE' | 'ADVANCED' | 'HIGHLY_ADVANCED';
  radarCoordinates: IRadarCoordinate[];
}

export interface ISubmission {
  id: string;
  studentId: string;
  fileUrl?: string | null;
  score?: number | null;
  feedback?: string | null;
  isGradedByAI: boolean;
  proctoringFlag: boolean;
  createdAt: string;
}

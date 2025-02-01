export interface User {
    id: string;
    name: string;
    email: string;
    role: 'mentor' | 'mentee';
    avatar?: string;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (userData: Partial<User> & { password: string }) => Promise<void>;
    logout: () => void;
  }
  
  export interface ChatMessage {
    id: string;
    sender: string;
    content: string;
    timestamp: Date;
    isAI?: boolean;
  }
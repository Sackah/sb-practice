export const user: User = {
  id: 'gtr3243843',
  accessToken: 'atiemrjkmmtjscs',
  username: 'Tom Bradley',
  email: 'tom@mail.com',
  tokens: null,
  role: 'admin',
  profilePicture:
    'https://i.ibb.co/VgMsMBK/spencer-davis-r-LPF7o-Zfik-unsplash.jpg',
  message: 'good morning',
  enabled: true,
  deleted: false,
};

export interface User {
  message: string;
  id: string;
  name?: string;
  accessToken: string;
  username: string;
  email: string;
  role: string;
  profilePicture: string;
  tokens: string | null;
  enabled: boolean;
  deleted: boolean;
}

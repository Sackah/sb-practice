export const user: User = {
  id: Array.from({ length: Math.floor(Math.random() * 10) }).join(),
  accessToken: Array.from({ length: Math.floor(Math.random() * 10) }).join(),
  username: 'Tom Bradley',
  email: 'tom@mail.com',
  tokens: null,
  role: 'admin',
  profilePicture:
    'https://i.ibb.co/VgMsMBK/spencer-davis-r-LPF7o-Zfik-unsplash.jpg',
  message: 'good morning',
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
}

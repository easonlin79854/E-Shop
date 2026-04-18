export type Lang = 'zh' | 'en';

export const translations = {
  zh: {
    brand: 'E-Shop',
    products: '商品',
    myOrders: '我的訂單',
    admin: '管理',
    login: '登入',
    register: '註冊',
    signOut: '登出',
    zhLabel: '繁體中文',
    enLabel: 'English',
    darkLabel: '深色',
    lightLabel: '淺色',
  },
  en: {
    brand: 'E-Shop',
    products: 'Products',
    myOrders: 'My Orders',
    admin: 'Admin',
    login: 'Login',
    register: 'Register',
    signOut: 'Sign Out',
    zhLabel: '繁體中文',
    enLabel: 'English',
    darkLabel: 'Dark',
    lightLabel: 'Light',
  },
} as const;

export type Translations = typeof translations[Lang];

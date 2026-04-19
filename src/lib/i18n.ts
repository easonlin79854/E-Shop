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

    // Admin layout / sidebar
    adminPanel: 'Admin 管理介面',
    dashboard: '儀表板',
    adminProducts: '商品管理',
    adminOrders: '訂單管理',
    adminUsers: '使用者管理',

    // Admin dashboard
    totalProducts: '商品總數',
    totalOrders: '訂單總數',
    totalUsers: '使用者總數',

    // Admin products page
    productsTitle: '商品列表',
    addProduct: '新增商品',
    colName: '商品名稱',
    colPrice: '價格',
    colStock: '庫存',
    colStatus: '狀態',
    colActions: '操作',
    statusActive: '上架',
    statusInactive: '下架',
    editBtn: '編輯',
    deleteBtn: '刪除',
    deleteConfirm: '確定要刪除此商品嗎？',
    deleteProductReferenced: '此商品已被訂單引用，無法刪除。請先取消相關訂單後再試。',

    // Admin orders page
    allOrders: '所有訂單',
    colOrderNumber: '訂單編號',
    colCustomer: '客戶',
    colTotal: '總金額',
    colOrderStatus: '狀態',
    colDate: '日期',
    manageOrder: '管理',

    // Admin users page
    usersTitle: '使用者管理',
    searchEmail: '搜尋 Email',
    colEmail: 'Email',
    colUserName: '名稱',
    colRole: '角色',
    colCreatedAt: '建立時間',
    roleAdmin: 'Admin',
    roleCustomer: '顧客',
    promoteToAdmin: '升為 Admin',
    demoteToCustomer: '降為顧客',
    lastAdminError: '無法降級最後一位 Admin，系統至少需要一位管理員。',
    userRoleUpdated: '角色已更新',
    searchBtn: '搜尋',
    loadingText: '載入中...',

    // Product form
    formNameLabel: '名稱 *',
    formDescriptionLabel: '說明',
    formPriceLabel: '價格 *',
    formImageUrlLabel: '圖片 URL',
    formStockLabel: '庫存',
    formActiveLabel: '上架',
    formSave: '儲存商品',
    formSaving: '儲存中...',
    formCancel: '取消',

    // Products page
    noProductsAvailable: '目前沒有商品可供選購。',
    noImage: '無圖片',
    inStock: '件庫存',
    outOfStock: '缺貨',

    // Orders page
    noOrdersYet: '您尚未下任何訂單。',
    browseProducts: '瀏覽商品',
    orderItems: '件商品',

    // Order detail page
    orderTitle: '訂單',
    statusLabel: '狀態',
    orderDate: '訂單日期',
    totalLabel: '總計',
    orderItemsTitle: '商品項目',
    statusPending: '待處理',
    statusCompleted: '已完成',
    statusCancelled: '已取消',

    // Login / Register
    signInTitle: '登入',
    emailLabel: 'Email',
    passwordLabel: '密碼',
    signingIn: '登入中...',
    signInBtn: '登入',
    noAccount: '還沒有帳號？',
    registerLink: '註冊',
    invalidCredentials: '帳號或密碼錯誤',
    createAccountTitle: '建立帳號',
    nameLabel: '名稱',
    creatingAccount: '建立中...',
    createAccountBtn: '建立帳號',
    alreadyHaveAccount: '已有帳號？',
    signInLink: '登入',
    registrationFailed: '註冊失敗',
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

    // Admin layout / sidebar
    adminPanel: 'Admin Panel',
    dashboard: 'Dashboard',
    adminProducts: 'Products',
    adminOrders: 'Orders',
    adminUsers: 'Users',

    // Admin dashboard
    totalProducts: 'Total Products',
    totalOrders: 'Total Orders',
    totalUsers: 'Total Users',

    // Admin products page
    productsTitle: 'Products',
    addProduct: 'Add Product',
    colName: 'Name',
    colPrice: 'Price',
    colStock: 'Stock',
    colStatus: 'Status',
    colActions: 'Actions',
    statusActive: 'Active',
    statusInactive: 'Inactive',
    editBtn: 'Edit',
    deleteBtn: 'Delete',
    deleteConfirm: 'Are you sure you want to delete this product?',
    deleteProductReferenced:
      'This product is referenced by existing orders and cannot be deleted. Please cancel the related orders first.',

    // Admin orders page
    allOrders: 'All Orders',
    colOrderNumber: 'Order #',
    colCustomer: 'Customer',
    colTotal: 'Total',
    colOrderStatus: 'Status',
    colDate: 'Date',
    manageOrder: 'Manage',

    // Admin users page
    usersTitle: 'User Management',
    searchEmail: 'Search by email',
    colEmail: 'Email',
    colUserName: 'Name',
    colRole: 'Role',
    colCreatedAt: 'Created At',
    roleAdmin: 'Admin',
    roleCustomer: 'Customer',
    promoteToAdmin: 'Promote to Admin',
    demoteToCustomer: 'Demote to Customer',
    lastAdminError: 'Cannot demote the last admin. At least one admin is required.',
    userRoleUpdated: 'Role updated',
    searchBtn: 'Search',
    loadingText: 'Loading...',

    // Product form
    formNameLabel: 'Name *',
    formDescriptionLabel: 'Description',
    formPriceLabel: 'Price *',
    formImageUrlLabel: 'Image URL',
    formStockLabel: 'Stock',
    formActiveLabel: 'Active',
    formSave: 'Save Product',
    formSaving: 'Saving...',
    formCancel: 'Cancel',

    // Products page
    noProductsAvailable: 'No products available.',
    noImage: 'No image',
    inStock: 'in stock',
    outOfStock: 'Out of stock',

    // Orders page
    noOrdersYet: "You haven't placed any orders yet.",
    browseProducts: 'Browse Products',
    orderItems: 'item(s)',

    // Order detail page
    orderTitle: 'Order',
    statusLabel: 'Status',
    orderDate: 'Order Date',
    totalLabel: 'Total',
    orderItemsTitle: 'Items',
    statusPending: 'PENDING',
    statusCompleted: 'COMPLETED',
    statusCancelled: 'CANCELLED',

    // Login / Register
    signInTitle: 'Sign In',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    signingIn: 'Signing in...',
    signInBtn: 'Sign In',
    noAccount: "Don't have an account?",
    registerLink: 'Register',
    invalidCredentials: 'Invalid email or password',
    createAccountTitle: 'Create Account',
    nameLabel: 'Name',
    creatingAccount: 'Creating account...',
    createAccountBtn: 'Create Account',
    alreadyHaveAccount: 'Already have an account?',
    signInLink: 'Sign in',
    registrationFailed: 'Registration failed',
  },
} as const;

export type Translations = (typeof translations)[Lang];

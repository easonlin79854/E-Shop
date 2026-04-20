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
    deleteOrderBtn: '刪除訂單',
    deleteOrderConfirm: '確定要刪除此訂單嗎？此操作無法復原。',
    deleteOrderSuccess: '訂單已刪除',
    deleteOrderNotCancelled: '只能刪除已取消的訂單，請先取消訂單後再刪除。',
    orderNotFound: '找不到此訂單。',

    // Cancel order (customer)
    cancelOrderBtn: '取消訂單',
    cancelOrderConfirm: '確定要取消此訂單嗎？',
    cancelSuccess: '訂單已成功取消，商品庫存已回補。',
    cancelNotPending: '只能取消待處理（PENDING）的訂單。',
    cancelForbidden: '您無法取消他人的訂單。',

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
    editNameBtn: '編輯名稱',
    editUserTitle: '編輯使用者',
    saveBtn: '儲存',
    deleteUserBtn: '刪除使用者',
    deleteUserConfirm: '確定要刪除此使用者？此操作將同時刪除其所有訂單，且無法復原。',
    userDeleted: '使用者已刪除',
    userNameUpdated: '名稱已更新',
    cannotDeleteSelf: '無法刪除目前登入的帳號。',
    cannotDeleteLastAdmin: '無法刪除最後一位管理員，系統至少需要一位管理員。',
    userNotFound: '找不到該使用者。',

    // Home page
    heroTitle: '歡迎來到 E-Shop',
    heroSubtitle: '您的一站式購物平台',
    browseProductsBtn: '瀏覽商品',
    getStartedBtn: '立即開始',

    // OAuth login
    orContinueWith: '或使用以下方式登入',
    signInWithGoogle: '使用 Google 登入',
    oauthAccountNotLinked: '此 Email 已透過其他方式註冊，請改用 Email/密碼登入，或使用原始登入方式。',

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
    deleteOrderBtn: 'Delete Order',
    deleteOrderConfirm: 'Are you sure you want to delete this order? This action cannot be undone.',
    deleteOrderSuccess: 'Order deleted successfully',
    deleteOrderNotCancelled: 'Only cancelled orders can be deleted. Please cancel the order first.',
    orderNotFound: 'Order not found.',

    // Cancel order (customer)
    cancelOrderBtn: 'Cancel Order',
    cancelOrderConfirm: 'Are you sure you want to cancel this order?',
    cancelSuccess: 'Order cancelled successfully. Stock has been restored.',
    cancelNotPending: 'Only pending orders can be cancelled.',
    cancelForbidden: 'You are not allowed to cancel this order.',

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
    editNameBtn: 'Edit Name',
    editUserTitle: 'Edit User',
    saveBtn: 'Save',
    deleteUserBtn: 'Delete User',
    deleteUserConfirm: 'Are you sure you want to delete this user? This will also delete all their orders and cannot be undone.',
    userDeleted: 'User deleted successfully',
    userNameUpdated: 'Name updated',
    cannotDeleteSelf: 'You cannot delete your own account.',
    cannotDeleteLastAdmin: 'Cannot delete the last admin. At least one admin is required.',
    userNotFound: 'User not found.',

    // Home page
    heroTitle: 'Welcome to E-Shop',
    heroSubtitle: 'Your one-stop shop for everything',
    browseProductsBtn: 'Browse Products',
    getStartedBtn: 'Get Started',

    // OAuth login
    orContinueWith: 'Or continue with',
    signInWithGoogle: 'Sign in with Google',
    oauthAccountNotLinked: 'This email is already registered with a different sign-in method. Please use Email/Password or your original sign-in method.',

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

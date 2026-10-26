// ----------------------------------------------------------------------

export type IUserSocialLink = {
    facebookLink: string;
    instagramLink: string;
    linkedinLink: string;
    twitterLink: string;
};

export type IUserProfileFollowers = {
    follower: number;
    following: number;
};

export type IUserProfileCover = {
    name: string;
    cover: string;
    role: string;
};

export type IUserProfileAbout = {
    quote: string;
    country: string;
    email: string;
    role: string;
    company: string;
    school: string;
};

export type IUserProfile = IUserProfileFollowers &
    IUserProfileAbout & {
        id: string;
        socialLinks: IUserSocialLink;
    };

export type IUserProfileFollower = {
    id: string;
    avatarUrl: string;
    name: string;
    country: string;
    isFollowed: boolean;
};

export type IUserProfileGallery = {
    id: string;
    title: string;
    postAt: Date | string | number;
    imageUrl: string;
};

export type IUserProfileFriend = {
    id: string;
    avatarUrl: string;
    name: string;
    role: string;
};

export type IUserProfilePost = {
    id: string;
    author: {
        id: string;
        avatarUrl: string;
        name: string;
    };
    isLiked: boolean;
    createdAt: Date | string | number;
    media: string;
    message: string;
    personLikes: {
        name: string;
        avatarUrl: string;
    }[];
    comments: {
        id: string;
        author: {
            id: string;
            avatarUrl: string;
            name: string;
        };
        createdAt: Date | string | number;
        message: string;
    }[];
};

// ----------------------------------------------------------------------

export type IUserCard = {
    id: string;
    avatarUrl: string;
    cover: string;
    name: string;
    follower: number;
    following: number;
    totalPosts: number;
    role: string;
};

export type ICurrency = {
    _id: string;
    name: string;
    icon: string;
};

export type ICryptoCurrency = {
    id: number;
    code: string;
    common: boolean;
    name: string;
    enable: boolean;
    wallet_regex: string;
    priority: number;
    extra_id_exists: number;
    extra_id_regex: any;
    logo_url: string;
    track: boolean;
    cg_id: string;
    is_maxlimit: boolean;
    network: string;
};

// ----------------------------------------------------------------------

export type IUserRole = {
    _id?: string;
    name: string;
    parent?: string;
    permission?: Number;
};

export type IUserAccountGeneral = {
    _id: string;
    username: string;
    name: string;
    email: string;
    role?: null | IUserRole;
    createdAt: string;
    updatedAt: string;
    password: string;
    currency: string;
    domain?: string;
    partnership?: any;
    resetPassword?: any;
    OTP?: any;
    phone?: string;
    accountType: string;
    createdBy: string;
    promotion: string;
    limits: any;
    permissions: string | any;
    loginStatus: string;
    balance: any;
    turnover: number;
    lastLogin: any;
    isOnline: boolean;
    sportsBlock?: ISportsBlock;
    kyc: boolean;
    firstDeposit: boolean;
    stake: { name: string; value: number }[];
};
export type IUserAccountBillingCreditCard = {
    id: string;
    cardNumber: string;
    cardType: string;
};

export type IUserAccountBillingInvoice = {
    id: string;
    createdAt: Date | string | number;
    price: number;
};

export type IUserAccountBillingAddress = {
    id: string;
    name: string;
    phone: string;
    country: string;
    state: string;
    city: string;
    street: string;
    zipCode: string;
};

export type IUserAccountChangePassword = {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};

// ----------------------------------------------------------------------

export type IUserAccountNotificationSettings = {
    activityComments: boolean;
    activityAnswers: boolean;
    activityFollows: boolean;
    applicationNews: boolean;
    applicationProduct: boolean;
    applicationBlog: boolean;
};

export type IUserState = {
    authLoading: boolean;
    isLogined: boolean;
    user: null | IUserAccountGeneral;
    preference: null | IPreference;
    language: string;
    accessToken: string;
    error?: Error | string | null;
    roles?: IUserRole[];
    blockList: String[];
    stakes: { name: string; value: number }[];
    disabledMatch: String[];
};

export type IPreference = {
    userId: string;
    theme: string;
    hideUsername: boolean;
    maxBetAlert: boolean;
    currency: undefined | ICurrency;
    depositEmailNotify: boolean;
    withdrawEmailNotify: boolean;
    marketingEmailNotify: boolean;
};

export type ISportsBlock = {
    _id: string;
    userId: string;
    parentId: string;
    createdAt: string;
    updatedAt: string;
    blockList: string[];
};

export type IManualPayment = {
    _id: string;
    name: string;
    image: string;
    qrImage: string;
    order: number;
    status: string;
    credentials: any;
};

export type IKyc = {
    _id: string;
    userId: string;
    parentId: string;
    frontImg: string;
    type: string;
    number: string;
    backImg: string;
    status: string;
    reason: string;
    email: string;
    updateAt?: Date | string | number;
    createdAt?: Date | string | number;
};

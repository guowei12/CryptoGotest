import { Menus } from '@/types/menu';

export const menuData: Menus[] = [
    {
        id: '0',
        title: 'Dashboard',
        index: '/dashboard',
        icon: 'Histogram',
    },
    {
        id: '1',
        title: 'Transaction',
        index: '1',
        icon: 'HomeFilled',
        children: [
            {
                id: '11',
                pid: '1',
                index: '/payment',
                title: 'Payment',
            },
            {
                id: '12',
                pid: '1',
                index: '/refund',
                title: 'Refund',
            },
        ],
    },
    // {
    //     id: '4',
    //     title: 'Management',
    //     index: '4-1',
    //     icon: 'HomeFilled',
    //     children: [
    //         {
    //             id: '11',
    //             pid: '1',
    //             index: '/createMerchant',
    //             title: 'CreateMerchant',
    //         },
    //         {
    //             id: '12',
    //             pid: '1',
    //             index: '/merchantList',
    //             title: 'MerchantList',
    //         },
    //     ],
    // },
    {
        id: '2',
        title: 'Settlement',
        index: '2-1',
        icon: 'Reading',
        children: [
            {
                id: '28',
                pid: '2',
                index: '/balance',
                title: 'Balance',
            },
            // {
            //     id: '29',
            //     pid: '3',
            //     index: '29',
            //     title: '三级菜单',
            //     children: [
            //         {
            //             id: '291',
            //             pid: '29',
            //             index: '/editor',
            //             title: '富文本编辑器',
            //         },
            //         {
            //             id: '292',
            //             pid: '29',
            //             index: '/markdown',
            //             title: 'markdown编辑器',
            //         },
            //     ],
            // },
        ],
    },
    {
        id: '3',
        title: 'Account',
        icon: 'UserFilled',
        index: '/account'
    },
    // {
    //     id: '4',
    //     icon: 'PieChart',
    //     index: '4',
    //     title: '图表',
    //     children: [
    //         {
    //             id: '41',
    //             pid: '4',
    //             index: '/schart',
    //             title: 'schart图表',
    //         },
    //         {
    //             id: '42',
    //             pid: '4',
    //             index: '/echarts',
    //             title: 'echarts图表',
    //         },
    //     ],
    // },
    // {
    //     id: '7',
    //     icon: 'Brush',
    //     index: '/theme',
    //     title: '主题',
    // },
    // {
    //     id: '6',
    //     icon: 'DocumentAdd',
    //     index: '6',
    //     title: '附加页面',
    //     children: [
    //         {
    //             id: '61',
    //             pid: '6',
    //             index: '/ucenter',
    //             title: '个人中心',
    //         },
    //         {
    //             id: '62',
    //             pid: '6',
    //             index: '/login',
    //             title: '登录',
    //         },
    //         {
    //             id: '63',
    //             pid: '6',
    //             index: '/register',
    //             title: '注册',
    //         },
    //         {
    //             id: '64',
    //             pid: '6',
    //             index: '/reset-pwd',
    //             title: '重设密码',
    //         },
    //         {
    //             id: '65',
    //             pid: '6',
    //             index: '/403',
    //             title: '403',
    //         },
    //         {
    //             id: '66',
    //             pid: '6',
    //             index: '/404',
    //             title: '404',
    //         },
    //     ],
    // },
];

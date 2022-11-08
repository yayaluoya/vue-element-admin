import Layout from '@/layout'

export default [
    {
        path: '/test',
        component: Layout,
        meta: {
            title: '测试页面',
        },
        redirect: '/test/index',
        children: [
            {
                path: 'index',
                name: 'test_index',
                component: () => import('@/views/test/index'),
                meta: {
                    title: '测试页面',
                },
            },
            {
                path: 'table',
                name: 'test_table',
                component: () => import('@/views/test/table'),
                meta: {
                    title: '测试表格',
                },
            },
            {
                path: 'from',
                name: 'test_from',
                component: () => import('@/views/test/from'),
                meta: {
                    title: '测试表单',
                },
            },
            {
                path: 'query',
                name: 'test_query',
                component: () => import('@/views/test/query'),
                meta: {
                    title: '测试筛选',
                },
            },
        ],
    }
]
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
        ],
    }
]
import * as vueRouter from 'vue-router';

const routes = [{
        path: '/',
        name: 'Home',
        component: () => (
            import ('../views/Home.vue'))
    },
    {
        path: '/player',
        name: 'Player',
        component: () => (
            import ('../views/Player.vue')),

    },
    {
        path: '/viewer',
        name: 'Viewer',
        component: () => (
            import ('../views/Viewer.vue')),

    },
    {
        path: '/frame-editor',
        name: 'FrameEditor',
        component: () => (
            import ('../views/FrameEditor.vue')),

    },
    {
        path: '/sequence-editor',
        name: 'SequenceEditor',
        component: () => (
            import ('../views/SequenceEditor.vue')),

    },

];

const baseUrl = '' // process.env.BASE_URL

const router = vueRouter.createRouter({
    history: vueRouter.createWebHistory(baseUrl),
    routes
});

router.beforeEach(() => { // to, from, next
    window.scrollTo(0, 0)
})

export default router;
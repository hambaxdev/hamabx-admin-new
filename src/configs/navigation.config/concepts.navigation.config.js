import { CONCEPTS_PREFIX_PATH } from '@/constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from '@/constants/navigation.constant'
import { ADMIN, USER } from '@/constants/roles.constant'

const conceptsNavigationConfig = [
    {
        key: 'concepts',
        path: '',
        title: 'Concepts',
        translateKey: 'nav.concepts',
        icon: 'concepts',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        meta: {
            horizontalMenu: {
                layout: 'columns',
                columns: 4,
            },
        },
        subMenu: [
            {
                key: 'concepts.ai.chat',
                path: `${CONCEPTS_PREFIX_PATH}/ai/chat`,
                title: 'AI',
                translateKey: 'nav.conceptsAi.ai',
                icon: 'ai',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                meta: {
                    description: {
                        translateKey: 'nav.conceptsAi.aiDesc',
                        label: 'AI tools and resources',
                    },
                },
                subMenu: [],
            },
            {
                key: 'concepts.customers.customerList',
                path: `${CONCEPTS_PREFIX_PATH}/customers/customer-list`,
                title: 'Customers',
                translateKey: 'nav.conceptsCustomers.customers',
                icon: 'customers',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                meta: {
                    description: {
                        translateKey: 'nav.conceptsCustomers.customersDesc',
                        label: 'Customer management',
                    },
                },
                subMenu: [],
            },
            {
                key: 'concepts.events.eventList',
                path: `${CONCEPTS_PREFIX_PATH}/events/event-list`,
                title: 'Events',
                translateKey: 'nav.conceptsProducts.events',
                icon: 'events',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                meta: {
                    description: {
                        translateKey: 'nav.conceptsProducts.productsDesc',
                        label: 'Product inventory management',
                    },
                },
                subMenu: [],
            },
            {
                key: 'concepts.orders.orderList',
                path: `${CONCEPTS_PREFIX_PATH}/orders/order-list`,
                title: 'Tickets',
                translateKey: 'nav.conceptsOrders.tickets',
                icon: 'tickets',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                meta: {
                    description: {
                        translateKey: 'nav.conceptsOrders.ordersDesc',
                        label: 'Customer orders management',
                    },
                },
                subMenu: [],
            },
            {
                key: 'concepts.helpCenter',
                path: '',
                title: 'Help Center',
                translateKey: 'nav.conceptsHelpCenter.helpCenter',
                icon: 'helpCenter',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN, USER],
                meta: {
                    description: {
                        translateKey: 'nav.conceptsHelpCenter.helpCenterDesc',
                        label: 'Support and articles',
                    },
                },
                subMenu: [
                    {
                        key: 'concepts.helpCenter.supportHub',
                        path: `${CONCEPTS_PREFIX_PATH}/help-center/support-hub`,
                        title: 'Support Hub',
                        translateKey: 'nav.conceptsHelpCenter.supportHub',
                        icon: 'helpCeterSupportHub',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        meta: {
                            description: {
                                translateKey:
                                    'nav.conceptsHelpCenter.supportHubDesc',
                                label: 'Central support hub',
                            },
                        },
                        subMenu: [],
                    },
                    {
                        key: 'concepts.helpCenter.article',
                        path: `${CONCEPTS_PREFIX_PATH}/help-center/article/pWBKE_0UiQ`,
                        title: 'Article',
                        translateKey: 'nav.conceptsHelpCenter.article',
                        icon: 'helpCeterArticle',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        meta: {
                            description: {
                                translateKey:
                                    'nav.conceptsHelpCenter.articleDesc',
                                label: 'Read support articles',
                            },
                        },
                        subMenu: [],
                    },
                    {
                        key: 'concepts.helpCenter.editArticle',
                        path: `${CONCEPTS_PREFIX_PATH}/help-center/edit-article/pWBKE_0UiQ`,
                        title: 'Edit Article',
                        translateKey: 'nav.conceptsHelpCenter.editArticle',
                        icon: 'helpCeterEditArticle',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        meta: {
                            description: {
                                translateKey:
                                    'nav.conceptsHelpCenter.editArticleDesc',
                                label: 'Modify article content',
                            },
                        },
                        subMenu: [],
                    },
                    {
                        key: 'concepts.helpCenter.manageArticle',
                        path: `${CONCEPTS_PREFIX_PATH}/help-center/manage-article`,
                        title: 'Manage Article',
                        translateKey: 'nav.conceptsHelpCenter.manageArticle',
                        icon: 'helpCeterManageArticle',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        meta: {
                            description: {
                                translateKey:
                                    'nav.conceptsHelpCenter.manageArticleDesc',
                                label: 'Article management',
                            },
                        },
                        subMenu: [],
                    },
                ],
            },
            {
                key: 'concepts.calendar',
                path: `${CONCEPTS_PREFIX_PATH}/calendar`,
                title: 'Calendar',
                translateKey: 'nav.calendar',
                icon: 'calendar',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                meta: {
                    description: {
                        translateKey: 'nav.calendarDesc',
                        label: 'Schedule and events',
                    },
                },
                subMenu: [],
            },
            {
                key: 'concepts.mail',
                path: `${CONCEPTS_PREFIX_PATH}/mail`,
                title: 'Mail',
                translateKey: 'nav.mail',
                icon: 'mail',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                meta: {
                    description: {
                        translateKey: 'nav.mailDesc',
                        label: 'Manage your emails',
                    },
                },
                subMenu: [],
            },
            {
                key: 'concepts.chat',
                path: `${CONCEPTS_PREFIX_PATH}/chat`,
                title: 'Chat',
                translateKey: 'nav.chat',
                icon: 'chat',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                meta: {
                    description: {
                        translateKey: 'nav.chatDesc',
                        label: 'Chat with friends',
                    },
                },
                subMenu: [],
            },
        ],
    },
]

export default conceptsNavigationConfig

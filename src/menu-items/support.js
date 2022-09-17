// assets
import { ChromeOutlined, QuestionOutlined, EyeOutlined,NotificationOutlined } from '@ant-design/icons';

// icons
const icons = {
    ChromeOutlined,
    QuestionOutlined,
    EyeOutlined,
    NotificationOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
    id: 'support',
    title: 'Support',
    type: 'group',
    children: [
        {
            id: 'questions',
            title: '문의',
            type: 'item',
            url: '/questions',
            icon: icons.QuestionOutlined
        },
        {
            id: 'notices',
            title: '공지사항',
            type: 'item',
            url: '/notices',
            icon: icons.NotificationOutlined
        },
        {
            id: 'admin',
            title: '관리자 영역',
            type: 'collapse',
            icon: icons.EyeOutlined,
            children: [
                {
                    id: 'question-management',
                    title: '문의사항 관리',
                    type: 'item',
                    url: '/admin/question-management',
                    breadcrumbs: false
                },
                // {
                //     id: 'last-carpool ',
                //     title: '지난 카풀',
                //     type: 'item',
                //     url: '/my-carpool-past-list',
                //     breadcrumbs: false
                // }
            ]
        }
    ]
};

export default support;

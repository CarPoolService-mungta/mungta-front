// assets
import {
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    BgColorsOutlined,
    FontSizeOutlined,
    LoadingOutlined,
    ScheduleOutlined
} from '@ant-design/icons';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HistoryIcon from '@mui/icons-material/History';
// icons
const icons = {
    FontSizeOutlined,
    BgColorsOutlined,
    BarcodeOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    AppstoreAddOutlined,
    ScheduleOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'util-typography',
            title: 'Typography',
            type: 'item',
            url: '/typography',
            icon: icons.FontSizeOutlined
        },
        {
            id: 'util-color',
            title: 'Color',
            type: 'item',
            url: '/color',
            icon: icons.BgColorsOutlined
        },
        {
            id: 'util-shadow',
            title: 'Shadow',
            type: 'item',
            url: '/shadow',
            icon: icons.BarcodeOutlined
        },
        {
            id: 'ant-icons',
            title: 'Ant Icons',
            type: 'item',
            url: '/icons/ant',
            icon: icons.AntDesignOutlined,
            breadcrumbs: false
        },
        {
            id:'start-carpool',
            title : '카풀 하기',
            type : 'item',
            url : '/party-management',
            icon: DirectionsCarIcon,
        },
        {
            id: 'my-carpool',
            title: '내 카풀 내역',
            type: 'collapse',
            icon: HistoryIcon,
            children: [
                {
                    id: 'now-carpool ',
                    title: '진행중인 카풀',
                    type: 'item',
                    url: '/my-carpool-list',
                    breadcrumbs: false
                },
                {
                    id: 'last-carpool ',
                    title: '지난 카풀',
                    type: 'item',
                    url: '/my-carpool-past-list',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'my-accusation',
            title: '신고 [회원]',
            type: 'collapse',
            icon: HistoryIcon,
            children: [
                {
                    id: 'accusations',
                    title: '신고 내역',
                    type: 'item',
                    url: '/accusations',
                    breadcrumbs: false
                },
                {
                    id: 'register-accusation',
                    title: '신고하기',
                    type: 'item',
                    url: '/register-accusation/parties/1',  // 지난 카풀 내역 페이지의 신고 버튼이랑 이어 붙여야 함.
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'admin-accusation',
            title: '신고 [관리자]',
            type: 'collapse',
            icon: HistoryIcon,
            children: [
                {
                    id: 'admin-accusation-list',
                    title: '회원 신고 리스트',
                    type: 'item',
                    url: '/admin-accusations',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default utilities;

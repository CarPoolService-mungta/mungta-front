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
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';

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
    id: 'Carpool',
    title: 'carpool',
    type: 'group',
    children: [
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
            id:'review-register',
            title : '리뷰 하기',
            type : 'collapse',
            icon: RateReviewOutlinedIcon,
            children: [
                {
                    id:'review-select',
                    title : '리뷰대상 선택하기',
                    type : 'item',
                    url : '/review-select',
                    breadcrumbs: false
                },
                {
                    id:'review-register',
                    title : '리뷰 작성하기',
                    type : 'item',
                    url : '/review-register',
                    breadcrumbs: false
                },
                {
                    id:'my-review',
                    title : '내가 작성한 리뷰',
                    type : 'item',
                    url : '/my-review',
                    breadcrumbs: false
                },
                {
                    id:'carpooler-review',
                    title : '카풀러 리뷰',
                    type : 'item',
                    url : '/carpooler-review',
                    breadcrumbs: false
                },
                {
                    id:'reviews',
                    title : '마이리뷰',
                    type : 'item',
                    url : '/reviews',
                    breadcrumbs: false
                }

            ]
        },
    ]
};

export default utilities;

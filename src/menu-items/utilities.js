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
        }
        // ,
        // {
        //     id:'start-carpool',
        //     title : '카풀 하기',
        //     type : 'item',
        //     url : '/party-management',
        //     icon: DirectionsCarIcon,
        // },
        // {
        //     id: 'my-carpool',
        //     title: '내 카풀 내역',
        //     type: 'collapse',
        //     icon: HistoryIcon,
        //     children: [
        //         {
        //             id: 'now-carpool ',
        //             title: '진행중인 카풀',
        //             type: 'item',
        //             url: '/my-carpool-list',
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'last-carpool ',
        //             title: '지난 카풀',
        //             type: 'item',
        //             url: '/my-carpool-past-list',
        //             breadcrumbs: false
        //         }
        //     ]
        // }
    ]
};

export default utilities;

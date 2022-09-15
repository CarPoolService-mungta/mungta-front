import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import SelectRole from 'pages/party-management/Pages/SelectRole';
import CreateParty from 'pages/party-management/Pages/CreateParty';
import SelectCarpoolList from 'pages/party-management/Pages/SelectCarpoolList';
import MyCarpoolList from 'pages/party-management/Pages/MyCarpoolList';
import MyCarpoolPastList from 'pages/party-management/Pages/MyCarpoolPastList';
import MyCarpoolDetail from 'pages/party-management/Pages/MyCarpoolDetail';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

const PartyMatching = Loadable(lazy(() => import('pages/party-matching/PartyMatching')));

const Questions = Loadable(lazy(() => import('pages/user-profile/question/Questions')));
const Question = Loadable(lazy(() => import('pages/user-profile/question/Question')));
const PostQuestion = Loadable(lazy(() => import('pages/user-profile/question/PostQuestion')));

const Accusations = Loadable(lazy(() => import('pages/user-profile/accusation/Accusations')));
const AccusationDetail = Loadable(lazy(() => import('pages/user-profile/accusation/AccusationDetail')));
const PartyMembers = Loadable(lazy(() => import('pages/user-profile/accusation/PartyMembers')));
const RegisterAccusation = Loadable(lazy(() => import('pages/user-profile/accusation/RegisterAccusation')));
const AdminAccusations = Loadable(lazy(() => import('pages/admin-profile/accusation/AdminAccusations')));
const AdminAccusationDetail = Loadable(lazy(() => import('pages/admin-profile/accusation/AdminAccusationDetail')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'color',
            element: <Color />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'shadow',
            element: <Shadow />
        },
        {
            path: 'typography',
            element: <Typography />
        },
        {
            path: 'icons/ant',
            element: <AntIcons />
        },
        {
            path: 'party-matching',
            element: <PartyMatching />
        },
        {
            path: 'questions',
            element: <Questions/>
        },
        {
            path: 'question/:id',
            element: <Question/>
        },
        {
            path: 'question/post',
            element: <PostQuestion/>
        },
        {
            path: 'party-management',
            element: <SelectRole />,
        },
        {
            path: 'create-party',
            element: <CreateParty />
        }
        ,
        {
            path: 'select-carpool-list',
            element: <SelectCarpoolList />
        }
        ,
        {
            path: 'my-carpool-list',
            element: <MyCarpoolList />
        }
        ,
        {
            path: 'my-carpool-past-list',
            element: <MyCarpoolPastList />
        }
        ,
        {
            path: 'my-carpool-detail',
            element: <MyCarpoolDetail />
        },
        {
            path: 'accusations',
            element: <Accusations/>
        },
        {
            path: 'accusations/:accusationId',
            element: <AccusationDetail/>
        },
        {
            path: 'register-accusation/parties/:partyId',
            element: <PartyMembers/>
        },
        {
            path: 'register-accusation',
            element: <RegisterAccusation/>
        },
        {
            path: 'admin-accusations',
            element: <AdminAccusations/>
        },
        {
            path: 'admin-accusations/:accusationId',
            element: <AdminAccusationDetail/>
        }
    ]
};

export default MainRoutes;

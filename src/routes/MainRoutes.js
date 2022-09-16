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
import MyCarpoolDetailForMatching from 'pages/party-management/Pages/MyCarpoolDetailForMatching';

import MoveInfo from 'pages/party-management/Pages/Children/MoveInfo';
import UpdateParty from 'pages/party-management/Pages/UpdateParty';

const PartyMatching = Loadable(lazy(() => import('pages/party-matching/PartyMatching')));

const Questions = Loadable(lazy(() => import('pages/user-profile/question/Questions')));
const Question = Loadable(lazy(() => import('pages/user-profile/question/Question')));
const PostQuestion = Loadable(lazy(() => import('pages/user-profile/question/PostQuestion')));

//admin
const QuestionsManagement = Loadable(lazy(() => import('pages/admin/question-management/QuestionsManagement')));
const PostResponseToQuestion = Loadable(lazy(() => import('pages/admin/question-management/PostResponseToQuestion')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element:
              <SelectRole />
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
        /*
            Party Management Page Start
        */
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
            path: 'my-carpool-detail-for-matching',
            element: <MyCarpoolDetailForMatching />
        },
        {
            path: 'admin/question-management',
            element: <QuestionsManagement />
        },
        {
            path: 'admin/question-management/response/:id',
            element: <PostResponseToQuestion />
        }
        ,
        {
            path: 'modify-carpool-detail',
            element: <UpdateParty />
        }
        /*
            Party Management Page End
        */
    ]
};

export default MainRoutes;

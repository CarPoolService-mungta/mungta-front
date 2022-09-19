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
const PartyMemberList = Loadable(lazy(() => import('pages/party-matching/PartyMemberList')));

const Questions = Loadable(lazy(() => import('pages/question/Questions')));
const Question = Loadable(lazy(() => import('pages/question/Question')));
const PostQuestion = Loadable(lazy(() => import('pages/question/PostQuestion')));

const Mypage = Loadable(lazy(() => import('pages/authentication/Mypage')));

const Notices = Loadable(lazy(() => import('pages/notice/Notices')));
const Notice = Loadable(lazy(() => import('pages/notice/Notice')));
const PostNotice = Loadable(lazy(() => import('pages/notice/PostNotice')));

const ReviewRegister = Loadable(lazy(() => import('pages/review-management/RegisterReview')));
const ReviewSelect = Loadable(lazy(() => import('pages/review-management/ReviewSelect')));
const MyReview = Loadable(lazy(() => import('pages/review-management/MyReview')));
const CarPoolerReview = Loadable(lazy(() => import('pages/review-management/CarPoolerReview')));
const Reviews = Loadable(lazy(() => import('pages/review-management/Reviews')));

//admin
const QuestionsManagement = Loadable(lazy(() => import('pages/admin/question-management/QuestionsManagement')));
const PostResponseToQuestion = Loadable(lazy(() => import('pages/admin/question-management/PostResponseToQuestion')));

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
            element:
              <SelectRole />
        },
        {
            path: 'party-matching/:id',
            element: <PartyMatching />
        },
        {
            path: 'party-member/:id',
            element: <PartyMemberList />
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
            path: 'notices',
            element: <Notices />
        },
        {
            path: 'notice/:id',
            element: <Notice/>
        },
        {
            path: 'notice/post',
            element: <PostNotice/>
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
            path: 'my-carpool-detail-for-matching',
            element: <MyCarpoolDetailForMatching />
        },
        {
            path: 'mypage',
            element: <Mypage />
        },
        {
            path: 'admin/question-management',
            element: <QuestionsManagement />
        },
        {
            path: 'admin/question-management/response/:id',
            element: <PostResponseToQuestion />
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
        },
        {
            path: 'review-register',
            element: <ReviewRegister/>
        }
        ,
        {
            path: 'review-select',
            element: <ReviewSelect/>
        }
        ,
        {
            path: 'my-review',
            element: <MyReview/>
        }
        ,
        {
            path: 'carpooler-review',
            element: <CarPoolerReview/>
        }
        ,
        {
            path: 'reviews',
            element: <Reviews/>
        }
    ]
};

export default MainRoutes;

import React from 'react';
import './App.scss'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Messages from './pages/Messages/Messages';
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import ResetPassword from './pages/Auth/ResetPassword/ResetPassword';
import 'react-toastify/dist/ReactToastify.css';
import SendOtp from './pages/Auth/ForgotPassword/SendOtp';
import ChangePassword from './pages/Auth/ForgotPassword/ChangePassword';
import { useSelector } from 'react-redux';
import Profile from './pages/Profile/Profile';
import Posts from './components/Profiles/Posts/Posts';
import About from './components/Profiles/About/About';
import Friends from './components/Profiles/Friends/Friends';
import Welcome from './pages/Welcome/Welcome';
import FriendsPage from './pages/FriendsPage/FriendsPage';
import ProfileMedias from './components/Profiles/ProfileMedias/ProfileMedias';
import Watch from './pages/Watch/Watch';
import Groups from './pages/Groups/Groups';
import Feed from './components/Groups/Feed/Feed';
import Suggestions from './components/Groups/Suggestions/Suggestions';
import View from './components/Groups/View/View';
import Common from './components/Groups/Common/Common';
import Members from './components/Groups/Members/Members';
import Media from './components/Groups/Media/Media';
import Files from './components/Groups/Files/Files';
import MarketPlace from './pages/MarketPlace/MarketPlace';
import AboutGroup from './components/Groups/About/About';
import GroupList from './components/Groups/GroupList/GroupList';
import CreateGroup from './pages/CreateGroup/CreateGroup';
import Test from './components/Groups/_GroupCreatorAdmin/Test/Test';
import MemberRequest from './components/Groups/_GroupCreatorAdmin/MemberRequest/MemberRequest';
import Rules from './components/Groups/_GroupCreatorAdmin/Rules/Rules';
import Edit from './components/Groups/_GroupCreatorAdmin/Edit/Edit';
import Browse from './components/MarkePlace/Browse/Browse';
import Inbox from './components/MarkePlace/Inbox/Inbox';
import Buying from './components/MarkePlace/Buying/Buying';
import Selling from './components/MarkePlace/Admin/Selling/Selling';
import ProductPage from './components/MarkePlace/ProductPage/ProductPage';
import CreateMarketPlaceProduct from './pages/MarketPlace/CreateProduct';
import Commerce from './components/Profiles/Commerce/Commerce';
import SearchMarketPlace from './components/MarkePlace/Search/SearchMarketPlace';

const App = () => {
  const user = useSelector(state => state.user.currentUser);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/'>
            <Route index element={user ? <Navigate to='home' /> : <Welcome />} />

            <Route path='home' element={<Home />} />


            {/* ---------------------authentication routes -------------------------------*/}
            <Route path='login' element={user ? <Navigate to={`/profile/${user._id}`} /> : <Login />} />
            <Route path='register' element={<Register />} />
            <Route path='reset-password' element={<ResetPassword />} />
            <Route path='send-otp' element={<SendOtp />} />
            <Route path='forgot-password' element={<ChangePassword />} />

            {/* --------------------------------------messenger routes --------------------*/}
            <Route path='messenger' element={user ? <Messages /> : <Navigate to='/login' />} />

            {/* ----------------------profile routes --------------------------------*/}
            <Route path='profile/:id/*' element={user ? <Profile /> : <Navigate to='/login' />} >
              <Route path='' element={<Posts />} />
              <Route path='about' element={<About />} />
              <Route path='friends' element={<Friends />} />
              <Route path='photos' element={<ProfileMedias type='image' />} />
              <Route path='videos' element={<ProfileMedias type='video' />} />
              <Route path='commerce' element={<Commerce />} />
            </Route>

            <Route path='friends' element={<FriendsPage />} />

            <Route path='watch' element={<Watch />} />

            {/* ----------------------group creatiion --------------------------------*/}
            <Route path='group/create' element={<CreateGroup />} />  {/* for creating groups */}

            {/* ----------------------groups routes --------------------------------*/}
            <Route path='groups/*' element={<Groups />}>
              <Route index path='feed' element={<Feed />} />
              <Route path='discover' element={<Suggestions />} />
              <Route path='search' element={<GroupList type='searched' />} />
              {/* <Route path='search/:searchTerm/all' element={<GroupList type='all' />} /> */}
              <Route path=':id/*' element={<View />} >
                <Route index path='' element={<Common type='discussion' />} />
                <Route path='featured' element={<Common type='featured' />} />
                <Route path='videos' element={<Common type='videos' />} />
                <Route path='about' element={<AboutGroup />} />
                <Route path='members' element={<Members />} />
                <Route path='media' element={<Media />} />
                <Route path='files' element={<Files />} />
                {/* admin access routes for groups */}
                <Route path='member-requests' element={<MemberRequest />} />
                <Route path='manage-rules' element={<Rules />} />
                <Route path='edit' element={<Edit />} />
                <Route path='overview' element={<Test />} />
              </Route>
            </Route>

            {/* ----------------------marketplace routes --------------------------------*/}
            <Route path='marketplace/*' element={<MarketPlace />} >
              <Route index path='' element={<Browse />} />
              <Route path='inbox' element={<Inbox />} />
              <Route path='you/buying' element={<Buying />} />
              <Route path='category/:cat' element={<Browse />} />{/*fileterd by categories*/}
              <Route path='search' element={<SearchMarketPlace />} />

              <Route path='create' element={<CreateMarketPlaceProduct />} />
              <Route path='item/:id' element={<ProductPage />} />

              <Route path='you/selling' element={<Selling />} /> {/* for admins who wants to sell*/}
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Profile from './components/Profile/Profile/Profile'
import PostPage from './components/PostPage/PostPage';
import HomeFeed from './components/HomeFeed/HomeFeed';
import CreatePostForm from './components/CreatePostForm/CreatePostForm';
import MessagingHome from './components/Messages/MessagingHome/MessagingHome';
import RoomPage from './components/Rooms/RoomPage/RoomPage';
import CreateRoomPage from './components/Rooms/CreateRoom/CreateRoomPage/CreateRoomPage'
import Chat from './components/Rooms/chat';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <NavBar />
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
        <NavBar />
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/profile' exact={true} >
        <NavBar />
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path='/posts/:postId' exact={true} >
        <NavBar />
          <PostPage />
        </ProtectedRoute>
        <ProtectedRoute path='/create' exact={true} >
        <NavBar />
          <CreatePostForm />
        </ProtectedRoute>
        <ProtectedRoute path='/messages' exact={true} >
        <NavBar />
        <MessagingHome />
        </ProtectedRoute>
        <ProtectedRoute path='/messages/create' exact={true} >
        <NavBar />
        <CreateRoomPage />
        </ProtectedRoute>
        <ProtectedRoute path='/messages/:roomId' exact={true} >
        <NavBar />
        <RoomPage />
        </ProtectedRoute>
        <ProtectedRoute path='/:roomId/test' exact={true} >
        <Chat />
        </ProtectedRoute>
        <Route path='/' exact={true} >
        <NavBar />
          <HomeFeed />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import HeaderContainer from './components/Header/HeaderContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
// import Friends from './components/Friends/Friends';
import UsersContainer from './components/Users/UsersContainer';
import { Routes,Route } from 'react-router-dom';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from './Redux/app-reducer';
import { compose } from 'redux';
import { withRouter } from './components/common/WithRouter';
import Preloader from './assets/Preloader';


import './App.css';





class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
  }

  render () {
    if(!this.props.initialized){
      return <Preloader />
    }
    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <NavbarContainer />
        <div className='app-wrapper-content'>
          <Routes>
              <Route path='/profile/*' element={ <ProfileContainer /> }/>
              <Route path='/users' element={<UsersContainer />} />
              <Route path='/dialogs/*' element={<DialogsContainer />} />
              <Route path='/news' element={<News />} />
              <Route path='/music' element={<Music />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/login' element={<Login />} />
              {/* <Route path='/friends' element={<Friends />} /> */}
              
            
          </Routes>
        </div>      
      </div>
    );
    
  }
}

let mapStateToProps = (state) => ({
  initialized: state.app.initialized
})


export default compose(
    withRouter,
    connect(mapStateToProps, { initializeApp })
) (App)//Делаем компоненту App (в App.js) классовой. И конектим в нее санку getAuthUserData, которая до этого у нас конектилась и запускалась из пропсов в Header.jsx.
//в файле App.js создаем mapStateToProps и конектим его вместо null, а также заменяем в mapDispatchToProps getAuthUserData на нашу новую санку initializeApp, импортируя ее из нашего нового редьюсера (напомим, что getAuthUserData теперь вошла внутрь нее):
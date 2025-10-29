import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';

//////////////////////////////////////////
//import MainPage from './pages/02MainPage';
import MainPage from './pages/07MainPage';

//////////////////////////////////////////
//import UserPage from './pages/UserPage';
//import UserPage from './pages/03UserPage'; 
//import UserPage from './pages/04UserPage'; 
//import UserPage from './pages/05UserPage'; 
//import UserPage from './pages/06UserPage'; 
import UserPage from './pages/07UserPage'; 
////////////////////////////////////////////

////////////////////////////////////////////
//import LoginPage from './pages/02LoginPage';
import LoginPage from './pages/07LoginPage';

import NotFound from './components/common/NotFound';
import LoginManager from './components/login/LoginManager';

function App() {

  console.log('App');

  
  return (

    <div className="ViewGood"> 
      
      {/* 모든 페이지에서 LoginManager를 사용하기 위해 모든 컴포넌트 감쌈(?)
          모든 컴포넌트는 로그인 유무을 확인 할 수 있다. */} 
      <LoginManager>

        <Switch>
          <Route exact path="/"><MainPage /></Route>
          <Route path="/user"><UserPage /></Route>
          <Route path="/login"><LoginPage /></Route>
          <Route path="*"><NotFound/></Route>
        </Switch>

      </LoginManager>  
      
    </div>
    
  );
}

export default App;

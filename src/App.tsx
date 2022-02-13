import React from 'react';
import './App.css';
import { AuthenticatedApp } from './authenticated-app';
import { useAuth } from './context/auth-context';
import { UnauthenticatedApp } from './unauthenticated-app';
// import { ProjectListScreen } from './screens/project-list';
// import {TsReactTest} from "./screens/user-array/try-user-array"
// import {LoginScreen} from './screens/login'

function App() {
  const {user} = useAuth()
  return (
    <div className="App">
        {user? <AuthenticatedApp/>:<UnauthenticatedApp/>}
    </div>
  );
}

export default App;

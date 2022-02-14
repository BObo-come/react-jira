
import React from 'react';
import './App.css';
import { AuthenticatedApp } from './authenticated-app';
import { ErrorBoundary } from './components/error-boundary';
import { FullPageErrorback } from './components/lib';
import { useAuth } from './context/auth-context';
import { UnauthenticatedApp } from './unauthenticated-app';
// import { ProjectListScreen } from './screens/project-list';
// import {TsReactTest} from "./screens/user-array/try-user-array"
// import {LoginScreen} from './screens/login'

function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorback}>
          {user? <AuthenticatedApp/>:<UnauthenticatedApp/>}
      </ErrorBoundary>
    </div>
  );
}

export default App;

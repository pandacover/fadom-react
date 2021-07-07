import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Signup } from './components/Signup'; 
import { Login } from './components/Login';
import { Contact } from './components/Contact';
import { Profile } from './components/Profile';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return(
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
            <main>
              <Switch>
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login}  />
                <Route path="/contact" component={Contact} />
                <Route path='/profile' component={Profile} />
              </Switch>  
            </main>
        </div>
      </AuthProvider>
    </Router>
)}

export default App;

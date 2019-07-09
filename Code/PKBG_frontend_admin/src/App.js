import React from 'react';
import { BrowserRouter as Router,Route} from 'react-router-dom';
import Navi from './Navi/Navi'
import Login from './Login';
import usermanagement from'./usermanagement/usermanagement';


class App extends React.Component {
render(){
return(
<Router >
 <div>
<Route exact path="/" component={Navi} />
<Route path="/Login" component={Login} />

<Route path="/usermanagement" component={usermanagement}/>


</div>
</Router>
)
}
}
export default App;


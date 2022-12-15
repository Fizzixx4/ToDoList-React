import Coopernet from "../services/Coopernet";
const Login = (props) => {
    return (
        <form 
        onSubmit={async ()=>{
            props.signOut();
            const login = document.querySelector('#login');
            const pwd = document.querySelector('#pwd');
            props.signIn(login,pwd);
            //await Coopernet.setOAuthToken();
        }}
        className="container d-flex justify-content-center">
        <div className="d-flex flex-column w-25 my-5">
            <div className="d-flex justify-content-around">
                <label htmlFor="login">Login</label>
                <input type="text" id="login"/>
            </div>
            <div className="d-flex justify-content-around my-3">
                <label htmlFor="pwd">Password</label>
                <input type="password" id="pwd"/>
            </div>
            <input className="btn btn-success" type="submit" value="Se connecter"/>
        </div>
        </form>
    );
}

export default Login;
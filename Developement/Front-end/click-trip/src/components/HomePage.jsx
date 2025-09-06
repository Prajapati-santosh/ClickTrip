import './HomePage.css';
import Footer from '../components/Footer/Footer.jsx'

export default function HomePage(){
    return <div className="homepage">
        <div className="nav-bar">
            <h1 className="logo">ClickTrip</h1>
            <ul>
                <li>Login</li>
                <li>Signup</li>
                <li>Trips</li>
            </ul>
        </div>
        <div className="main-content">
            <input className="input-text" placeholder="Where you want to go next?"></input>
        </div>
        <Footer/>
    </div>
}
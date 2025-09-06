// eslint-disable-next-line 
import react from 'react';
import './Footer.css';


export default function Footer() {
    return <div className='footer'>
        <div className='footer-main'>
            <div className='footer-logo'>
                <h1 className='logo'>ClickTrip</h1>
                <h2>Plan your next big thing</h2>
            </div>
            <div className='footer-container'>
                <div className='legal'>
                    Legal
                    <ul className='footer-ul'>
                        <li>Privacy policy</li>
                        <li>Terms and condition</li>
                    </ul>
                </div>
                <div className='support'>
                    Support
                    <ul className='footer-ul'>
                        <li>
                            Contact us
                        </li>
                    </ul>
                </div>
                <div className='Iternaries'>
                    Next big thing
                    <ul className='footer-ul'>
                        <li>Find destinations</li>
                        <li>Plan trip</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='footer-copyright'>
            <p>copyright @ 2025 ClickTrip</p>
        </div>
    </div>
}
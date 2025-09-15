// eslint-disable-next-line 
import react from 'react';
import './Footer.css';


export default function Footer() {
    const year=new Date().getFullYear()
    return <div className='footer'>
        <div className='footer-main'>
            <div className='footer-logo'>
                <h1>ClickTrip</h1>
                <h4>Plan your next big thing</h4>
            </div>
            <div className='footer-container'>
                <div className='legal'>
                    <div className='footer-ul-heading'>
                        Legal
                    </div>
                    <ul className='footer-ul'>
                        <li>Privacy policy</li>
                        <li>Terms and condition</li>
                    </ul>
                </div>
                <div className='support'>
                    <div className='footer-ul-heading'>
                        Support
                    </div>
                    <ul className='footer-ul'>
                        <li>
                            Email us
                        </li>
                        <li>
                            Contact us
                        </li>
                    </ul>
                </div>
                <div className='Iternaries'>
                    <div className='footer-ul-heading'>
                        Next big thing
                    </div>
                    <ul className='footer-ul'>
                        <li>Find destinations</li>
                        <li>Plan trip</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='footer-copyright'>
            <p>copyright @ {year} ClickTrip</p>
        </div>
    </div>
}
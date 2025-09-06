import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';     
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MESUREMENTID
};

let appInstance;

try {
    appInstance = initializeApp(firebaseConfig);
    console.log("Firebase App initialized successfully!");
}
catch (error) {
    if (!/already exists/.test(error.message)) {
        console.error("Failed to initialize Firebase App:", error);
    } else {
        console.log("Firebase App already initialized, reusing existing instance.");
        appInstance = getAuth().app;
    }
}


const auth = getAuth(appInstance);
const analytics = getAnalytics(appInstance);


export  {auth , analytics};

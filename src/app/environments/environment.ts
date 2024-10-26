export const environment = {
  production: false,
  firebase: {
    projectId: 'tasksapp-dev',
    appId: '1:222317116895:web:84565daf73b3a0c9f9986a',
    storageBucket: 'tasksapp-dev.appspot.com',
    apiKey: 'AIzaSyCtFkuaLQuc8ZB-mRv2S9WlYFOfRcAQBcs',
    authDomain: 'tasksapp-dev.firebaseapp.com',
    messagingSenderId: '222317116895',
    measurementId: 'G-1TW2LPLHRP',
  },
  apiUrl: 'https://us-central1-tasksapp-dev.cloudfunctions.net/api',
  sentry: {
    dsn: 'https://a76d3076020888500ad3c2af53a17752@o298634.ingest.us.sentry.io/4508198285410304',
    targets: [
      'localhost',
      'https://tasksapp-dev.web.app',
      'https://us-central1-tasksapp-dev.cloudfunctions.net/api/',
    ],
  },
};

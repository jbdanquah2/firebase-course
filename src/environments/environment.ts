// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  useEmulators: true,
  firebase: {
    apiKey: "AIzaSyC4eIWpgQCZD3jFlg5JC2fRhRBvj1Xow6E",
    authDomain: "fir-with-angular-e325c.firebaseapp.com",
    projectId: "fir-with-angular-e325c",
    storageBucket: "fir-with-angular-e325c.appspot.com",
    messagingSenderId: "691905578705",
    appId: "1:691905578705:web:ad99fdee686f8f9fac27f0",
  },
  api: {
    createUSer: "http://127.0.0.1:5001/fir-with-angular-e325c/us-central1/createUser"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import "zone.js/plugins/zone-error"; // Included with Angular CLI.

const admin = require("firebase-admin");

let firebaseAdminApp = null;

const getFirebaseAdminApp = () => {
  if (firebaseAdminApp) {
    return firebaseAdminApp;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    : null;

  if (!projectId || !clientEmail || !privateKey) {
    return null;
  }

  firebaseAdminApp = admin.apps.length
    ? admin.app()
    : admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });

  return firebaseAdminApp;
};

const getFirebaseAdminAuth = () => {
  const app = getFirebaseAdminApp();
  return app ? admin.auth(app) : null;
};

module.exports = {
  getFirebaseAdminAuth,
};
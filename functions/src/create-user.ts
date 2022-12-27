const express = require("express");
import * as functions from "firebase-functions";
import { getUserCredentialsMiddleware } from "./auth.middleware";
import { auth, db } from "./init";

const bodyParser = require("body-parser");
const cors = require("cors");

export const createUserApp = express();

createUserApp.use(bodyParser.json());
createUserApp.use(cors({ origin: true }));
createUserApp.use(getUserCredentialsMiddleware);

createUserApp.post("/", async (req, res) => {
  functions.logger.debug(`Calling create user function.`);

  try {
    if (!(req["uid"] && req["admin"])) {
      const message = "Denied access to user creation service";

      functions.logger.debug(message);
      res.status(403).json({ message });

      return;
    }

    const email = req.body.email;
    const password = req.body.password;
    const admin = req.body.admin;

    const user = await auth.createUser({
      email,
      password,
    });

    await auth.setCustomUserClaims(user.uid, { admin });

    // add user on firestore
    db.doc(`users/${user.uid}`).set({});

    res.status(200).json({ message: "success" });
  } catch (err) {

    functions.logger.error(`Could not create user.`, err);
    
    res.status(50).json({ message: "Could not create user." });
  }
});

import { createUserWithEmailAndPassword } from "firebase/auth";
import withSession from "@/lib/session";
import { auth } from "../../lib/firebase";
import { updateProfile } from "firebase/auth";
import { sendEmailVerification } from "firebase/auth";

export default withSession(async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password, displayName } = req.body;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: displayName });
      await sendEmailVerification(userCredential.user);

      const user = {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
      };

      // Store user data in the session
      req.session.set("user", user);
      await req.session.save();

      res.status(200).json({ user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
});

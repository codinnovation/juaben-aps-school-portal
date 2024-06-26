import withSession from "../../lib/session";

async function handler(req, res) {
  let user = req.session.get("user");

  if (user) {
    req.session.set("user", user);
    await req.session.save();
    user = req.session.get("user");

    res.status(200).json({ user });
    console.log(user);
  } else {
    res.status(401).json({
      isLoggedIn: false,
      isTwoFACompleted: false,
    });
  }
}

export default withSession(handler);

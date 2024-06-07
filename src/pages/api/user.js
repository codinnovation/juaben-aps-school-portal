import withSession from "@/lib/session";

export default withSession(async (req, res) => {
   let user = req.session.get("user");

   if(user){
      req.session.set("user", user);
      await req.session.save();
      user = req.session.get("user");
   }else{
      res.json({
         user: "Not Found"
      })
   }
})
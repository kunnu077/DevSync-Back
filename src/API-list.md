#DevSync APIs

authRouter

-POST/signup
-POST/login
-POST/logout

profileRouter
-GET/profile/view
-PATCH/profile/edit
-PATCH/profile/password

connectionRequestRouter
-POST/request/send/intrest/userid
-POST/request/send/ignored/userid
-POST/request/review/accepted/userid
-POST/request/review/rejected/userid

userRouter
-GET/user/connections
-GET/user/requests
-GET/user/feed/
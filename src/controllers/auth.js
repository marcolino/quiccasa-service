const User = require("../models/user");
const Token = require("../models/token");
//const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("../authenticate");

// @route POST api/auth/register
// @desc Register user
// @access Public
exports.register = async (req, res) => {
    console.log("API:", "register");
    try {
        const { email } = req.body;

        // Make sure this account doesn't already exist
        const user = await User.findOne({ email });

        if (user) return res.status(401).json({message: "The email address you have entered is already associated with another account."});

        const newUser = new User({ ...req.body, role: "basic" });

        /*const user_ = */await newUser.save(); // TODO: check errors...

        return await sendVerificationEmail(newUser, req, res); // TODO: if error remove refreshtoken ?

        //// registration successful, write token, and send back user
        //res.status(200).json({user: newUser, codeDeliveryMedium: "email"});
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};

// @route POST api/auth/login
// @desc Login user and return JWT token
// @access Public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        // check user email exists
        if (!user) return res.status(401).json({ message: `The email address ${email} is not associated with any account. Double-check your email address and try again.` });

        // validate password
        if (!user.comparePassword(password)) return res.status(401).json({message: "Invalid email or password"});

        // make sure the user has been verified
        if (!user.isVerified) return res.status(401).json({ type: "not-verified", message: "Your account has not been verified." });

        // login successful, write token, and send back user
        //res.status(200).json({token: user.generateJWT(), user});
        res.status(200).json({ token: user.generateJWT().accessToken, user});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

// ===EMAIL VERIFICATION
// @route GET api/verify/:token
// @desc Verify token
// @access Public
exports.verify = async (req, res) => {
    console.log("verify 1", req.params);
    if (!req.params.token) return res.status(400).json({message: "We were unable to find a user for this token."});

    try {
        // Find a matching token
        console.log(2);
        const token = await Token.findOne({ token: req.params.token });
        console.log(3);

        if (!token) return res.status(400).json({ message: "We were unable to find a valid token. Your token my have expired." });
        console.log(4);

        // If we found a token, find a matching user
        User.findOne({ _id: token.userId }, (err, user) => {
            console.log(5);
            if (!user) return res.status(400).json({ message: "We were unable to find a user for this token." });
            console.log(6);

            if (user.isVerified) return res.status(400).json({ message: "This user has already been verified." });

            // verify and save the user
            user.isVerified = true;
            console.log(7);
            user.save(function(err) {
                console.log(8);
                if (err) return res.status(500).json({ message: err.message });

                console.log(9);
                res.status(200).json({ message: "The account has been verified. You can now log in." });
            });
        });
    } catch (error) {
        console.log(10);
        res.status(500).json({message: error.message})
    }
};

// @route POST api/resend
// @desc Resend Verification Token
// @access Public
exports.resendToken = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) return res.status(401).json({ message: `The email address ${req.body.email} is not associated with any account. Double-check your email address and try again.`});

        if (user.isVerified) return res.status(400).json({ message: "This account has already been verified. Please log in."});

        await sendVerificationEmail(user, req, res);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

const sendVerificationEmail = async(user, req, res) => {
    try {
console.log("sending email - user:", user);
        const token = user.generateVerificationToken();

        // Save the verification token
        await token.save();

        let subject = "Account Verification Token";
        let to = user.email;
        let from = process.env.FROM_EMAIL;
//        let link = `http://${req.headers.host}/api/auth/verify/${token.token}`;
//        let html = `
// <p>Hi ${user.firstName} ${user.lastName}<p><br><p>Please click on the following <a href="${link}">link</a> to verify your account.</p> 
// <br><p>If you did not request this, please ignore this email.</p>
//         `;
        let html = `
<p>Hi ${user.firstName} ${user.lastName}<p>
<br>
<p>The code to confirm your registration is <b>${token.token}</b>.</p>
<br>
<p>If you did not request this, please ignore this email.</p>
        `;
console.log("sending email:", to, from, subject, html);
        await sendEmail({to, from, subject, html});

        res.status(200).json({ message: `A verification email has been sent to ${user.email}.`, codeDeliveryMedium: "email" });
    } catch (error) {
console.log("send email error:", error);
        res.status(error.code).json({ message: `Error sending verification email: ${error.message}` });
    }
}
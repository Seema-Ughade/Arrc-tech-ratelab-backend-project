// // const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');

// dotenv.config();

// const auth = (req, res, next) => {
//     const token = req.header('Authorization');

//     if (!token) {
//         return res.status(401).json({ error: "No token, authorization denied" });
//     }

//     try {
//         // Remove 'Bearer ' from the token
//         const tokenWithoutBearer = token.split(' ')[1];
//         const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
//         req.user = decoded.id;
//         next();
//     } catch (error) {
//         res.status(400).json({ error: "Token is not valid" });
//     }
// }



// const jwt = require('jsonwebtoken');

// exports.authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// };

// exports.authorizeRole = (roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     next();
//   };
// };















// exports.auth = (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ error: "No token, authorization denied" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = {
//       id: decoded.id,
//       email: decoded.email,
//       role: decoded.role
//     };
//     next();
//   } catch (error) {
//     res.status(400).json({ error: "Token is not valid" });
//   }
// };

// exports.authorizeRole = (roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     next();
//   };
// };







const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const auth = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: "No token, authorization denied" });
    }

    try {
        // Remove 'Bearer ' from the token
        const tokenWithoutBearer = token.split(' ')[1];
        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (error) {
        res.status(400).json({ error: "Token is not valid" });
    }
}

module.exports = auth;

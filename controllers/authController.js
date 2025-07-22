const jwt = require('jsonwebtoken');

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "somerandomaccesstoken";
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "somerandomstringforrefreshtoken";

const users = [
    { username: 'john', password: 'password123admin', role: 'admin' },
    { username: 'anna', password: 'password123member', role: 'member' }
];

let refreshTokens = [];

const login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '20m' });
        const refreshToken = jwt.sign({ username: user.username, role: user.role }, refreshTokenSecret);

        refreshTokens.push(refreshToken);

        res.status(200).json({ accessToken, refreshToken });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
};

const token = (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }

    if (!refreshTokens.includes(token)) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }

    jwt.verify(token, refreshTokenSecret, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '20m' });

        res.status(200).json({ accessToken });
    });
};

const logout = (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }

    refreshTokens = refreshTokens.filter(t => t !== token);

    res.status(200).json({ message: 'Logout successful' });
};

module.exports = { login, token, logout };

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../models/userModel');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generarToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.loginEmail = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(401).json({ mensaje: 'Usuario no encontrado' });

    const user = rows[0];
    const valido = await bcrypt.compare(password, user.password);
    if (!valido) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const token = generarToken(user.id);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginGoogle = async (req, res) => {
  const { tokenId } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    const nombre = payload.name;
    const googleId = payload.sub;

    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    let user;
    if (rows.length === 0) {
      const [result] = await pool.query(
        'INSERT INTO usuarios (email, nombre, proveedor, google_id) VALUES (?, ?, "google", ?)',
        [email, nombre, googleId]
      );
      user = { id: result.insertId };
    } else {
      user = rows[0];
    }

    const token = generarToken(user.id);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error al verificar token de Google' });
  }
};

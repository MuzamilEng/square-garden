const User = require("../models/user");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already in use' });
    }

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedProduct = await User.findByIdAndRemove(req.params.id);
    if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(deletedProduct);
    //   console.log('Product deleted', deletedProduct);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}

}

module.exports = {
  register,
  login,
  getAllUsers,
  deleteUser

};

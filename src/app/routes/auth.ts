import express from "express"
import jwt from "jsonwebtoken"
import { body, validationResult } from "express-validator"
import User from "../models/User"

const router = express.Router()

// Password validation regex
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/

// Signup
router.post(
  "/signup",
  [
    body("username").isLength({ min: 3, max: 30 }).trim(),
    body("password")
      .matches(passwordRegex)
      .withMessage("Password must be at least 8 characters with at least one number and one special character"),
    body("shops").isArray({ min: 3 }).withMessage("Must provide at least 3 shop names"),
  ],
  async (req: import("express").Request, res: import("express").Response) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { username, password, shops } = req.body

      // Check if user already exists
      const existingUser = await User.findOne({ username })
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" })
      }

      // Check if any shop names already exist
      const normalizedShops = shops.map((shop: string) => shop.toLowerCase().trim())
      const existingShops = await Shop.find({ name: { $in: normalizedShops } })

      if (existingShops.length > 0) {
        const existingShopNames = existingShops.map((shop: any) => shop.name)
        return res.status(400).json({
          message: `Shop names already taken: ${existingShopNames.join(", ")}`,
        })
      }

      // Create user
      const user = new User({
        username,
        password,
        shops: normalizedShops,
      })

      await user.save()

      // Create shop entries
      const shopPromises = normalizedShops.map((shopName: string) => new Shop({ name: shopName, owner: user._id }).save())
      await Promise.all(shopPromises)

      // Generate token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "fallback_secret", { expiresIn: "30m" })

      res.status(201).json({
        message: "User created successfully",
        token,
        user: {
          id: user._id,
          username: user.username,
          shops: user.shops,
        },
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server error" })
    }
  },
)

// Signin
router.post("/signin", [body("username").notEmpty(), body("password").notEmpty()], async (req: import("express").Request, res: import("express").Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { username, password, rememberMe } = req.body

    // Find user
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }

    // Check password
    const isMatch = await (user as any).comparePassword(password)
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" })
    }

    // Generate token with different expiry based on rememberMe
    const expiresIn = rememberMe ? "7d" : "30m"
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "fallback_secret", { expiresIn })

    res.json({
      message: "Login successful",
      token,
      expiresIn,
      user: {
        id: user._id,
        username: user.username,
        shops: user.shops,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Verify token
import { Request, Response } from "express"
import auth from "../middlewares/auth"
import Shop from "../models/Shop"

router.get("/verify", auth, (req: Request, res: Response) => {
  res.json({
    user: {
      id: req.user._id,
      username: req.user.username,
      shops: req.user.shops,
    },
  })
})


router.get("/", (req, res) => {
  res.send("Auth route works!");
});

export default router;


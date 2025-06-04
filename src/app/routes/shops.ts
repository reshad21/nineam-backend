import express, { Request } from "express";
import auth from "../middlewares/auth";
import Shop from "../models/Shop";

// Extend Express Request interface to include 'user'
declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

const router = express.Router()

// Get shop info by name
router.get("/:shopName", auth, async (req, res) => {
  try {
    const { shopName } = req.params
    const shop = await Shop.findOne({ name: shopName.toLowerCase() }).populate<{ owner: { _id: any; username: string } }>("owner", "username")

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" })
    }

    // Check if user owns this shop
    const isOwner = shop.owner && shop.owner._id.toString() === req.user._id.toString()

    res.json({
      shop: {
        name: shop.name,
        owner: shop.owner && shop.owner.username,
        isOwner,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router

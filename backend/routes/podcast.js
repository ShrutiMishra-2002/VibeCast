const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");
const Category = require("../models/category");
const Podcast = require("../models/podcast");
const User = require("../models/user");

// Add a new podcast
router.post("/add-podcasts", authMiddleware, upload, async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("Request Files:", req.files);

        const { title, description, category } = req.body;
        const frontImage = req.files?.["frontImage"]?.[0]?.path;
        const audioFile = req.files?.["audioFile"]?.[0]?.path;

        if (!title || !description || !category || !audioFile || !frontImage) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const { user } = req;
        const cat = await Category.findOne({ categoryName: category });
        if (!cat) {
            return res.status(400).json({ message: "No category found" });
        }

        const newPodcast = new Podcast({
            title,
            description,
            category: cat._id,
            frontImage,
            audioFile,
            user: user._id,
        });

        await newPodcast.save();
        await Category.findByIdAndUpdate(cat._id, { $push: { podcasts: newPodcast._id } });
        await User.findByIdAndUpdate(user._id, { $push: { podcasts: newPodcast._id } });

        res.status(201).json({ message: "Podcast added successfully" });
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({ message: "Failed to add podcast", error: error.message });
    }
});

// Get all podcasts
router.get("/get-podcasts", async (req, res) => {
    try {
        const podcasts = await Podcast.find()
            .populate("category")
            .sort({ createdAt: -1 });
        return res.status(200).json({ data: podcasts });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Get user's podcasts
router.get("/get-user-podcasts", authMiddleware, async (req, res) => {
    try {
        const { user } = req;
        const data = await User.findById(user._id)
            .populate({
                path: "podcasts",
                populate: { path: "category" },
            })
            .select("-password");

        if (data && data.podcasts) {
            data.podcasts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        return res.status(200).json({ data: data.podcasts });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Get podcast by ID
router.get("/get-podcasts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const podcast = await Podcast.findById(id).populate("category");
        if (!podcast) {
            return res.status(404).json({ message: "Podcast not found" });
        }
        return res.status(200).json({ data: podcast });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Get podcasts by category
router.get("/category/:cat", async (req, res) => {
    try {
        const { cat } = req.params;
        const categories = await Category.find({ categoryName: cat }).populate({
            path: "podcasts",
            populate: { path: "category" },
        });

        // Flatten the podcast results
        const podcasts = categories.flatMap(category => category.podcasts || []);
        return res.status(200).json({ data: podcasts });
    } catch (error) {
        console.error("Error fetching podcasts by category:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Delete podcast by ID (with authorization check)
router.delete('/podcast/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { user } = req;

        const podcast = await Podcast.findById(id);
        if (!podcast) {
            return res.status(404).json({ message: 'Podcast not found' });
        }

        // Check if the current user is the owner of the podcast
        if (podcast.user.toString() !== user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Delete the podcast
        await Podcast.findByIdAndDelete(id);

        // Remove references from Category and User
        await Category.findByIdAndUpdate(podcast.category, { $pull: { podcasts: id } });
        await User.findByIdAndUpdate(user._id, { $pull: { podcasts: id } });

        res.status(200).json({ message: 'Podcast deleted successfully' });
    } catch (error) {
        console.error("Error deleting podcast:", error);
        res.status(500).json({ message: 'Failed to delete podcast', error: error.message });
    }
});

module.exports = router;

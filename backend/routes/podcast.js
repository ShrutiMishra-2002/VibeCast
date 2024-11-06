const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");
const Category = require("../models/category");
const Podcast = require("../models/podcast");
const User = require("../models/user")

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

        res.status(201).json({ message: "Podcasts added successfully" });
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({ message: "Failed to add podcast", error: error.message });
    }
});
//get all podcast
router.get("/get-podcasts",async(req,res)=>{
    try{
const podcasts = await Podcast.find()
.populate("category")
.sort({createdAt: -1});
return res.status(200).json({data:podcasts})
}catch (error){
    return res.status(500).json({message:"Internal server error"});
}
});
//get-user-podcasts
router.get("/get-user-podcasts", authMiddleware, async (req, res) => {
    try {
      const { user } = req;
      console.log(user);
      const userid = user._id;
      console.log(user._id);
      const data = await User.findById(userid)
        .populate({
          path: "podcasts",
          populate: { path: "category" },
        })
        .select("-password");
  
      if (data && data.podcasts) {
        data.podcasts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      }
  
      return res.status(200).json({ data: data.podcasts });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
//get podcast by id
router.get("/get-podcasts/:id",async(req,res)=>{
    try{
const {id} = req.params;
const podcasts = await Podcast.findById(id).populate("category");
return res.status(200).json({data:podcasts});
}catch (error){
    return res.status(500).json({message:"Internal server error"});
}

});
//get podcasts by categories
// router.get("/get-podcasts/:cat",async(req,res)=>
    router.get("/category/:cat", async (req, res) => {
        try {
            const { cat } = req.params;
            const categories = await Category.find({ categoryName: cat }).populate({
                path: "podcasts",
                populate: { path: "category" },
            });
    
            let podcasts = [];
            categories.forEach((category) => {
                if (category.podcasts) {
                    podcasts.push(category.podcasts); // Push the single podcast object directly
                }
            });
    
            return res.status(200).json({ data: podcasts });
        } catch (error) {
            console.error("Error fetching podcasts by category:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
    
module.exports = router;
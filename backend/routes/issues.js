const express = require("express");
const router = express.Router();
const Issue = require("../models/Issue");
const auth = require("../middleware/auth");

// Create a new issue
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, category, location, latitude, longitude, image } = req.body;

    const newIssue = new Issue({
      title,
      description,
      category,
      location,
      latitude,
      longitude,
      image,
      userId: req.user.id,
    });

    const issue = await newIssue.save();
    res.status(201).json(issue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all issues
router.get("/", async (req, res) => {
  try {
    const { status, category, priority } = req.query;
    let filter = {};

    if (status) filter.status = status;
    if (category) filter.category = category;
    if (priority) filter.priority = priority;

    const issues = await Issue.find(filter)
      .populate("userId", "name email avatar")
      .sort({ createdAt: -1 });

    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's issues
router.get("/user/my-issues", auth, async (req, res) => {
  try {
    const issues = await Issue.find({ userId: req.user.id })
      .populate("userId", "name email avatar")
      .sort({ createdAt: -1 });

    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single issue
router.get("/:id", async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate("userId", "name email avatar")
      .populate("comments.userId", "name avatar");

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update issue
router.patch("/:id", auth, async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    // Check if user is the owner or admin
    if (issue.userId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to update this issue" });
    }

    Object.assign(issue, req.body);
    const updatedIssue = await issue.save();

    res.json(updatedIssue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add comment to issue
router.post("/:id/comments", auth, async (req, res) => {
  try {
    const { text } = req.body;
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    issue.comments.push({
      userId: req.user.id,
      text,
    });

    const updatedIssue = await issue.save();
    const populatedIssue = await updatedIssue.populate("comments.userId", "name avatar");

    res.json(populatedIssue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete issue
router.delete("/:id", auth, async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    // Check if user is the owner or admin
    if (issue.userId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this issue" });
    }

    await Issue.findByIdAndDelete(req.params.id);

    res.json({ message: "Issue deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

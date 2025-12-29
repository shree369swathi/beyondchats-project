const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

/**
 * GET /api/articles
 * List all articles with pagination (10 per page)
 */
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const articles = await Article.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Article.countDocuments();

    res.status(200).json({
      page,
      totalPages: Math.ceil(total / limit),
      totalArticles: total,
      data: articles
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch articles",
      error: error.message
    });
  }
});

/**
 * GET /api/articles/:id
 * Fetch a single article by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(400).json({
      message: "Invalid article ID",
      error: error.message
    });
  }
});

/**
 * POST /api/articles
 * Create a new article
 */
router.post("/", async (req, res) => {
  try {
    const { title, content, originalUrl, status } = req.body;

    if (!title || !content || !originalUrl) {
      return res.status(400).json({
        message: "Title, content, and originalUrl are required"
      });
    }

    const article = new Article({
      title,
      content,
      originalUrl,
      status
    });

    const savedArticle = await article.save();

    res.status(201).json(savedArticle);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create article",
      error: error.message
    });
  }
});

/**
 * PUT /api/articles/:id
 * Update an existing article
 */
router.put("/:id", async (req, res) => {
  try {
    const { title, content, status, references } = req.body;

    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (title) article.title = title;
    if (content) article.content = content;
    if (status) article.status = status;
    if (references) article.references = references;

    const updatedArticle = await article.save();

    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update article",
      error: error.message
    });
  }
});

/**
 * DELETE /api/articles/:id
 * Delete an article
 */
router.delete("/:id", async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete article",
      error: error.message
    });
  }
});

module.exports = router;

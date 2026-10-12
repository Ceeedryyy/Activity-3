import { Product } from "../models/Product.js";

const productFields = ["productname", "description", "price", "category", "quantity"];

function productValues(body) {
  return Object.fromEntries(productFields.map((field) => [field, body[field]?.trim?.() ?? body[field]]));
}

export const homePage = async (req, res) => {
  try {
    const products = await Product.findAll({ order: [["createdAt", "DESC"]] });
    const editingProduct = req.query.edit
      ? await Product.findByPk(req.query.edit)
      : null;

    res.render("home", {
      title: "Product Inventory",
      products: products.map((product) => product.toJSON()),
      editingProduct: editingProduct?.toJSON() ?? null,
      message: req.query.message ?? null,
    });
  } catch (error) {
    console.error("Unable to load products:", error.message);
    res.status(500).send("Could not load products. Check that MySQL is running and the database is initialized with `npm run migrate`.");
  }
};

export const createProduct = async (req, res) => {
  try {
    await Product.create(productValues(req.body));
    res.redirect("/?message=Product%20added");
  } catch (error) {
    console.error("Unable to create product:", error.message);
    res.status(400).send("Could not add product. Make sure all fields are valid, then go back and try again.");
  }
};

export const editProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.redirect("/?message=Product%20not%20found");
    await product.update(productValues(req.body));
    res.redirect("/?message=Product%20updated");
  } catch (error) {
    console.error("Unable to update product:", error.message);
    res.status(400).send("Could not update product. Make sure all fields are valid, then go back and try again.");
  }
};

export const removeProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.redirect("/?message=Product%20not%20found");
    await product.destroy();
    res.redirect("/?message=Product%20deleted");
  } catch (error) {
    console.error("Unable to delete product:", error.message);
    res.status(500).send("Could not delete product. Please try again.");
  }
};

import ProductsModel from "../models/products.model.js";

const CreateProducts = async (req, res) => {
  const { title, description, price, stock, rating, image, category } =
    req.body;

  if (!title || !price || !image || !category) {
    return res
      .status(401)
      .json({ msg: "Invalid required details", success: false });
  }

  try {
    const CreateProduct = await ProductsModel.create({
      title,
      description,
      price,
      stock,
      image,
      rating,
      category,
    });
    return res.status(201).json({
      msg: "Product create successfully",
      success: true,
      CreateProduct,
    });
  } catch (error) {
    console.error("error : ", error);
    return res
      .status(500)
      .json({ msg: "Server side error", error, success: false });
  }
};

const UpdateProduct = async (req, res) => {
  try {
    const updatedProduct = await ProductsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedProduct) {
      return res.status(404).json({
        msg: "Product not found",
        success: false,
      });
    }

    return res.status(200).json({
      msg: "Product updated successfully",
      success: true,
      product: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server side error",
      success: false,
      error: error.message,
    });
  }
};

const DeleteProdct = async (req, res) => {
  try {
    await ProductsModel.findByIdAndDelete(req.params.id);

    return res
      .status(200)
      .json({ msg: "Product delete successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "server side error", error, success: false });
  }
};

const GetAllProduct = async (req, res) => {
  const { category, sortBy } = req.query;

  try {
    let filter = {};
    const sortPrice = {};

    if (category) {
      const filterCategory = category.split(",");

      filter.category = { $in: filterCategory };
    }

    if (sortBy === "asc") {
      sortPrice.price = 1;
    } else {
      sortPrice.price = -1;
    }

    const allProducts = await ProductsModel.find(filter).sort(sortPrice);

    return res
      .status(200)
      .json({ msg: "Product fetch successfully", success: true, allProducts });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Server side error", error, success: false });
  }
};

const ParticularProducts = async (req, res) => {
  const { id } = req.params;

  try {
    const GetProduct = await ProductsModel.find({ _id: id });

    return res
      .status(200)
      .json({ msg: "Product fetch successfully", success: true, GetProduct });
  } catch (error) {
    return res.status(500).json({ msg: "server side error", error });
  }
};

const SearchProduct = async (req, res) => {
  const { search } = req.query;

  try {
    const SearchedProduct = await ProductsModel.find({
      title: { $regex: search, $options: "i" },
    });

    return res
      .status(200)
      .json({
        msg: "Search products",
        success: true,
        search_result: SearchedProduct,
      });
  } catch (error) {
    return res.status(500).json({ msg: "Server side error", error });
  }
};

export default {
  CreateProducts,
  UpdateProduct,
  DeleteProdct,
  GetAllProduct,
  ParticularProducts,
  SearchProduct,
};

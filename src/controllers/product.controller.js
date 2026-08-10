import ProductsModel from "../models/products.model.js";

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

    return res.status(200).json({
      msg: "Search products",
      success: true,
      search_result: SearchedProduct,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Server side error", error });
  }
};

export default {
  GetAllProduct,
  ParticularProducts,
  SearchProduct,
};

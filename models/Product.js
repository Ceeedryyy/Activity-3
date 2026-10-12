import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";

export const Product = sequelize.define("Product", {
    productname: {type: DataTypes.STRING,allowNull: false},
    description: {type: DataTypes.STRING,allowNull: false},
    price: { type: DataTypes.DECIMAL(10, 2),allowNull: false},
    category: {type: DataTypes.STRING,allowNull: false },
    quantity: {type: DataTypes.INTEGER,allowNull: false}
});

export default Product;

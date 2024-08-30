class Product {
  constructor({
    product_id,
    name,
    unit_price,
    quantity_in_stock,
    discount_percentage,
    image_url,
    description,
  }) {
    this.product_id = product_id;
    this.name = name;
    this.unit_price = unit_price;
    this.quantity_in_stock = quantity_in_stock;
    this.discount_percentage = discount_percentage;
    this.image_url = image_url;
    this.price_after_discount = this.calculatePriceAfterDiscount();
    this.description = description;
  }

  calculatePriceAfterDiscount() {
    if (this.discount_percentage) {
      return (
        this.unit_price - (this.unit_price * this.discount_percentage) / 100
      );
    }
    return this.unit_price;
  }
}

module.exports = { Product };

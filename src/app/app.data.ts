import { InMemoryDbService } from 'angular-in-memory-web-api';

import { ProductData} from "./data/product-data";
import { ReviewData} from "./data/review-data";
import { Product} from "./models/product";
import { Review} from "./models/review";

export class AppData implements InMemoryDbService {

  createDb(): { products: Product[], reviews: Review[]} {
    const products = ProductData.products;
    const reviews = ReviewData.reviews;
    return { products, reviews };
  }
}

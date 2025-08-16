export interface Price {
  id: string;
  amount: number;
  currency_code: string;
}

export interface RatingDistribution {
  "5_star": number;
  "4_star": number;
  "3_star": number;
  "2_star": number;
  "1_star": number;
}

export interface Rating {
  average: number;
  total_reviews: number;
  distribution: RatingDistribution;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  brand: string;
  category: string;
  description: string;
  price: Price;
  rating: Rating;
}

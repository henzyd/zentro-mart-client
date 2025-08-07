import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar, FaStar } from "react-icons/fa6";

interface Props {
  rating: number;
  size?: number;
}

export default function RenderStars({ rating, ...props }: Props) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FaStar key={`full-${i}`} className="text-orange-400" {...props} />,
    );
  }

  if (hasHalfStar) {
    stars.push(
      <FaStarHalfAlt key="half" className="text-orange-400" {...props} />,
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FaRegStar key={`empty-${i}`} className="text-gray-300" {...props} />,
    );
  }

  return stars;
}

/** Patient testimonials — reconstructed from the live site (Hebrew). */
export type Testimonial = {
  name: string;
  text: string;
  image: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: "רונית שושנה",
    text: "וואו, אין לי מילים. אני הכי פחדנית מרופאי שיניים! ד״ר יורם נתן לי את ההרגשה הכי טובה והיה סבלני. הוא עקר לי שן בינה בשנייה וחצי בלי כאב בכלל!!!!! אלוף!",
    image: "/images/testimonial-1.jpg",
    rating: 5,
  },
  {
    name: "אבי כהן",
    text: "מקצוען אמיתי. הגעתי עם כאב נורא וד״ר הוד טיפל בי במהירות ובעדינות. ממליץ בחום לכל מי שמחפש רופא שיניים אמין ביהוד.",
    image: "/images/testimonial-2.jpg",
    rating: 5,
  },
  {
    name: "מיכל לוי",
    text: "אווירה רגועה ונעימה, יחס אישי וחם. סוף סוף מצאתי מרפאה שאני לא מפחדת להגיע אליה. תודה על הכל!",
    image: "/images/testimonial-3.jpg",
    rating: 5,
  },
  {
    name: "דוד מזרחי",
    text: "טיפול הנחירות בלייזר שינה לי את החיים. ישן טוב יותר ובן/בת הזוג מרוצים. שירות מצוין מתחילתו ועד סופו.",
    image: "/images/testimonial-4.jpg",
    rating: 5,
  },
];

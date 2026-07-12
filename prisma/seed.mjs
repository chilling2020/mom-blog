import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const posts = [
  {
    slug: "first-days-in-america",
    title: "Первые дни в Америке",
    titleEn: "First Days in America",
    category: "Жизнь в США",
    categoryEn: "Life in the US",
    excerpt: "Мои первые впечатления, сложности и маленькие победы после переезда.",
    excerptEn: "My first impressions, challenges, and small victories after moving.",
    images: ["/1.jpg", "/2.jpg"],
    content:
      "Переезд в Америку — это не только новые возможности, но и много стресса, вопросов и неожиданных открытий. В этом посте я расскажу, как прошли первые дни и что удивило больше всего.",
    contentEn:
      "Moving to America brings not only new opportunities but also a lot of stress, questions, and unexpected discoveries. In this post I'll share how the first days went and what surprised me the most.",
  },
  {
    slug: "grocery-shopping-in-usa",
    title: "Покупка продуктов в США",
    titleEn: "Grocery Shopping in the US",
    category: "Быт",
    categoryEn: "Everyday Life",
    excerpt: "Walmart, Publix, Costco и где выгоднее покупать продукты.",
    excerptEn: "Walmart, Publix, Costco — and where it's cheapest to shop for groceries.",
    images: ["/images/shopping/1.jpg"],
    content:
      "Магазины в США сильно отличаются. Здесь много скидок, карт лояльности, больших упаковок и разных сетей. В этом посте я расскажу, где мне удобнее покупать продукты.",
    contentEn:
      "Grocery stores in the US are quite different. There are lots of discounts, loyalty cards, large package sizes, and many different chains. In this post I'll share where I find it most convenient to shop.",
  },
];

async function main() {
  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }
  console.log("Готово: существующие посты добавлены в базу.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

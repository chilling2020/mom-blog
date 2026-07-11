import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const posts = [
  {
    slug: "first-days-in-america",
    title: "Первые дни в Америке",
    category: "Жизнь в США",
    excerpt: "Мои первые впечатления, сложности и маленькие победы после переезда.",
    images: ["/1.jpg", "/2.jpg"],
    content:
      "Переезд в Америку — это не только новые возможности, но и много стресса, вопросов и неожиданных открытий. В этом посте я расскажу, как прошли первые дни и что удивило больше всего.",
  },
  {
    slug: "grocery-shopping-in-usa",
    title: "Покупка продуктов в США",
    category: "Быт",
    excerpt: "Walmart, Publix, Costco и где выгоднее покупать продукты.",
    images: ["/images/shopping/1.jpg"],
    content:
      "Магазины в США сильно отличаются. Здесь много скидок, карт лояльности, больших упаковок и разных сетей. В этом посте я расскажу, где мне удобнее покупать продукты.",
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

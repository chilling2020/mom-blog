import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PostForm from "../../../components/post-form";
import { updatePost } from "../../../actions";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f8f5ef] px-6 py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl font-medium">
          Редактировать статью
        </h1>
        <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
          <PostForm
            initialValues={{
              title: post.title,
              category: post.category,
              excerpt: post.excerpt,
              content: post.content,
              images: post.images,
            }}
            action={updatePost.bind(null, post.id)}
          />
        </div>
      </div>
    </main>
  );
}

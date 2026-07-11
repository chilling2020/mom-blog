import PostForm from "../../components/post-form";
import { createPost } from "../../actions";

export default function NewPostPage() {
  return (
    <main className="min-h-screen bg-[#f8f5ef] px-6 pb-10 pt-32 sm:pt-40">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl font-medium">Новая статья</h1>
        <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
          <PostForm action={createPost} />
        </div>
      </div>
    </main>
  );
}

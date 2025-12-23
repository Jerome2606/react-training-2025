import { Link, useNavigate, useParams } from "react-router-dom";

const blogs: BlogItem[] = [
  { id: 1, title: "Post 1", content: "Content of Post 1" },
  { id: 2, title: "Post 2", content: "Content of Post 2" },
  { id: 3, title: "Post 3", content: "Content of Post 3" },
  { id: 4, title: "Post 4", content: "Content of Post 4" },
  { id: 5, title: "Post 5", content: "Content of Post 5" },
];

interface BlogItem {
  id: number;
  title: string;
  content: string;
}

export const Blog = () => {
    const localBlogsItems: BlogItem[] = blogs;

    return <><h1>Blog</h1>
    <h2>Blog Posts:</h2>
    <ul>
        {localBlogsItems.map((blog) => (
            <li key={blog.id}>
                <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
            </li>
        ))}
    </ul></>;
};

export const BlogItem = () => {
    const navigate = useNavigate();
    const blogId = useParams().blogId;
    const blog: BlogItem | undefined = blogs.find((b) => b.id === Number(blogId));

    return <>
    {!blog && <h1>Blog post not found</h1>}
    {blog && (
        <>
        <h1>{blog?.title}</h1>
        <p>{blog?.content}</p>
        </>
        )
    }
    <div style={{ marginTop: "20px" }}>
            {/* Navigation programmatique */}
            <button onClick={() => navigate(-1)}>← Retour</button>
            <button onClick={() => navigate("/blog")}>Tous les posts</button>
            <button
            onClick={() =>
                navigate("/blog", { state: { fromBlog: blog?.id } })
            }
            >
            Retour avec state
            </button>
        </div>
    </>;
};
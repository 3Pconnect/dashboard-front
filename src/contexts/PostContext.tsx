import { createContext, ReactNode, useCallback, useEffect, useState } from "react"
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Post } from "../models/PostTdo";

interface PostContextType {
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[] | []>>;
    fetchPosts: () => Promise<void>;
    createPost: () => Promise<void>;
    setPostImage: React.Dispatch<React.SetStateAction<File | null>>;
    postImage: File | null;
    setMessagePost: React.Dispatch<React.SetStateAction<string>>;
    messagePost: string;
    isPostsLoading?: boolean
}
export const PostContext = createContext<PostContextType>({
    posts: [],
    setPosts: () => { },
    fetchPosts: async () => { },
    createPost: async () => { },
    setPostImage: () => { },
    postImage: null,
    setMessagePost: () => { },
    messagePost: "",
    isPostsLoading: false
});

interface PostProviderProps {
    children: ReactNode
}
export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [postImage, setPostImage] = useState<File | null>(null);
    const [messagePost, setMessagePost] = useState<string>("");
    const [isPostsLoading, setIsPostLoading] = useState<boolean>(false)
    const navigate = useNavigate();

    const fetchPosts = useCallback(async () => {
        setIsPostLoading(true)
        try {
            const response = await api.get('/post');
            setPosts(response.data);
            setIsPostLoading(false)
        } catch (error: any) {
            setIsPostLoading(false)
            if (error.response && error.response.status === 401) {
                console.error('Not Authorized. Redirecting to login...');
                navigate("/")
            } else {
                console.error('Error fetching posts:', error);
            }
        }
    }, []);

    const createPost = useCallback(async () => {
        try {
            if (!postImage) {
                console.error('Product image is required');
                return;
            }

            const formData = new FormData();
            formData.append('file', postImage);
            const uploadResponse = await api.post('/post/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const imageUrl = uploadResponse.data.url;

            await api.post('/post', {
                 message: messagePost,
                 mediaUrl: imageUrl,
                 postDate: new Date().toISOString()});
            fetchPosts();
        } catch (error: any) {
            console.error('Error fetching posts:', error);
        }
    }, [postImage, messagePost, fetchPosts]);


    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])

    return (
        <PostContext.Provider value={{
            createPost,
            setPosts,
            posts, fetchPosts, postImage, setPostImage,
            messagePost, setMessagePost,
            isPostsLoading
        }}>
            {children}
        </PostContext.Provider>
    )
}
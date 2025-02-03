import { createContext, ReactNode, useCallback, useEffect, useState } from "react"
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Post } from "../models/PostTdo";

interface FeedContextType {
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[] | []>>;
    isPostsLoading?: boolean
}
export const FeedContext = createContext<FeedContextType>({
    posts: [],
    setPosts: () => { },
    isPostsLoading: false
});

interface FeedProviderProps {
    children: ReactNode
}
export const FeedProvider: React.FC<FeedProviderProps> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isPostsLoading, setIsPostLoading] = useState<boolean>(false)
    const navigate = useNavigate();

    const fetchPosts = useCallback(async () => {
        setIsPostLoading(true)
        try {
            const response = await api.get('/post/feed');
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


    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])

    return (
        <FeedContext.Provider value={{
            setPosts,
            posts,
            isPostsLoading
        }}>
            {children}
        </FeedContext.Provider>
    )
}
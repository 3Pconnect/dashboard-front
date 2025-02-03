import { Box, Button, Flex, Image, Input, Progress, Spacer, Text, Textarea, VStack } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { Logout } from '../componets/Logout';
import { PostContext } from '../contexts/PostContext';
import api from '../services/api';
import { Empty } from '../componets/Empty';
import { PostCard } from '../contexts/PostCard';
import { Profile } from '../componets/Profile';
import { FeedContext } from '../contexts/FeedContext';

const Feed = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isToUpdate, setIsToUpdate] = useState(false)
  const [id, setId] = useState("")

  const {
    posts, isPostsLoading
  } = useContext(FeedContext);

  return (
<VStack w="100%" overflowX="hidden">
      <VStack>
        <Spacer />
        <Logout />
      </VStack>
      <Box w="100%" maxW="md" margin="auto" p={3}>
      {isPostsLoading && (
  <Progress maxW="md" minW="md" size="xs" isIndeterminate />
)}
        {posts.length <= 0 && !isPostsLoading ?
          <>
            <Empty />
          </>
          : <>
            {posts?.map((post: any) => (
              <Flex key={post.id} justify="space-between" align="center" mb={4}>
                <Box>
                  <PostCard text={post.message} date={
                    new Date(post.postDate).toLocaleString('en-US', {
                      month: 'long',
                      day: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })
                  } imageUrl={post.mediaUrl} userName={post.user.username} />

                </Box>
              </Flex>
            ))}
          </>}

      </Box>
    </VStack>
  );
};

export default Feed;

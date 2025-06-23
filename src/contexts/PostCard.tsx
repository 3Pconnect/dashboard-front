import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Image, Text, VStack } from "@chakra-ui/react"
import ReactPlayer from "react-player"
type PostType = {
  imageUrl?: string,
  text?: string,
  userName?: string,
  date?: string
  id?: string
}
export const PostCard = ({ imageUrl, date, text, userName, id }: PostType) => {
  return (
    <Card maxW='md'>
      <CardHeader>
        <Flex>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Avatar name={userName} />

            <Box>
              <Heading size='sm'>{userName}</Heading>
              <Text>{date}</Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>
          {text}
        </Text>
      </CardBody>
      {imageUrl?.endsWith(".mp4") ?
        <>
          <VStack >
            <ReactPlayer width={"100%"} controls={true} url={imageUrl} />
          </VStack>
        </> :
        <>    <Image
          objectFit='cover'
          src={imageUrl}
          alt='Chakra UI'
        />
        </>}



      <CardFooter
        justify='space-between'
        flexWrap='wrap'
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
        {/* <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
        Like
      </Button>
      <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
        Comment
      </Button>
      <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
        Share
      </Button> */}
      </CardFooter>
    </Card>
  )
}

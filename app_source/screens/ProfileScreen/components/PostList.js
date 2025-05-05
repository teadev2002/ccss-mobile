import React from "react";
import { View, Image, FlatList } from "react-native";
import { Card, Text, Button, Title } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import styles from "../ProfileStyles";

const samplePosts = [
  {
    id: "1",
    imageUrl:
      "https://th.bing.com/th/id/R.6f429d36ffe66cf79ee313893878eafc?rik=Fe%2bttJax2rzlkw&pid=ImgRaw&r=0",
    caption: "My latest cosplay! What do you think?",
  },
  {
    id: "2",
    imageUrl:
      "https://preview.redd.it/tanjiro-kamado-cosplay-by-me-orion-v0-m6ydv6bvkscc1.jpeg?width=1080&crop=smart&auto=webp&s=c6587a373a9f90505eac9bd72dac5d7309403548",
    caption: "From the last convention 💥",
  },
];
const EmptyPostCard = () => {
    return (
      <Card style={styles.emptyState}>
        <Card.Content style={styles.emptyStateContent}>
          <View style={styles.cameraIcon}>
            <Feather name="camera" size={24} color="#080808" />
          </View>
          <Title style={styles.emptyStateTitle}>Share Photos</Title>
          <Text style={styles.emptyStateText}>
            When you share photos, they will appear on your profile.
          </Text>
          <Button mode="text" labelStyle={styles.shareButton}>
            Share your first photo
          </Button>
        </Card.Content>
      </Card>
    );
  };
  

const PostCard = ({ post }) => (
    <Card style={styles.postCard}>
        {/* <View style={styles.postHeader}>
        <Image
            source={{ uri: post.userAvatar }}
            style={styles.avatar}
        />
        <Text style={styles.username}>{post.username}</Text>
        </View> */}

        <Card.Cover source={{ uri: post.imageUrl }} style={styles.postImage} />

        <View style={styles.postActions}>
        <Feather name="heart" size={22} style={styles.iconAction} />
        <Feather name="message-circle" size={22} style={styles.iconAction} />
        <Feather name="send" size={22} style={styles.iconAction} />
        </View>

        <View style={styles.captionArea}>
        <Text>
            <Text style={styles.username}>{post.username}</Text>{" "}
            {post.caption}
        </Text>
        <Text style={styles.postTime}>2 hours ago</Text>
        </View>
    </Card>
    );


const PostList = () => {
  return (
    <View style={styles.postListContainer}>
      <FlatList
        data={samplePosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
        contentContainerStyle={styles.postList}
        scrollEnabled={false}
      />
    </View>
  );
};

export default PostList;

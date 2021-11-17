import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  TextInput,
} from "react-native";
import API from "../../../api/api";

import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
// local
import styles from "./styles/style.post";
import { ScrollView } from "react-native-gesture-handler";

export default function PostForum({ allPost, currentUser }) {
  // Modal
  const [modalImage, setModalImage] = useState(false);
  const [modalComment, setModalComment] = useState(false);
  const [imageShowModal, setImageShowModal] = useState([]);
  const [postId, setPostId] = useState(null);
  const [newComment, setNewComment] = useState();
  const [comments, setComments] = useState([]);

  const [numberOfComments, setNumberOfComments] = useState(null);

  const [numLine, setNumLine] = useState(3);

  // current commenter data to be send

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      if (postId) {
        const res = await API.get(`/api/comment/${postId}`);

        if (res.data) {
          const dataSort = res.data.sort(function (a, b) {
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          });
          setComments(dataSort.reverse());
          setNumberOfComments(res.data.length);
        }
      }
      return;
    } catch (error) {
      console.log(error.response);
    }
  };

  const postNewComment = async () => {
    try {
      if (newComment.length > 0) {
        const res = await API.post(`/api/comment/postcomment`, {
          postId: postId,
          commenterId: currentUser._id,
          commenterName: `${currentUser.firstname} ${currentUser.middlename} ${currentUser.lastname}`,
          commenterProfile: currentUser.profileURL,
          commenterUserTye: currentUser.accountType,
          commenterPostText: newComment,
        });

        if (res.data) {
          setComments([...comments, res.data]);
        }
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      {allPost?.map((post, index) => {
        return (
          <View style={styles.postContainer} key={index}>
            {/* top */}
            <View style={styles.top}>
              <View styles={styles.profileBox}>
                <View style={styles.profileContainer}>
                  <Image
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                    source={{ uri: post.userProfile }}
                  />
                </View>
              </View>
              <View style={styles.topNameContainer}>
                <Text style={styles.nameTxt}>{post.userName}</Text>
                <FontAwesome name="globe" size={18} color="#999999" />
              </View>
            </View>
            {/* body image /text*/}
            <View style={styles.body}>
              <View style={styles.postTextContainer}>
                <Text
                  numberOfLines={numLine}
                  ellipsizeMode="tail"
                  style={styles.postText}
                >
                  {post.userPostText}
                </Text>
                {post.userPostText.length >= 160 ? (
                  <>
                    {numLine !== 0 ? (
                      <TouchableOpacity onPress={() => setNumLine(0)}>
                        <Text style={styles.textEnd}>show more</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => setNumLine(3)}>
                        <Text style={styles.textEnd}>show less</Text>
                      </TouchableOpacity>
                    )}
                  </>
                ) : null}
              </View>
              {post?.userPostImage.length === 0 ? null : (
                <View style={styles.imagesPostContainer}>
                  {post.userPostImage.length === 1 ? (
                    <>
                      {post.userPostImage.map((img, index) => {
                        return (
                          <TouchableOpacity
                            style={styles.imageBox1}
                            key={index}
                            onPress={() => {
                              setModalImage(true);
                              setImageShowModal(post.userPostImage);
                            }}
                          >
                            <Image
                              style={{ width: "100%", height: "100%" }}
                              resizeMode="cover"
                              source={{ uri: img }}
                            />
                          </TouchableOpacity>
                        );
                      })}
                    </>
                  ) : null}
                  {post.userPostImage.length === 2 ? (
                    <>
                      {post.userPostImage.map((img, index) => {
                        return (
                          <TouchableOpacity
                            style={styles.imageBox2}
                            key={index}
                            onPress={() => {
                              setModalImage(true);
                              setImageShowModal(post.userPostImage);
                            }}
                          >
                            <Image
                              style={{ width: "100%", height: "100%" }}
                              resizeMode="cover"
                              source={{ uri: img }}
                            />
                          </TouchableOpacity>
                        );
                      })}
                    </>
                  ) : null}
                  {post.userPostImage.length === 3 ? (
                    <>
                      {post.userPostImage.map((img, index) => {
                        return (
                          <TouchableOpacity
                            style={styles.imageBox3}
                            key={index}
                            onPress={() => {
                              setModalImage(true);
                              setImageShowModal(post.userPostImage);
                            }}
                          >
                            <Image
                              style={{ width: "100%", height: "100%" }}
                              resizeMode="cover"
                              source={{ uri: img }}
                            />
                          </TouchableOpacity>
                        );
                      })}
                    </>
                  ) : null}
                  {post.userPostImage.length === 4 ? (
                    <>
                      {post.userPostImage.map((img, index) => {
                        return (
                          <TouchableOpacity
                            style={styles.imageBox4}
                            key={index}
                            onPress={() => {
                              setModalImage(true);
                              setImageShowModal(post.userPostImage);
                            }}
                          >
                            <Image
                              style={{ width: "100%", height: "100%" }}
                              resizeMode="cover"
                              source={{ uri: img }}
                            />
                          </TouchableOpacity>
                        );
                      })}
                    </>
                  ) : null}
                  {/* 5 or more */}
                  {post.userPostImage.length >= 5 ? (
                    <>
                      {post.userPostImage.map((img, index) => {
                        return (
                          <TouchableOpacity
                            style={styles.imageBox5}
                            key={index}
                            onPress={() => {
                              setModalImage(true);
                              setImageShowModal(post.userPostImage);
                            }}
                          >
                            <Image
                              style={{ width: "100%", height: "100%" }}
                              resizeMode="cover"
                              source={{ uri: img }}
                            />
                          </TouchableOpacity>
                        );
                      })}
                    </>
                  ) : null}
                  {post.userPostImage.length >= 5 ? (
                    <View style={styles.overlayPic}>
                      <Text style={{ color: "#ffffff" }}>more</Text>
                    </View>
                  ) : null}
                </View>
              )}
            </View>
            {/* bottom */}
            <View style={styles.bottom}>
              <View style={styles.botTopPart}>
                <Text style={{ color: "#999999", fontSize: 12 }}>comments</Text>
              </View>
              <View style={styles.botBottomPart}>
                <View style={styles.botProfileContainer}>
                  <View style={styles.profileCircle}>
                    <Image
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                      source={{ uri: currentUser?.profileURL }}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.commentClick}
                  onPress={() => {
                    setModalComment(true);
                    setPostId(post._id);
                  }}
                >
                  <View style={styles.commentInputBox}>
                    <Text style={{ color: "#e6e6e6", fontSize: 12 }}>
                      type comment here...
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            {/* bottom */}
          </View>
        );
      })}

      {/* =======================================================Modal for Image================================================================== */}
      <Modal animationType="slide" transparent={true} visible={modalComment}>
        <View style={styles.mainModalContainer}>
          <View style={styles.modalTop}>
            <TouchableOpacity
              onPress={() => {
                setModalComment(false);
                setPostId(null);
                setComments([]);
              }}
            >
              <FontAwesome5 name="chevron-down" size={24} color="#333333" />
            </TouchableOpacity>
            <Text style={{ marginLeft: 10, color: "#404040" }}>
              {numberOfComments} comment
            </Text>
          </View>
          {/* Modal comments body */}

          <View style={{ flex: 1 }}>
            <ScrollView>
              {comments?.map((com, index) => {
                return (
                  <View style={styles.commentContainer} key={index}>
                    <View style={styles.top}>
                      <View style={styles.circleContainer}>
                        <Image
                          style={{ width: "100%", height: "100%" }}
                          resizeMode="cover"
                          source={{ uri: com.commenterProfile }}
                        />
                      </View>
                      <Text style={styles.commentName}>
                        {com.commenterName}
                      </Text>
                    </View>
                    <View style={styles.bot}>
                      <Text>{com.commenterPostText}</Text>
                    </View>
                  </View>
                );
              })}

              {comments?.length <= 0 ? (
                <Text style={styles.noComment}>no available comments</Text>
              ) : null}
            </ScrollView>
          </View>
          {/* modal comments input comment */}
          <View style={styles.inputCommentContainer}>
            <TextInput
              style={styles.commentTextInput}
              placeholder="type comment here..."
              multiline={true}
              numberOfLines={2}
              value={newComment}
              onChangeText={(v) => setNewComment(v)}
            />
            <TouchableOpacity
              style={styles.sendCommentIconContainer}
              onPress={() => {
                postNewComment();
                setNewComment("");
              }}
            >
              <Ionicons name="send" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* =======================================================Modal for Comments============================================================== */}
      <Modal animationType="slide" transparent={true} visible={modalImage}>
        <View style={styles.mainModalContainerBlack}>
          <View style={styles.topCloseIcon}>
            <TouchableOpacity
              onPress={() => {
                setModalImage(false);
                setImageShowModal([]);
              }}
            >
              <AntDesign name="close" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            pagingEnabled={true}
          >
            {imageShowModal?.map((m, i) => {
              return (
                <View style={styles.modalImageCon} key={i}>
                  <Image
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="contain"
                    source={{ uri: m }}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

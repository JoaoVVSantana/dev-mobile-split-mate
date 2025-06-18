package com.splitmate.backend.service;

import com.splitmate.backend.model.Friend;
import java.util.List;

public interface FriendService {
    List<Friend> getAllFriends();
    Friend getFriendById(String id);
    Friend createFriend(Friend friend);
    Friend updateFriend(String id, Friend friend);
    void deleteFriend(String id);
}

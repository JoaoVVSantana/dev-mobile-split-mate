package com.splitmate.backend.service.impl;

import com.splitmate.backend.model.Friend;
import com.splitmate.backend.repository.FriendRepository;
import com.splitmate.backend.service.FriendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FriendServiceImpl implements FriendService {

    private final FriendRepository friendRepository;

    @Autowired
    public FriendServiceImpl(FriendRepository friendRepository) {
        this.friendRepository = friendRepository;
    }

    @Override
    public List<Friend> getAllFriends() {
        return friendRepository.findAll();
    }

    @Override
    public Friend getFriendById(String id) {
        return friendRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Friend not found"));
    }

    @Override
    public Friend createFriend(Friend friend) {
        return friendRepository.save(friend);
    }

    @Override
    public Friend updateFriend(String id, Friend friend) {
        Friend existingFriend = getFriendById(id);
        existingFriend.setName(friend.getName());
        existingFriend.setEmail(friend.getEmail());
        return friendRepository.save(existingFriend);
    }

    @Override
    public void deleteFriend(String id) {
        friendRepository.deleteById(id);
    }
} 
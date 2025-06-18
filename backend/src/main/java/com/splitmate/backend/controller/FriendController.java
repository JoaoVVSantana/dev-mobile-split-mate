package com.splitmate.backend.controller;

import com.splitmate.backend.model.Friend;
import com.splitmate.backend.service.FriendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/friends")
public class FriendController {
    
    private final FriendService friendService;

    @Autowired
    public FriendController(FriendService friendService) {
        this.friendService = friendService;
    }
    
    @GetMapping
    public List<Friend> getAllFriends() {
        return friendService.getAllFriends();
    }

    @GetMapping("/{id}")
    public Friend getFriendById(@PathVariable String id) {
        return friendService.getFriendById(id);
    }

    @PostMapping
    public Friend createFriend(@RequestBody Friend friend) {
        return friendService.createFriend(friend);
    }

    @PutMapping("/{id}")
    public Friend updateFriend(@PathVariable String id, @RequestBody Friend friend) {
        return friendService.updateFriend(id, friend);
    }

    @DeleteMapping("/{id}")
    public void deleteFriend(@PathVariable String id) {
        friendService.deleteFriend(id);
    }
} 
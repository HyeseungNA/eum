package com.eumpyo.eum.api.service;

import com.eumpyo.eum.api.request.GroupAddReq;
import com.eumpyo.eum.api.response.GroupDetailsRes;

public interface GroupService {
    void addGroup(GroupAddReq groupAddReq);

    GroupDetailsRes findGroup(Integer groupId);

    void removeGroup(Integer groupId);
}

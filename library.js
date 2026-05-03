'use strict';

const topics = require.main.require('./src/topics');
const categories = require.main.require('./src/categories');
const user = require.main.require('./src/user');
const translator = require.main.require('./src/translator');
const winston = require.main.require('winston');

const plugin = {};

plugin.modifyNotification = async function (payload) {
    if (!payload || !payload.data) {
        return payload;
    }

    const notification = payload.data;

    if (notification.type === 'new-topic-in-category') {
        try {
            const topicId = notification.tid;

            if (topicId) {
                const topicData = await topics.getTopicFields(topicId, ['title', 'cid']);
                
                if (topicData && topicData.title) {
                    const categoryName = await categories.getCategoryField(topicData.cid, 'name');
                    
                    const username = await user.getUserField(notification.from, 'username');

                    if (categoryName && username) {
                        notification.bodyShort = translator.compile(
                            'custom-notify:new-topic-in-category',
                            username,
                            topicData.title,
                            categoryName
                        );
                    }
                }
            }
        } catch (err) {
            winston.error('[Custom-Notifications] Error:', err);
        }
    }

    return payload;
};

module.exports = plugin;

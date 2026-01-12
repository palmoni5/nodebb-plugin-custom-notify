'use strict';

const topics = require.main.require('./src/topics');
const categories = require.main.require('./src/categories');
const user = require.main.require('./src/user');
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
                        // שינוי לשימוש בתגיות HTML להדגשה
                        const newText = `<strong>${username}</strong> פרסם את הנושא <strong>${topicData.title}</strong> בקטגוריית <strong>${categoryName}</strong>`;
                        
                        notification.bodyShort = newText;
                    }
                }
            }
        } catch (err) {
            // שומרים רק לוג שגיאות למקרה של תקלה, לוגים רגילים הוסרו
            winston.error('[Custom-Notifications] Error:', err);
        }
    }

    return payload;
};

module.exports = plugin;
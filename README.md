# NodeBB Custom Notify Plugin

Customizes the `new-topic-in-category` notification in NodeBB so users see a clearer message with:

- the author username
- the topic title
- the category name

## Example

English:

> **alice** posted the topic **Welcome to the forum** in **Announcements**

Hebrew:

> **alice** פרסם את הנושא **ברוכים הבאים לפורום** בקטגוריית **הודעות**

## Features

- Rewrites the notification body for new topics in followed categories
- Uses NodeBB language files instead of a hard-coded string
- Includes English and Hebrew translations

## Installation

```bash
npm install nodebb-plugin-custom-notify
```

Then activate the plugin in the NodeBB ACP and restart NodeBB.

## Compatibility

- `^1.19.0`
- `^2.0.0`
- `^3.0.0`

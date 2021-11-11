# LoopOnly Discord Bot

None of this fancy smancy queueing complexity. Just loop one song and one song only!

Probably good for things like roleplaying games where you just want an atmospheric piece playing for a while.

```
/loop https://someplace.com/my-song.mp3
```

## Commands

This bot is meant to be extremely simple, so it only has a few commands.

### Loop One Song

```
/loop URL
```

This will loop a song in the current voice channel.

* The URL should be an audio file uploaded to the internet somewhere
* You should be in a voice channel when using this command

### Pause/Resume

```
/pause
/resume
```

Pause and resume the currently playing song.

### Disconnect

```
/disconnect
```

Makes the bot leave the channel.

## Can I link YouTube videos?

Nope! I made this because YouTube started mincing bots for using their videos.

This bot only knows how to play audio files. As long as you can find a place to store audio online, you can provide links for the bot to use.

## How do I use Google Drive?

You can store audio files on Google Drive.

After uploading to Google, share it with the "Get Link" option. This gives you a janky URL that looks like this:

```
https://drive.google.com/file/d/SOME_KIND_OF_ID/view?usp=sharing
```

This link isn't useful. But you can make it useful! Take that `SOME_KIND_OF_ID` bit at stick it into this URL format instead:

```
https://drive.google.com/uc?id=SOME_KIND_OF_ID
```

And this link can be used with LoopOnly!

```
/loop https://drive.google.com/uc?id=SOME_KIND_OF_ID
```

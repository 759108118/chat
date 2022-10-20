<template>
    <div id="app">
        <div class="row join-info-group">
            <div class="col-sm">
                <p class="join-info-text">AppID</p>
                <input v-model="appid" type="text" placeholder="请输入" required>
            </div>
            <div class="col-sm">
                <p class="join-info-text">Token(optional)</p>
                <input v-model="token" type="text" placeholder="请输入">
            </div>
            <div class="col-sm">
                <p class="join-info-text">Channel</p>
                <input v-model="channel" type="text" placeholder="请输入" required>
            </div>
        </div>

        <div class="button-group">
            <div class="btn btn-primary btn-sm" @click="sharRTC">Join</div>
            <div class="btn btn-primary btn-sm" @click="Leave">Leave</div>
        </div>

        <div class="row video-group">
            <div class="col">
                <p id="local-player-name" class="player-name"></p>
                <div id="local-player" class="player"></div>
            </div>
            <div class="w-100"></div>
            <div class="col">
                <div id="remote-playerlist"></div>
            </div>
        </div>
    </div>
</template>
<script>
import AgoraRTC from "agora-rtc-sdk-ng"
import $ from "jquery"
export default {
    name: 'App',
    data() {
        return {
            appid: '6a4b4379828e4f85bb7f41b8b3aee304', // appId
            token: '007eJxTYPjTk9DLbT/Ho5grVGOP+bPy8tfF8j++xZtnbL9xdf+8q48UGMwSTZJMjM0tLYwsUk3SLEyTkszTTAyTLJKME1NTjQ1MXq0KSK4PZGQ4+KCRkZEBAkF8RgZDBgYAZQAgkQ==', // 根据房间号生成的token(房间号和token对应)
            channel: '1',// 房间号(房间号和token对应)

            uid: null,
            agoraClient: null,//实例
            localTracks: {  //信道
                videoTrack: null,
                audioTrack: null
            },
            options: {},
            remoteUsers: {}
        }
    },
    mounted() {

    },
    methods: {
        // 开始
        sharRTC() {
            // 创建本地客户端 AgoraRTC 的实例
            this.agoraClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
            // 用户信息
            this.options = {
                appid: this.appid,
                channel: this.channel,
                uid: null,
                token: this.token
            };
            // 连接
            this.join();
        },
        // 获取
        async join() {
            // 添加事件侦听器以在远程用户发布时播放远程曲目.
            this.agoraClient.on("user-published", this.handleUserPublished);
            this.agoraClient.on("user-unpublished", this.handleUserUnpublished);
            // 加入频道
            [this.uid, this.localTracks.audioTrack, this.localTracks.videoTrack] = await Promise.all([
                // join the channel
                this.agoraClient.join(this.appid, this.channel, this.token || null),
                // 使用麦克风和摄像头
                AgoraRTC.createMicrophoneAudioTrack(),
                AgoraRTC.createCameraVideoTrack()
            ]);

            // 将本地曲目发布到频道
            await this.agoraClient.publish(Object.values(this.localTracks));
            // 播放本地视频曲目
            this.localTracks.videoTrack.play("local-player");

        },
        handleUserPublished(user, mediaType) {

            const id = user.uid;
            this.remoteUsers[id] = user;
            this.subscribe(user, mediaType);
        },

        handleUserUnpublished(user) {
            const id = user.uid;
            delete this.remoteUsers[id];
        },

        async subscribe(user, mediaType) {

            const uid = user.uid;
            // 订阅远程用户
            await this.agoraClient.subscribe(user, mediaType);

            if (mediaType === 'video') {
                const player = $(`
            <div id="player-wrapper-${uid}">
              <p class="player-name">remoteUser(${uid})</p>
              <div id="player-${uid}" class="player"></div>
            </div>
          `);
                $("#remote-playerlist").append(player);
                user.videoTrack.play(`player-${uid}`);
                user.audioTrack.play();
            }
            if (mediaType === 'audio') {
                user.audioTrack.play();
            }
        },

        // 客户离开信道
        async Leave() {
            this.localTracks.videoTrack.stop();
            this.localTracks.videoTrack.close();
            this.localTracks.audioTrack.stop();
            this.localTracks.audioTrack.close();
            // remove remote users and player views
            this.remoteUsers = {};
            $("#remote-playerlist").html("");
            // leave the channel
            await this.agoraClient.leave();
            $("#local-player-name").text("");
            console.log("客户离开信道成功");
        }
    }
}
</script>
  
  
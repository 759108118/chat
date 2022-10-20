<template>
    <div id="app">
        <p id="local-player-name" ref="playername" class="player-name"></p>
        <div id="local-player" ref="player" class="player">
            <div v-show="!isStatus" class="call" @click="sharRTC"></div>
            <div v-show="isStatus" class="answer" @click="Leave"></div>
        </div>
        <div ref="playlist" id="remote-playerlist"></div>

    </div>
</template>
<script>
import AgoraRTC from "agora-rtc-sdk-ng";
export default {
    name: "App",
    data() {
        return {
            isStatus: false,
            agoraClient: null, //实例
            localTracks: {
                //信道
                videoTrack: null,
                audioTrack: null,
            },
            options: {},
            remoteUsers: {},
        };
    },
    props: {
        appid: String,
        token: String,
        channel: String,
        uid: Number,
    },
    mounted() {
        // $(".answer").css("display", "none");
        // alert(AgoraRTC.checkSystemRequirements());是否兼容声网
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
                uid: 8848,
                token: this.token,
            };
            // 连接
            this.join();
        },
        // 获取
        async join() {
            this.isStatus = !this.isStatus;
            // 添加事件侦听器以在远程用户发布时播放远程曲目.
            this.agoraClient.on("user-published", this.handleUserPublished);
            this.agoraClient.on("user-unpublished", this.handleUserUnpublished);
            // 加入频道
            [this.uid, this.localTracks.audioTrack, this.localTracks.videoTrack] =
                await Promise.all([
                    // join the channel
                    this.agoraClient.join(this.appid, this.channel, this.token || null),
                    // 使用麦克风和摄像头
                    AgoraRTC.createMicrophoneAudioTrack(),
                    AgoraRTC.createCameraVideoTrack(),
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
            console.log("我离开了，请销毁我的Dom结构！~~~");


            setTimeout(() => {
                var a = document.querySelectorAll(".players")
                console.log(a.length);
                for (let i = 0; i < a.length; i++) {
                    if (a[i].innerHTML == "") {
                        a[i].parentNode.parentNode.removeChild(a[i].parentNode);
                        console.log("销毁成功");
                    }
                }
            }, 1000);
        },

        async subscribe(user, mediaType) {
            const uid = user.uid;
            // <div id="player-wrapper-${uid}">
            // <p class="player-name">remoteUser(${uid})</p>
            // 订阅远程用户
            await this.agoraClient.subscribe(user, mediaType);
            if (mediaType === "video") {
                let div = document.createElement("div")
                let div1 = document.createElement("div")
                div.setAttribute('class', "player-wrapper-id")
                div1.setAttribute('id', `player-${uid}`)
                div1.setAttribute('class', `players`)
                div.appendChild(div1);
                // $("#remote-playerlist").append(player);
                this.$refs.playlist.append(div);
                user.videoTrack.play(`player-${uid}`);
                user.audioTrack.play();
            }
            if (mediaType === "audio") {
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
            // $("#remote-playerlist").html("");
            this.$refs.playlist.innerHTML = "";
            // leave the channel
            await this.agoraClient.leave();
            // $("#local-player-name").text("");
            console.log("客户离开信道成功");
            this.isStatus = !this.isStatus;
        },
    },
};
</script>
<style>
#app {
    width: 30vw;
    height: 30vw;
}

.player {
    width: 100%;
    height: 100%;
    border: 1px solid red;
    position: relative;
}

.players {
    width: 100%;
    height: 100%;
    border: 1px solid red;
    position: relative;
}

#remote-playerlist {
    width: 17%;
    position: absolute;
    height: 171px;
    top: 40px;
    right: 20px;
}

.player-wrapper-id {
    height: 200px;
}

.call {
    cursor: pointer;
    position: absolute;
    bottom: 4%;

    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
    width: 40px;
    height: 40px;
    /* background-image: url("~@/assets/接听.png");
     */
    background: red;
    background-size: contain;
    background-repeat: no-repeat;
}

.answer {
    cursor: pointer;

    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    bottom: 4%;
    z-index: 99;
    width: 40px;
    height: 40px;
    /* background-image: url("~@/assets/挂断.png");
     */
    background: green;
    background-size: contain;
    background-repeat: no-repeat;
}
</style>
  
  
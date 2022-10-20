<template>
  <div>
    <agora-video :appid='appid' :token="token" :channel="channel" :uid="uid" />

  </div>
</template>


<script>
import AgoraVideo from './AgoraVideo.vue'
export default {
  components: {
    AgoraVideo
  },
  data() {
    return {
      appid: '6a4b4379828e4f85bb7f41b8b3aee304',//你的AppId
      token: '007eJxTYHhcfknfrqPV60Od42+RXWeVq+wOMUw9pNQs7vlr752DWfIKDGaJJkkmxuaWFkYWqSZpFqZJSeZpJoZJFknGiampxgYmr9cEJDcEMjII/LnHyMgAgSA+E4OhIQMDAEHwH1Y=', // 根据房间号生成的token(房间号和token对应)
      channel: '11',//频道号
      uid: 8848,//uid必须为数字类型
    }
  },
}
</script>

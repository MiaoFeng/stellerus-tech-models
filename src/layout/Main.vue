<script setup>
const jobName = 'tpa_20240821';
const host = 'https://geogenius.cn-north-4.myhuaweicloud.com';
const projectId = '0ba999a55580256b2fdac013c7e7f624';
// onMounted(() => {
//     request.post(`${host}/v1/${projectId}/users/login`, {
//             name: "hw_hk_01",
//             password: "Jue%9wkKf3"
//     }).then(res => {
//         token.value = res?.data?.token;
//         //查看是否有进行中的作业，有的话说明在重新评估中，重新评估按钮disabled, 评估时间显示上次完成的时间，轮询任务状态。
//         const url = encodeURI(`${host}/v2/${projectId}/workflow-job?name=${jobName}&limit=20&offset=0`)
//         request.get(url, {
//             headers: {
//                 'X-Auth-Token': token.value,
//             }
//         }).then(res => {
//             //查看是否有进行中的作业，有的话说明在重新评估中，重新评估按钮disabled, 评估时间显示上次完成的时间，轮询任务状态。
//             const { jobs, count } = res?.data;
//             if(jobs.length === 0) return;
//             if(jobs[0].job?.status === 'Succeeded') {
//                 //没有运行中的作业，评估时间按该作业完成时间显示
//                 const time = jobs[0].job?.updateAt;
//                 handleTime(time);
//             } else if(jobs[0].job?.status === 'Running') {
//                 isRefreshing.value = true;
//                 jobId.value = jobs[0].job?.id;
//                 intervalId.value = queryJobStatus();
//                 const succeededJob = jobs.find((item) => item.job.status === 'Succeeded');
//                 if(succeededJob) {
//                     const time = succeededJob.job?.updateAt;
//                     handleTime(time);
//                 }
//             }
//         })
//     })
// })
</script>

<template>
    <div 
        class="main-container"
    >
        <RouterView />
    </div>
</template>

<style lang="scss" scoped>
.main-container {
   // height: calc(100% - 82px);
   height: 100%;
}
</style>

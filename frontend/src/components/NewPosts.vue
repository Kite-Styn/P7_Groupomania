<template>
    <aside id="new-posts">
        <h2>Nouveaux posts</h2>
        <router-link id="latest-one-link" :to="{ name: 'post', params:{id: currentNewPosts[0].id} }">
            <div>
                <h3 id="latest-one-title">{{currentNewPosts[0].title}}</h3>
                <img id="latest-one-img" :src="currentNewPosts[0].image_url" alt="Latest post 1">
            </div>
        </router-link>
        <router-link id="latest-two-link" :to="{ name: 'post', params:{id: currentNewPosts[1].id} }">
            <div>
                <h3 id="latest-two-title">{{currentNewPosts[1].title}}</h3>
                <img id="latest-two-img" :src="currentNewPosts[1].image_url" alt="Latest post 2">
            </div>
        </router-link>
        <router-link id="latest-three-link" :to="{ name: 'post', params:{id: currentNewPosts[2].id} }">
            <div>
                <h3 id="latest-three-title">{{currentNewPosts[2].title}}</h3>
                <img id="latest-three-img" :src="currentNewPosts[2].image_url" alt="Latest post 3">
            </div>
        </router-link>
    </aside>
</template>

<script>
export default {
    name: "NewPosts",
    methods: {
    },
    data() {
        return {
            currentNewPosts: [
                {id:1, title: "", image_url: ""},
                {id:2, title: "", image_url: ""},
                {id:3, title: "", image_url: ""},
            ]
        }
    },
    async created() {
        let res = await fetch("http://localhost:3000/api/post/latest", {
            method: "GET",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            }
        });
        if (!res.ok) {
            throw new Error()
        }
        let data = await res.json();
        this.currentNewPosts = data;
    }
}
</script>

<style lang="scss">
#new-posts {
    width: 25%;
    border-radius: 15px;
    margin-bottom: 50px;
    & div {
        border-radius: 15px;
        background-color: #80808070;
        border: black solid 1px;
        margin-bottom: 10px;
        padding: 0 10px;
    }
    & img {
        height: 200px;
        object-fit: contain;
        max-width: 100%;
    }
}
</style>
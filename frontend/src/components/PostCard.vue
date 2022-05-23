<template>
    <router-link :to="{ name: 'post', params:{id: linkTo} }" class="post-card-list">
        <h2>{{ title }}</h2>
        <div>
            <img :src="image_url" alt="Post">
        </div>
        <div>
            <p class="bold">{{ author }}</p>
            <p>{{ comment_count }} commentaires</p>
            <p><span></span> {{ score }}</p>
        </div>
    </router-link>
</template>

<script>
export default {
    name: "PostCard",
    props: ["linkTo", "title", "image_url", "author", "comment_count", "score"]
}
</script>

<style lang="scss">
.post-card-list {
    text-decoration: none;
  & img {
    max-width: 95%;
    max-height: 500px;
    object-fit: contain;
  }
  & div {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
}
</style>
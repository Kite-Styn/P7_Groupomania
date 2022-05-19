<template>
    <div class="comment">
        <p><span class="bold">{{ author }}</span> - {{ date.replace(`T`, ` `).replace(`.000Z`, ``) }} <span class="grey" v-if='edit_date !== null' :title="'modifié le:' + edit_date.replace(`T`, ` `).replace(`.000Z`, ``) || edit_date">*</span> - {{ score }} pts</p>
        <p><span class="bold" v-if="reply_username !== null">@{{ reply_username }}</span> {{ content }}</p>
        <div class="comment-buttons-block">
            <button @click="replyComment" class="reply-comment-button">Répondre</button>
            <button @click="modifyComment" class="modify-comment-button" v-if="isAuthor">Modifier</button>
            <button @click="deleteComment" class="delete-comment-button" v-if="isAuthorOrAdmin">Supprimer</button>
        </div>
        <div class="reply-confirm" v-show="replyCommentDisplay">
            <textarea name="reply-comment" class="reply-comment" cols="50" rows="3" v-model="replyContent"></textarea>
            <button @click="replyCommentConfirm" class="reply-comment-button">Envoyer</button>
        </div>
        <div class="modify-confirm" v-show="modifyCommentDisplay">
            <textarea name="modify-comment" class="modify-comment" cols="50" rows="3" v-model="newContent"></textarea>
            <button @click="modifyCommentConfirm" class="modify-comment-button">Confirmer</button>
        </div>
        <div class="delete-confirm" v-show="deleteCommentDisplay">
            <p class="red">La suppression est définitive!</p>
            <button @click="deleteCommentConfirm" class="delete-comment-button">Confirmer</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "CommentTemplate",
    props: ["author", "date", "edit_date", "score", "reply_username", "content"],
    data() {
        return {
            isAuthor: false,
            isAuthorOrAdmin: false,
            replyCommentDisplay: false,
            modifyCommentDisplay: false,
            deleteCommentDisplay: false,
            replyContent: "",
            newContent: ""
        }
    },
    methods: {
        replyComment() {
            this.replyCommentDisplay = !this.replyCommentDisplay
        },
        modifyComment() {
            this.modifyCommentDisplay = !this.modifyCommentDisplay
        },
        deleteComment() {
            this.deleteCommentDisplay = !this.deleteCommentDisplay
        },
        async replyCommentConfirm() {
            let userData = JSON.parse(sessionStorage.getItem("user"));
            let comment = {
                userId: userData.userId,
                related_post: this.$route.params.id,
                related_comment: this.$.vnode.key,
                reply_username: this.author,
                replyContent: this.replyContent
            };
            if (comment.replyContent == "") {
                return
            }
            let res = await fetch("http://localhost:3000/api/comment/reply", {
            method: "POST",
            headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${userData.token}`
            },
            body: JSON.stringify(comment)
            });
            if (!res.ok) {
                throw new Error()
            }
            let data = await res.json();
            console.log(data);
            window.location.href=`http://localhost:8080/post/${this.$route.params.id}`
        },
        async modifyCommentConfirm() {
            let userData = JSON.parse(sessionStorage.getItem("user"));
            let comment = {
                userId: userData.userId,
                commentId: this.$.vnode.key,
                newContent: this.newContent
            };
            if (comment.newContent == "") {
                return
            }
            let res = await fetch("http://localhost:3000/api/comment/modify", {
            method: "POST",
            headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${userData.token}`
            },
            body: JSON.stringify(comment)
            });
            if (!res.ok) {
                throw new Error()
            }
            let data = await res.json();
            console.log(data);
            window.location.href=`http://localhost:8080/post/${this.$route.params.id}`
        },
        async deleteCommentConfirm() {
            let userData = JSON.parse(sessionStorage.getItem("user"));
            let comment = {
                userId: userData.userId,
                commentId: this.$.vnode.key
            };
            let res = await fetch("http://localhost:3000/api/comment/delete", {
            method: "DELETE",
            headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${userData.token}`
            },
            body: JSON.stringify(comment)
            });
            if (!res.ok) {
                throw new Error()
            }
            let data = await res.json();
            console.log(data);
            window.location.href=`http://localhost:8080/post/${this.$route.params.id}`
        }
    },
    created() {
        let user = JSON.parse(sessionStorage.getItem("user"));
        /*console.log(user);
        console.log(this.author);*/
        if (user.username === this.author) {
            this.isAuthor = true
        }
        if (user.username === this.author || JSON.parse(sessionStorage.getItem("user")).isAdmin === true) {
            this.isAuthorOrAdmin = true
        }
    }
}
</script>

<style lang="scss">
.comment {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    & p {
        margin-top: 8px;
        margin-bottom: 8px;
    }
}

.reply-comment-button {
    border-radius: 0;
    background-color: black;
    min-width: auto;
    min-height: auto;
    padding: 2px;
    font-size: revert;
}

.modify-comment-button {
    border-radius: 0;
    background-color: darkgreen;
    min-width: auto;
    min-height: auto;
    padding: 2px;
    font-size: revert;
}

.delete-comment-button {
    border-radius: 0;
    background-color: darkred;
    min-width: auto;
    min-height: auto;
    padding: 2px;
    font-size: revert;
}

.delete-confirm {
    border: red solid 2px;
    align-self: center;
    padding: 5px;
    margin: 5px;
}

.reply-comment {
    margin: 5px;
}

.modify-comment {
    margin: 5px;
}

.red {
    color: red
}

.grey {
    color: grey
}
</style>
<template>
    <div class="movie_body" ref="movie_body">
        <Loading v-if="isLoading" />
        <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
            <ul>
                <li class="pullUpdeta">{{pullDownMsg}}</li>
                <li v-for="item in movieList" :key="item.id">
                    <div class="pic_show">
                        <img :src="item.img|setWH('128.180')" @tap="handleToDetail" />
                    </div>
                    <div class="info_list">
                        <h2>
                            {{item.nm}}
                            <img
                                v-if="item.version=='v3d imax'"
                                src="@/assets/max.png"
                                alt
                            />
                        </h2>
                        <p>
                            观众评
                            <span class="grade">{{item.sc}}</span>
                        </p>
                        <p>主演: {{item.star}}</p>
                        <p>{{item.showInfo}}</p>
                    </div>
                    <div class="btn_mall">购票</div>
                </li>
            </ul>
        </Scroller>
    </div>
</template>

<script>
//import BScroll from 'better-scroll';
// import BScroll from "better-scroll";
import { setTimeout } from "timers";
import { MessageBox } from "mint-ui";
export default {
    name: "NowPlaying",
    data() {
        return {
            movieList: [],
            pullDownMsg: "",
            isLoading: true,
            prevCity: -1
        };
    },
    activated() {
        let cityID = this.$store.state.city.id;
        if (this.prevCity === cityID) {
            return;
        }
        this.isLoading = true;
        // console.log("activated");
        this.axios.get("/api/movieOnInfoList?cityId=" + cityID).then(res => {
            let msg = res.data.msg;
            if (msg === "ok") {
                this.movieList = res.data.data.movieList;
                this.isLoading = false;
                this.prevCity = cityID;
                // console.log(cityID);
                // console.log(this.movieList);
                // this.$nextTick(() => {
                //     let scroll = new BScroll(this.$refs.movie_body, {
                //         tap: true,
                //         probeType: 1
                //     });

                //     scroll.on("scroll", pos => {
                //         // console.log('scroll')
                //         if (pos.y > 30) {
                //             this.pullDownMsg = "正在更新";
                //         }
                //     });
                //     scroll.on("touchEnd", pos => {
                //         // console.log('touchEnd')
                //         if (pos.y > 30) {
                //             this.axios
                //                 .get("/api/movieOnInfoList?cityId=11")
                //                 .then(res => {
                //                     let msg = res.data.msg;
                //                     if (msg === "ok") {
                //                         this.pullDownMsg = "更新成功";
                //                         this.movieList =
                //                             res.data.data.movieList;
                //                         setTimeout(() => {
                //                             this.pullDownMsg = "";
                //                         }, 1000);
                //                     }
                //                 });
                //         }
                //     });
                // });
            }
        });
    },
    mounted() {
        // let loadCity = window.localStorage.getItem("nowNM");
        // let loadCityID = window.localStorage.getItem("nowID");
        // // console.log("loadCity", loadCity);
        // this.isLoading = true;

        this.axios.get("/api/getLocation").then(res => {
            // console.log(res);
            let msg = res.data.msg;
            if (msg === "ok") {
                let curCity = res.data.data.nm;
                let curCityID = res.data.data.id;
                // console.log(curCity);
                console.log("等不等", curCityID == this.$store.state.city.id);
                console.dir(curCity);
                console.dir(this.$store.state.city.nm);
                if (curCityID == this.$store.state.city.id) {
                    return;
                } else {
                    MessageBox.confirm("", {
                        title: "检测到您所在城市为",
                        message: curCity,
                        // confirmButtonClass: "ccc",
                        showCancelButton: true,
                        // confirmButtonHighlight:true,
                        confirmButtonText: "切换定位"
                    })
                        .then(action => {
                            if (action == "confirm") {
                                // console.log(111);
                                // this.$store.state.city.nm = curCity;
                                // this.$store.state.city.id = curCityID;
                                // console.log('窑村的',curCity);
                                window.localStorage.setItem("nowNM", curCity);
                                window.localStorage.setItem("nowID", curCityID);
                                window.location.reload();
                            }
                        })
                        .catch(err => {
                            if (err == "cancel") {
                                //取消的回调
                                console.log(2);
                            }
                        });
                }
            }
        });
        // }
    },
    methods: {
        handleToDetail() {
            // console.log("tap");
            // console.log(Boolean(this.pullDownMsg));
        },
        handleToScroll(pos) {
            if (pos.y > 30) {
                this.pullDownMsg = "正在更新";
            }
        },
        handleToTouchEnd(pos) {
            if (pos.y > 30) {
                this.axios.get("/api/movieOnInfoList?cityId=11").then(res => {
                    let msg = res.data.msg;
                    if (msg === "ok") {
                        this.pullDownMsg = "更新成功";
                        this.movieList = res.data.data.movieList;
                        setTimeout(() => {
                            this.pullDownMsg = "";
                        }, 1000);
                    }
                });
            }
        }
    }
};
</script>

<style scoped>
#content .movie_body {
    flex: 1;
    overflow: auto;
}
.movie_body ul {
    margin: 0 12px;
    overflow: hidden;
}
.movie_body ul li {
    margin-top: 12px;
    display: flex;
    align-items: center;
    border-bottom: 1px #e6e6e6 solid;
    padding-bottom: 10px;
}
.movie_body .pic_show {
    width: 64px;
    height: 90px;
}
.movie_body .pic_show img {
    width: 100%;
}
.movie_body .info_list {
    margin-left: 10px;
    flex: 1;
    position: relative;
}
.movie_body .info_list h2 {
    font-size: 17px;
    line-height: 24px;
    width: 150px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.movie_body .info_list p {
    font-size: 13px;
    color: #666;
    line-height: 22px;
    width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.movie_body .info_list .grade {
    font-weight: 700;
    color: #faaf00;
    font-size: 15px;
}
.movie_body .info_list img {
    width: 50px;
    position: absolute;
    right: 10px;
    top: 5px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
    width: 47px;
    height: 27px;
    line-height: 28px;
    text-align: center;
    background-color: #f03d37;
    color: #fff;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
}
.movie_body .btn_pre {
    background-color: #3c9fe6;
}
.movie_body .pullDown {
    margin: 0;
    padding: 0;
    border: none;
}
.movie_body .pullUpdeta {
    margin: 0;
    padding: 0;
    border: none;
}
</style>
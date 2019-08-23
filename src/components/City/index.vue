<template>
    <!-- <div class="city_body">
        <div class="city_list">
            <div class="city_hot">
                <h2>热门城市</h2>
                <ul class="clearfix">
                    <li>上海</li>
                    <li>北京</li>
                    <li>上海</li>
                    <li>北京</li>
                    <li>上海</li>
                    <li>北京</li>
                    <li>上海</li>
                    <li>北京</li>
                </ul>
            </div>
            <div class="city_sort">
                <div>
                    <h2>A</h2>
                    <ul>
                        <li>阿拉善盟</li>
                        <li>鞍山</li>
                        <li>安庆</li>
                        <li>安阳</li>
                    </ul>
                </div>
                <div>
                    <h2>B</h2>
                    <ul>
                        <li>北京</li>
                        <li>保定</li>
                        <li>蚌埠</li>
                        <li>包头</li>
                    </ul>
                </div>
                <div>
                    <h2>A</h2>
                    <ul>
                        <li>阿拉善盟</li>
                        <li>鞍山</li>
                        <li>安庆</li>
                        <li>安阳</li>
                    </ul>
                </div>
                <div>
                    <h2>B</h2>
                    <ul>
                        <li>北京</li>
                        <li>保定</li>
                        <li>蚌埠</li>
                        <li>包头</li>
                    </ul>
                </div>
                <div>
                    <h2>A</h2>
                    <ul>
                        <li>阿拉善盟</li>
                        <li>鞍山</li>
                        <li>安庆</li>
                        <li>安阳</li>
                    </ul>
                </div>
                <div>
                    <h2>B</h2>
                    <ul>
                        <li>北京</li>
                        <li>保定</li>
                        <li>蚌埠</li>
                        <li>包头</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="city_index">
            <ul>
                <li>A</li>
                <li>B</li>
                <li>C</li>
                <li>D</li>
                <li>E</li>
            </ul>
        </div>
    </div>-->

    <div class="city_body">
        <Loading v-if="isLoading" />
        <mt-index-list v-else>
            <mt-index-section index="热门">
                <mt-cell v-for="item in hotList" :title="item.nm" :key="item.nm" @click.native='handleToCity(item.nm,item.id)'></mt-cell>
            </mt-index-section>
            <mt-index-section v-for="item in cityList" :key="item.index" :index="item.index">
                <mt-cell v-for="city in item.list" :title="city.nm" :key="city.nm" @click.native='handleToCity(city.nm,city.id)'></mt-cell>
            </mt-index-section>
        </mt-index-list>
    </div>
</template>

<script>
export default {
    name: "City",
    data() {
        return {
            cityList: [],
            hotList: [],
            isLoading: true
        };
    },
    mounted() {
        let cityList = window.localStorage.getItem("cityList");
        let hotList = window.localStorage.getItem("hotList");

        if (cityList && hotList) {
            this.cityList = JSON.parse(cityList);
            this.hotList = JSON.parse(hotList);
            this.isLoading = false;
        } else {
            this.axios.get("/api/cityList").then(res => {
                // console.log(res);
                let msg = res.data.msg;
                if (msg === "ok") {
                    let cities = res.data.data.cities;
                    // console.log(data)
                    let { cityList, hotList } = this.formatCityList(cities);
                    this.cityList = cityList;
                    this.hotList = hotList;
                    this.isLoading = false;
                    window.localStorage.setItem(
                        "cityList",
                        JSON.stringify(cityList)
                    );
                    window.localStorage.setItem(
                        "hotList",
                        JSON.stringify(hotList)
                    );
                }
            });
        }
    },
    methods: {
        formatCityList(cities) {
            let cityList = [];
            let hotList = [];
            for (let i = 0; i < cities.length; i++) {
                if (cities[i].isHot === 1) {
                    hotList.push(cities[i]);
                }
            }
            // console.log(hotList);
            for (let i = 0; i < cities.length; i++) {
                let firstLetter = cities[i].py.substring(0, 1).toUpperCase();
                // console.log(firstLetter)
                if (toCom(firstLetter)) {
                    cityList.push({
                        index: firstLetter,
                        list: [
                            {
                                nm: cities[i].nm,
                                id: cities[i].id
                            }
                        ]
                    });
                } else {
                    for (let j = 0; j < cityList.length; j++) {
                        if (cityList[j].index === firstLetter) {
                            cityList[j].list.push({
                                nm: cities[i].nm,
                                id: cities[i].id
                            });
                        }
                    }
                }
            }
            cityList.sort((n1, n2) => {
                if (n1.index > n2.index) {
                    return 1;
                } else if (n1.index < n2.index) {
                    return -1;
                } else {
                    return 0;
                }
            });

            function toCom(firstLetter) {
                for (let i = 0; i < cityList.length; i++) {
                    if (cityList[i].index === firstLetter) {
                        return false;
                    }
                }
                return true;
            }
            // console.log(cityList);
            return {
                cityList,
                hotList
            };
        },

        handleToCity(nm,id){
            // console.log(nm,id);
            this.$store.commit('city/CITY_INFO',{nm,id});
            window.localStorage.setItem('nowNM',nm);
            window.localStorage.setItem('nowID',id);
            this.$router.push('/movie/nowPlaying');
        }
    }
};
</script>
<style scoped>
.mint-indexlist-content {
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
}
#content .city_body {
    margin-top: 45px;
    /* display: flex; */
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
}
/* .city_body .city_list {
    flex: 1;
    overflow: auto;
    background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
    background-color: transparent;
    width: 0;
}
.city_body .city_hot {
    margin-top: 20px;
}
.city_body .city_hot h2 {
    padding-left: 15px;
    line-height: 30px;
    font-size: 14px;
    background: #f0f0f0;
    font-weight: normal;
}
.city_body .city_hot ul li {
    float: left;
    background: #fff;
    width: 29%;
    height: 33px;
    margin-top: 15px;
    margin-left: 3%;
    padding: 0 4px;
    border: 1px solid #e6e6e6;
    border-radius: 3px;
    line-height: 33px;
    text-align: center;
    box-sizing: border-box;
}
.city_body .city_sort div {
    margin-top: 20px;
}
.city_body .city_sort h2 {
    padding-left: 15px;
    line-height: 30px;
    font-size: 14px;
    background: #f0f0f0;
    font-weight: normal;
}
.city_body .city_sort ul {
    padding-left: 10px;
    margin-top: 10px;
}
.city_body .city_sort ul li {
    line-height: 30px;
    line-height: 30px;
}
.city_body .city_index {
    width: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    border-left: 1px #e6e6e6 solid;
} */
</style>

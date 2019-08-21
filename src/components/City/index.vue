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
    <mt-index-list>
        <mt-index-section index="热门">
            <mt-cell v-for="item in hotList" :title="item.nm" :key="item.nm"></mt-cell>
        </mt-index-section>
        <mt-index-section v-for="item in cityList" :key="item.index" :index="item.index">
            <mt-cell v-for="city in item.list" :title="city.nm" :key="city.nm"></mt-cell>
        </mt-index-section>
    </mt-index-list>
</template>

<script>
export default {
    name: "City",
    data() {
        return {
            cityList: [],
            hotList: []
        };
    },
    mounted() {
        this.axios.get("/api/cityList").then(res => {
            console.log(res);
            let msg = res.data.msg;
            if (msg === "ok") {
                let cities = res.data.data.cities;
                // console.log(data)
                let { cityList, hotList } = this.formatCityList(cities);
                this.cityList = cityList;
                this.hotList = hotList;
            }
        });
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
            console.log(hotList);
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
            console.log(cityList);
            return {
                cityList,
                hotList
            };
        }
    }
};
</script>
<style>
</style>

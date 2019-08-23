const state= {
    nm:window.localStorage.getItem('nowNM')||'北京',
    id: window.localStorage.getItem('nowID')||1
};

const mutations= {
    CITY_INFO(state,playload){
        state.nm=playload.nm;
        state.id=playload.id
    }
};

const actions= {
    
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}

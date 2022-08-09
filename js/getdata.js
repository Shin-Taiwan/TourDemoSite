async function asyncGetData(){
    try {
        const datas = await axios.get("https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json")
        return datas
    } catch (error) {
        console.error(`ERROR====>${error}`)
    }
}

export {
    asyncGetData
}
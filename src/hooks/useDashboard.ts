import axios from "axios"

export function useDashboard(){
    async function updateBlogQuickInfo(info_name: string,info_value: string){
        try{
            const req = await axios.post('/api/blog-content/quick-info/update',{
                info_name, info_value })
            if(req.data.updateResponse == 200){
                return {status: 200}
            } else {
                return {errorMessage: "Erro na requisição à API"}
            }
        }catch(error){
            const errorMessage = error instanceof Error ? error.message : "Erro na requisição à API"
            return {errorMessage}
        }
    }
    async function getAllBlogQuickInfo(){
        try{
            const req = await axios.get('/api/blog-content/quick-info',{
                params: {info_name: 'all'}    
            })
            if(req.data.quickInfo && req.data.quickInfo.lenght > 0){
                return req.data.quickInfo
            } else {
                return {errorMessage: "Erro na requisição à API"}
            }
        }catch(error){
            const errorMessage = error instanceof Error ? error.message : "Erro na requisição à API"
            return {errorMessage}
        }
    }

    return {
        updateBlogQuickInfo, getAllBlogQuickInfo
    }
}
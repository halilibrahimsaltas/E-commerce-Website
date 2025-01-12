const { Client }= require('./elasticsearch');


const esClient = new Client({
    cloud:{
        id:'a24928e72e964aa8b278563e9bca0932:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJGIzMmU2ZmQ0MzQ0YjQ1ZjU5YWNjZmNjODNiY2I1ZDgwJDllY2VkMWQ5NTNhYTQwY2RiZjJlMTBmOWRmYzVmOTVm',
    },
    auth:{
        username:'elasticsearch',
        password:'sh4ReOr1aED2WnrcCf5G',
    }

});

const addProd = async(prod)=>{
  try {
     const result = await esClient.index({
        index:'prods',
        body: prod
     })
     await esClient.indices.refresh({index:'prods'});
     return result;
  } catch (e) {
    logger.error('elastic e seacrh bağli add rod çalişmiyor')
    
  }
}


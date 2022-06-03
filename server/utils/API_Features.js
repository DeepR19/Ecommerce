class ApiFeatures{
    constructor(query,  queryStr){
        // queryStr -> API
        // query -> done operation on mongoDB data

        this.query = query;
        this.queryStr = queryStr
    }

    search(){
        const keyword = this.queryStr.keyword ?{
            name: {
                $regex: this.queryStr.keyword,  // search subset is present in the field 
                $options: "i", // case insensitive
            }
        }:{};

        this.query = this.query.find({...keyword}); // here find is used on the query{Product.find()}

        return this;
    };

    filter(){
        // const queryCpy = this.queryStr --> shallow copy
        const queryCpy = {...this.queryStr} // deep copy

       // remove some fields for category
       const removeField = ["keyword", "page", "limit"] ;

       removeField.forEach((key)=>{
            delete queryCpy[key]   // delete specific field from query
       });

        //    filter for prices 
       let queryStr = JSON.stringify(queryCpy);
       queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,  (key)=>`$${key}`)

       this.query = this.query.find(JSON.parse(queryStr))
       return this
    };


    pagination(perPage){
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = perPage * (currentPage - 1);

        this.query = this.query.limit(perPage).skip(skip);

        return this;
    }

}

module.exports = ApiFeatures    
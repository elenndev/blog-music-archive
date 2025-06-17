import mongoose from "mongoose";

const blogQuickInfosSchema = new mongoose.Schema({
    info_name:{
        type:String,
        required:[true],
    },
    info_value: {
        type: String,
        required: [true]
    },
})



const BlogQuickInfoDB= mongoose.models.blogQuickInfos || mongoose.model("blogQuickInfos",blogQuickInfosSchema);

export default BlogQuickInfoDB;
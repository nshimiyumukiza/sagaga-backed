import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId
    },
    commentMessage:{
        type:String,
        required:true,
    }
})

commentSchema.pre(/^find/,function(next){
    this.populate({
        path:"User",
        Selection:"name email"
    })
});

export const Comment = mongoose.model("Comment",commentSchema);
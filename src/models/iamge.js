import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    image:{
        type: String,
        required: true,
    },
    like:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    comment:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
})

imageSchema.pre(/^find/,function(next){
    this.populate({
        path:"comment",
        Selection:"user,commentMessage"
    })

})

const Img = mongoose.model("Img",imageSchema);
export default Img;
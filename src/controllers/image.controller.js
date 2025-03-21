import Img from "../models/iamge.js";
import { Comment } from "../models/coment.model.js";

// creating image

const createImg = async (req, res) => {
  try {
    const image = await Img.create(req.body);
    res
      .status(201)
      .json({
        message: `${image.name} image created succefully.`,
        data: image,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getImage = async (req,res) => {
  try {
    const image = await Img.find({});
    res.status(200).json({message:`you get ${image.length} images`,data:image})
    
  } catch (error) {
    res.status(500).json({error:error.message})
    
  }

}

export{createImg, getImage}

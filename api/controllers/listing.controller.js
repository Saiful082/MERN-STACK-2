import Listing from '../models/listing.model.js';


export const createListing = async (req, res) => {
  // req.body.regularPrice = parseFloat(req.body.regularPrice) || 0
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {

    res.send(error);
  }
};
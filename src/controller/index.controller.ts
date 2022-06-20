const Cert = require("../schemas/index.schema")
exports.createCert = async (req: any, res: any) => {
  try {
    const { title, name, img} = req.body;
    if (!title ||!img || !name){
      return res.status(400).json({ message: "all fields must be filled" });
    } else {
      const data = await Cert.create({
        name,
        title,
        img,
        
      });
      if (!data) {
        return res.status(400).json({ message: "could not create cert" });
      }
      await data.save();
      return res.status(200).json(data);
    }
  } catch (err) {
    return res.status(200).json({ message: err });
  }
};
exports.getAllCerts = async (req: any, res: any) => {
  try {
    const data = await Cert.find({ ...req.params });
    if (!data) {
      return res.status(404).json({ message: "no cert found" });
    }
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json(err);
  }
};
exports.getOneCert = async (req: any, res: any) => {
  try {
    const doc = await Cert.findOne({ _id: req.params.id }).exec();
    if (!doc) {
      return res
        .status(200)
        .json({ message: "could not get a cert with search ID" });
    }
    res.status(200).json(doc);
  } catch (err) {
    return res.status(500).json(err);
  }
};

import Package from "../models/PackageModel.js";

export const addTour = async (req, res) => {
  const { title, description, price, availableDates, image } = req.body;

  try {
    if (!title || !description || !price || !availableDates || !image) {
      return res.status(404).json({
        message: "All fields are required!",
      });
    }

    const newTour = new Package({
      title,
      description,
      price,
      availableDates,
      image,
    });

    await newTour.save();

    return res.status(200).json({
      message: "Tour added successfully!",
      Tour: {
        id: newTour._id,
        title: newTour.title,
      },
    });
  } catch (error) {
    console.error("Error during creating tour", error);
    return res.status(500).json({
      message: "error creating tour",
      error,
    });
  }
};

export const updatePackage = async (req, res) => {
  try {
      const {id} = req.params;
      const {title, description, price, availableDates, image} = req.body;
      const updatedPackage = await Package.findByIdAndUpdate(id, { title, description, price, availableDates, image }, { new: true });

      return res.status(200).json({
        message: 'Package updated successfully',
        updatedPackage
      })
  } catch (error) {
    console.error('Error while updating package');
    return res.status(500).json({
      message: 'Error while updating package',
      error: error.message
    })
  }
}

export const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Package.deleteOne({ _id: id });

    return res.status(200).json({
      success: true,
      message: "Package deleted successfully",
    });
  } catch (error) {
    console.error("Error while deleting package", error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting package",
      error: error.message,
    });
  }
};

const mongoose = require("mongoose");

const BreedSchema = mongoose.Schema ({
    breedName: String,
    activityLevel: Date
});

const Breed = mongoose.model("Breed", BreedSchema);

module.exports = Breed;
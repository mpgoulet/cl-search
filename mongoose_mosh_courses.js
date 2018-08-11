console.log(":::::::::::::::::::::::::::::::::::::::");

var mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/playground")

  .then(() => console.log("Connected to database"))
  .catch(err => console.error("Could not connect :: ", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Node JS Course",
    author: "matt",
    tags: ["teo", "backend"],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course.find({ author: "matt", isPublished: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

getCourses();

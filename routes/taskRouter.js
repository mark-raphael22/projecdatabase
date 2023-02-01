const router = require("express").Router();

const {
    getallTasks,
    getSingleTask,
    createTask,
    updateTask,
    deleteTask,
}=require("../controller/tasksController")

router.route("/").get(getallTasks).post(createTask);
router.route("/:taskId").get(getSingleTask).patch(updateTask).delete(deleteTask);


module.exports = router;
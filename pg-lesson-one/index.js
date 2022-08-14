const { Client } = require("pg");

const client = new Client({
  connectionString:
    "postgresql://postgres:yourpassword@localhost/pg_lesson_one",
});
/* username:password@host:port */

client.connect();
async function getStudents() {
  const results = await client.query("SELECT * FROM students");
  console.log(results.rows);
}
async function addStudent(name) {
  const results = await client.query(
    `INSERT INTO students (name) VALUES ($1) RETURNING * `,
    [name]
  );
  console.log(results.rows[0]);
}

/* Exercise */

/* Write the necessary function to find a student by its id. This function should return the found student. */
async function findStudentById(id) {
  const student = await client.query(`SELECT * FROM students WHERE id = ($1)`, [
    id,
  ]);
  console.log(student.rows[0]);
}

/* Write the necessary function to update a student. This function should return the updated student. */
async function updateStudent(name, id) {
  const student = await client.query(
    `UPDATE students SET name = ($1) WHERE id = ($2) RETURNING *`,
    [name, id]
  );
  console.log(student.rows[0]);
}

/* Write the necessary function to delete a student. This function should return the updated student. */
async function deleteStudent(id) {
  console.log("================");
  const student = await client.query(
    `DELETE FROM students WHERE id = ($1) RETURNING *`,
    [id]
  );
  console.log(student.rows[0]);
}

/* Modify the students table so that null names can not be inserted. */
async function setNotNullNameColumn() {
  const res = await client.query(
    `ALTER TABLE students ALTER COLUMN name SET NOT NULL `
  );
  console.log(res);
}

//setNotNullNameColumn().then(() => process.exit(0));
//deleteStudent("5").then(() => process.exit(0));
//updateStudent("Matias", "6").then(() => process.exit(0));
//findStudentById("3").then(() => process.exit(0));
getStudents().then(() => process.exit(0));
//addStudent("Joel").then(() => process.exit(0));

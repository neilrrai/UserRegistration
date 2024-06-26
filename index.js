function handleFormSubmit(event) {
  event.preventDefault();
  const userDetails = {
    username: event.target.username.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
  };
  axios
    .post(
      "https://crudcrud.com/api/6ab63387fc2341ce866b3387454a2999/appointmentData",
      userDetails
    )
    .then((response) => displayUserOnScreen(response.data))
    .catch((error) => console.log(error));

  // Clearing the input fields
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
}
// function to display the data on screen
function displayUserOnScreen(userDetails) {
  const userItem = document.createElement("li");
  userItem.classList = "list-group-item";
  userItem.appendChild(
    document.createTextNode(
      `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`
    )
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.classList = "btn btn-outline-info";
  deleteBtn.appendChild(document.createTextNode("Delete"));
  userItem.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.classList = "btn btn-outline-info";
  editBtn.appendChild(document.createTextNode("Edit"));
  userItem.appendChild(editBtn);

  const userList = document.querySelector("ul");
  userList.appendChild(userItem);

  deleteBtn.addEventListener("click", function (event) {
    userList.removeChild(event.target.parentElement);
    axios
      .delete(
        `https://crudcrud.com/api/6ab63387fc2341ce866b3387454a2999/appointmentData/${userDetails._id}`
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  });

  editBtn.addEventListener("click", function (event) {
    userList.removeChild(event.target.parentElement);
    // localStorage.removeItem(userDetails.email);
    axios
      .delete(
        `https://crudcrud.com/api/6ab63387fc2341ce866b3387454a2999/appointmentData/${userDetails._id}`
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    document.getElementById("username").value = userDetails.username;
    document.getElementById("email").value = userDetails.email;
    document.getElementById("phone").value = userDetails.phone;
  });
}
window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/6ab63387fc2341ce866b3387454a2999/appointmentData"
    )
    .then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        displayUserOnScreen(res.data[i]);
      }
    })
    .catch((err) => console.log(err));
});

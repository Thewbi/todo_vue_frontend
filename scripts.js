const app = new Vue({
  el: "#main",

  data: {
    result: "",
    responseAvailable: false,
    title: "",
    description: "",
    msg: "hi!",
    checked: true,
    picked: "one",
    selected: "two",
    multiSelect: ["one", "three"],
  },

  created() {
    console.log("created");
    this.fetchAPIData();
  },

  methods: {
    submit: function () {
      this.$refs.create_form.submit();
    },

    async createTodoAPIData() {
      // DELETE request using fetch with async/await
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: this.title, // v-model attribute on the form html is available here
          description: this.description, // v-model attribute on the form html is available here
        }),
      };
      const response = await fetch(
        "http://localhost:8080/todo/create",
        requestOptions
      );
      const data = await response.json();

      this.result.push(data);

      // clear form
      this.title = "";
      this.description = "";
    },

    async deleteTodoAPIData(id) {
      if (!confirm("Do you really want to delete?")) {
        return;
      }
      console.log("Deleting " + id);

      // DELETE request using fetch with async/await
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Vue DELETE Request Example" }),
      };
      const response = await fetch(
        "http://localhost:8080/todo/delete/" + id,
        requestOptions
      );
      const data = await response.json();

      this.result = this.result.filter((e) => e.id !== id);
    },

    fetchAPIData() {
      this.responseAvailable = false;

      fetch("http://localhost:8080/todo/all", {
        mode: "cors",
        method: "GET",
        headers: { "Access-Control-Allow-Origin": "http://localhost:8080" },
      })
        .then((res) => res.json())
        .then((data) => (obj = data))
        .then(() => {
          console.log(JSON.stringify(obj));

          this.result = obj;
          this.responseAvailable = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});

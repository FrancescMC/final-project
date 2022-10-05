<template>
  <div>{{ name }}</div>
</template>

<script setup>
const person = {
  data: {
    name: "Francesc",
    birthplace: "es grau",
  },
};
// desestructuración
const name = person.name;
const { birthplace: lugarDeNacimiento } = person.data;
const { data } = person;
const { birthplace } = data;

async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: true });
      this.tasks = tasks;
      return this.tasks;
    },


    fetchTascks(){
        const {data:tasks} = supabase
    }
</script>

<style></style>

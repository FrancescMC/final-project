import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: true });
      this.tasks = tasks;
      return this.tasks;
    },

    // New code
    async addTask(title, description) {
      console.log(useUserStore().user.id);
      const { data, error } = await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          title: title,
          is_complete: false,
          description: description,
        },
      ]);
    },
    // Función para modificar tareas
    async updateTask(taskId, title, description) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ title: title, description: description })
        .match({ id: taskId });
    },
    // Función para completar tareas
    async completeTask(taskId, bool) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ is_complete: !bool })
        .match({ id: taskId });
    },
    // Función para descompletar tareas
    async unCompleteTask(taskId) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ is_complete: false })
        .match({ id: taskId });
    },

    // Función para borrar task de la data de supabase

    async deleteTask(taskId) {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .match({ id: taskId });
    },
    async deleteAllTask() {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .match({ user_id: useUserStore().user.id });
    },

    // funciones de filtrado

    async showComplete() {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .match({ is_complete: true });
    },

    async showComplete() {
      const { data: tasks } = await supabase
        .from("tasks")
        .update({ is_complete: false })
        .match({ is_complete: true });
      this.tasks = tasks;
      return this.tasks;
    },
  },
});
